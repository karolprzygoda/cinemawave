import Billboard from "@/components/billboard";
import prismadb from "@/lib/prismadb";
import TopTenSection from "@/components/top-ten-section";
import { fetchTMDBMovieGenres, fetchTMDBPopularMovies } from "@/actions/movies-actions";

const Page = async () => {
  const [movies, tmdbMovies, tmdbMoviesGenres] = await Promise.all([
    prismadb.movies.findMany(),
    fetchTMDBPopularMovies(),
    fetchTMDBMovieGenres(),
  ]);

  const tmdbMoviesWithGenres = tmdbMovies.map((movie) => {
    return {
      ...movie,
      genres: movie.genre_ids.map((id) => {
        return tmdbMoviesGenres.find((genre) => genre.id === id)!;
      }),
    };
  });

  const randomIndex = Math.floor(Math.random() * movies.length);

  const randomMovie = movies[randomIndex];

  return (
    <>
      <Billboard movie={randomMovie} />
      <TopTenSection movies={tmdbMoviesWithGenres} />
      <TopTenSection movies={tmdbMoviesWithGenres} />
      <TopTenSection movies={tmdbMoviesWithGenres} />
      <TopTenSection movies={tmdbMoviesWithGenres} />
    </>
  );
};

export default Page;
