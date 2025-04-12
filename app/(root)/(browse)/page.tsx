import Billboard from "@/components/billboard";
import prismadb from "@/lib/prismadb";
import TopTenSection from "@/components/top-ten-section";
import { MovieListItem } from "@/lib/types";

const Page = async () => {
  const movies = await prismadb.movies.findMany();

  const randomIndex = Math.floor(Math.random() * movies.length);

  const randomMovie = movies[randomIndex];

  if (!randomMovie) {
    return null;
  }
  const tmdbMovies: MovieListItem[] = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=pl-PL&page=1`,
  )
    .then((res) => res.json())
    .then((data) => {
      return data.results.slice(0, 10);
    })
    .catch((err) => console.error("Błąd pobierania:", err));

  return (
    <>
      <Billboard data={randomMovie} />
      <TopTenSection movies={tmdbMovies} />
      <TopTenSection movies={tmdbMovies} />
    </>
  );
};

export default Page;
