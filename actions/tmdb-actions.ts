"use server";

import {
  TMDBMediaCategory,
  TMDBGenre,
  TMDBGenresResponse,
  TMDBImagesResponse,
  TMDBMediaItemMap,
  TMDBMediaListItem,
  TMDBPaginatedResponse,
} from "@/lib/tmdb-types";
import { MediaListItem } from "@/lib/types";

const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const BASE_LOGO_URL = "https://image.tmdb.org/t/p/w185";

export async function fetchTMDBGenres(): Promise<TMDBGenre[]> {
  const urls = [
    `${BASE_URL}/genre/movie/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
    `${BASE_URL}/genre/tv/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url, { cache: "force-cache" })));

  const errors = responses.filter((response) => !response.ok);

  if (errors.length > 0) {
    console.error("TMDB error", await Promise.all(errors.map((error) => error.text())));
    throw new Error("Failed to fetch TMDB genres");
  }

  const data: TMDBGenresResponse[] = await Promise.all(
    responses.map((response) => response.json()),
  );

  return data.flatMap((item) => item.genres);
}

export async function fetchTMDBMediaList<T extends keyof TMDBMediaItemMap>(
  mediaType: T,
  category: TMDBMediaCategory,
  pages: number = 1,
): Promise<TMDBMediaListItem<T>[]> {
  const urls = Array.from({ length: pages }, (_, i) => {
    const page = i + 1;
    return `${BASE_URL}/${mediaType}/${category}?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`;
  });

  const responses = await Promise.all(urls.map((url) => fetch(url)));

  const errors = responses.filter((response) => !response.ok);

  if (errors.length > 0) {
    console.error("TMDB error", await Promise.all(errors.map((error) => error.text())));
    throw new Error("Failed to fetch popular movies or TV series");
  }

  const pagesData: TMDBPaginatedResponse<TMDBMediaListItem<T>>[] = await Promise.all(
    responses.map((r) => r.json()),
  );

  return pagesData.flatMap((page) => page.results);
}

export async function fetchTMDBImages(
  type: keyof TMDBMediaItemMap,
  id: number,
): Promise<TMDBImagesResponse> {
  const url = `${BASE_URL}/${type}/${id}/images?api_key=${process.env.TMDB_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("TMDB error", await response.text());
    throw new Error("Failed to fetch TMDB logos");
  }

  return response.json();
}

export async function adaptTMDBMediaListItem<T extends keyof TMDBMediaItemMap>(
  mediaType: T,
  mediaData: TMDBMediaListItem<T>,
): Promise<MediaListItem> {
  const displayTitle = "title" in mediaData ? mediaData.title : mediaData.name;

  const [mediaImages, genres] = await Promise.all([
    fetchTMDBImages(mediaType, mediaData.id),
    fetchTMDBGenres(),
  ]);

  const logo = mediaImages.logos.find((logo) => logo.iso_639_1 === "en") || mediaImages.logos[0];

  const genresMap = new Map(genres.map((genre) => [genre.id, genre.name]));

  return {
    id: mediaData.id,
    title: displayTitle,
    backdrop_url: BASE_IMAGE_URL + mediaData.backdrop_path,
    description: mediaData.overview,
    genres: mediaData.genre_ids.map((id: number) => ({
      id,
      name: genresMap.get(id)!,
    })),
    provider: "tmdb",
    poster_url: BASE_IMAGE_URL + mediaData.poster_path,
    logo: logo && {
      ...logo,
      file_path: BASE_LOGO_URL + logo.file_path,
    },
  };
}

export async function getTMDBSectionList<T extends keyof TMDBMediaItemMap>(
  mediaType: T,
  category: TMDBMediaCategory,
  pages: number = 1,
): Promise<MediaListItem[]> {
  const data = await fetchTMDBMediaList(mediaType, category, pages);

  return Promise.all(data.map((mediaData) => adaptTMDBMediaListItem(mediaType, mediaData)));
}
