import MediaListSection from "@/components/media-list-section";
import { notFound } from "next/navigation";
import { createSection } from "@/actions/media-actions";
import Billboard from "@/components/billboard";
import { getRandomArrayElement } from "@/lib/utils";

const Page = async () => {
  const sections = await Promise.all([
    createSection("tmdb", "Popular Movies", "top-ten", "movie", "popular"),
    createSection("prisma", "Recommended for you", "list"),
    createSection("tmdb", "Popular TV Series", "list", "tv", "popular"),
    createSection("tmdb", "Top Rated Movies", "top-ten", "movie", "top_rated"),
  ]);

  const prismaSection = sections.find((s) => s.provider === "prisma");
  if (!prismaSection || prismaSection.media.length === 0) notFound();

  const randomMovie = getRandomArrayElement(prismaSection.media);

  // dodac lazy loading
  return (
    <>
      <Billboard media={randomMovie} />
      {sections.map((section) => (
        <MediaListSection
          key={section.title}
          sectionTitle={section.title}
          mediaList={section.media}
          variant={section.variant}
        />
      ))}
    </>
  );
};

export default Page;
