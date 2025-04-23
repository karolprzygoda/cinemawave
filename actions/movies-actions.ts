"use server";

import {
  TMDBGenreResponse,
  TMDBMovie,
  TMDBMovieListItemResponse,
  TMDBMovieLogo,
  TMDBPaginatedResponse,
} from "@/lib/types";

export async function fetchTMDBMovieDetail(mediaId: number) {
  const url = `https://api.themoviedb.org/3/movie/${mediaId}?language=en-US&api_key=${process.env.TMDB_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("TMDB error", await res.text());
    throw new Error("Failed to fetch media detail");
  }

  return res.json();
}

export async function fetchTMDBMovieGenres(): Promise<TMDBGenreResponse[]> {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${process.env.TMDB_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("TMDB error", await res.text());
    throw new Error("Failed to fetch movie genres");
  }

  const data = await res.json();

  return data.genres;
}

export async function fetchTMDBPopularMovies(): Promise<Omit<TMDBMovie, "genres">[]> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("TMDB error", await res.text());
    throw new Error("Failed to fetch popular movies");
  }

  const data: TMDBPaginatedResponse<TMDBMovieListItemResponse> = await res.json();

  const topTenMovies = data.results.slice(0, 10);

  return await Promise.all(
    topTenMovies.map(async (movie) => ({
      ...movie,
      logo: await fetchTMDBMovieLogo(movie.id),
    })),
  );
}

export async function fetchTMDBMovieLogo(movieId: number): Promise<TMDBMovieLogo> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.TMDB_API_KEY}`,
  );

  if (!res.ok) {
    console.error("TMDB error", await res.text());
    throw new Error("Failed to fetch movie logo");
  }

  const data = await res.json();

  return data.logos.find((l: TMDBMovieLogo) => l.iso_639_1 === "en");
}
