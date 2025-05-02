"use server";

import { getTMDBSectionList } from "@/actions/tmdb-actions";
import prismadb from "@/lib/prismadb";
import { MediaListItem, MediaSection } from "@/lib/types";

export async function createSection(
  provider: "prisma",
  title: string,
  variant: "top-ten" | "list",
): Promise<{
  provider: "prisma";
  title: string;
  variant: "top-ten" | "list";
  media: MediaListItem[];
}>;

export async function createSection(
  provider: "tmdb",
  title: string,
  variant: "top-ten" | "list",
  mediaType: "movie" | "tv",
  category: "popular" | "top_rated",
): Promise<{
  provider: "tmdb";
  title: string;
  variant: "top-ten" | "list";
  media: MediaListItem[];
}>;

export async function createSection(
  provider: "tmdb" | "prisma",
  title: string,
  variant: "top-ten" | "list",
  mediaType?: "movie" | "tv",
  category?: "popular" | "top_rated",
): Promise<MediaSection> {
  if (provider === "prisma") {
    const media = await prismadb.movie.findMany({ include: { genres: true } });
    return { provider, title, variant, media };
  }

  const media = await getTMDBSectionList(mediaType!, category!);
  return { provider, title, variant, media };
}
