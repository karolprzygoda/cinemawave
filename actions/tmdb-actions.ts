"use server";

import {
  TMDBGenresResponse,
  TMDBGenre,
  TMDBPaginatedResponse,
  TMDBMediaListResult,
  TMDBImagesResponse,
  TMDBMediaItemMap,
  mediaCategory,
} from "@/lib/tmdb-types";

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTMDBGenres(): Promise<TMDBGenre[]> {
  const urls = [
    `${BASE_URL}/genre/movie/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
    `${BASE_URL}/genre/tv/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`,
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));

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
  category: mediaCategory,
  pages: number = 1,
): Promise<TMDBMediaListResult<T>[]> {
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

  const data: TMDBPaginatedResponse<TMDBMediaListResult<T>>[] = await Promise.all(
    responses.map((response) => response.json()),
  );

  return Promise.all(
    data
      .flatMap((item) => item.results)
      .map(async (media) => ({
        ...media,
        logo: await fetchTMDBImages(mediaType, media.id).then(
          (res) => res.logos.find((logo) => logo.iso_639_1 === "en") || res.logos[0] || null,
        ),
      })),
  );
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
