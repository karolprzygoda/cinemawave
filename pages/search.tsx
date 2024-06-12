import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import { FaRegSadCry } from "react-icons/fa";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function SearchPage() {
  const router = useRouter();
  const query = router.query.query as string;
  const [searchResults, setSearchResults] = useState([]);
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (query) {
      const results = movies.filter((movie: any) =>
        movie.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [query, movies]);

  return (
    <div className="w-screen h-screen overflow-x-auto" id="indexWrapper">
      <div className="min-w-[280px] ">
        <Navbar />
        {searchResults.length > 0 ? (
          <div className="pb-40 overflow-x-clip">
            <MovieList
              data={searchResults}
              title={`Wyniki wyszukiwania dla: ${query}`}
            />
            <InfoModal visible={isOpen} onClose={closeModal} />
          </div>
        ) : (
          <div
            className={
              "h-full flex flex-col items-center content-center gap-20 w-full px-2 mt-40"
            }
          >
            <h2 className={"text-white text-center font-semibold text-4xl "}>
              Brak filmów o tytule: {query}
            </h2>
            <FaRegSadCry size={120} className={"text-white"} />
          </div>
        )}
      </div>
    </div>
  );
}
