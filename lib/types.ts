import { TMDBImageType } from "@/lib/tmdb-types";

export type Genre = {
  id: number | string;
  name: string;
};

export type MediaListItem = {
  id: string | number;
  title: string;
  backdrop_url: string;
  poster_url: string;
  genres: Genre[];
  description: string;
  provider: "tmdb" | "prisma";
  logo?: TMDBImageType;
  video_url?: string;
};

export type MediaSection = {
  provider: "tmdb" | "prisma";
  title: string;
  variant: "top-ten" | "list";
  media: MediaListItem[];
};

export type AnimationType = {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
};
