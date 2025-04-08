export interface MovieListItem {
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
}

export interface MovieDetail {
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
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: Country[];
  spoken_languages: SpokenLanguage[];
}

export interface TVShowListItem {
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
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
