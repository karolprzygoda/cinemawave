export type TMDBMovieListItemResponse = {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
};

export type TMDBMovieDetailResponse = {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  genres: TMDBGenreResponse[];
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBCountry[];
  spoken_languages: TMDBSpokenLanguage[];
};

export type TMDBTVShowListItemResponse = {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  origin_country: string[];
};

export type TMDBPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
};

export type TMDBGenreResponse = {
  id: number;
  name: string;
};

export type TMDBProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type TMDBCountry = {
  iso_3166_1: string;
  name: string;
};

export type TMDBSpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type TMDBMovieLogo = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type TMDBMovie = TMDBMovieListItemResponse & {
  genres: TMDBGenreResponse[];
  logo: TMDBMovieLogo;
};
