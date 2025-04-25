export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBGenresResponse = {
  genres: TMDBGenre[];
};

export type TMDBPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
};

export type TMDBMovieListItem = {
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

export type TMDBTVSeriesListItem = {
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

export type TMDBImageType = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type TMDBImagesResponse = {
  id: number;
  logos: TMDBImageType[];
  backdrops: TMDBImageType[];
  posters: TMDBImageType[];
};

export type TMDBMediaItemMap = {
  movie: TMDBMovieListItem;
  tv: TMDBTVSeriesListItem;
};

export type TMDBMediaListResult<T extends keyof TMDBMediaItemMap> = TMDBMediaItemMap[T] & {
  logo: TMDBImageType | null;
};

export type mediaCategory = "popular" | "top_rated";
