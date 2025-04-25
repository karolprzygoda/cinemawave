import Billboard from "@/components/billboard";
import prismadb from "@/lib/prismadb";
import TopTenSection from "@/components/top-ten-section";
import { TMDBGenresProvider } from "@/components/tmdb-genres-provider";
import { fetchTMDBGenres, fetchTMDBMediaList } from "@/actions/tmdb-actions";
import { getRandomArrayElement } from "@/lib/utils";
import MediaListSection from "@/components/media-list-section";

const Page = async () => {
  const [
    movies,
    tmdbGenres,
    tmdbPopularMovies,
    tmdbPopularSeries,
    tmdbTopRatedMovies,
    tmdbTopRatedSeries,
  ] = await Promise.all([
    prismadb.movies.findMany(),
    fetchTMDBGenres(),
    fetchTMDBMediaList("movie", "popular"),
    fetchTMDBMediaList("tv", "popular"),
    fetchTMDBMediaList("movie", "top_rated"),
    fetchTMDBMediaList("tv", "top_rated"),
  ]);

  const randomMovie = getRandomArrayElement(movies);

  return (
    <TMDBGenresProvider genres={tmdbGenres}>
      <Billboard movie={randomMovie} />
      <TopTenSection sectionTitle="Top 10 Trending Movies" media={tmdbPopularMovies} />
      <MediaListSection sectionTitle="Top 10 Trending Movies" media={tmdbPopularMovies} />
      <MediaListSection sectionTitle="Top 10 Trending TV Shows" media={tmdbPopularSeries} />
      <MediaListSection sectionTitle="10 Top Rated Movies" media={tmdbTopRatedMovies} />
      <TopTenSection sectionTitle="Top 10 Trending TV Shows" media={tmdbPopularSeries} />
      <TopTenSection sectionTitle="10 Top Rated Movies" media={tmdbTopRatedMovies} />
      <TopTenSection sectionTitle="10 Top Rated TV Shows" media={tmdbTopRatedSeries} />
    </TMDBGenresProvider>
  );
};

export default Page;
