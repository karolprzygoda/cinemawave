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
  logo_url?: string;
  video_url?: string;
};

export type MediaSection = {
  provider: "tmdb" | "prisma";
  title: string;
  variant: "top-ten" | "list";
  media: MediaListItem[];
};
