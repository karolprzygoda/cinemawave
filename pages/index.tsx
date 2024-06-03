import { getSession, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";

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

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();

  return (
    <div className={"w-screen h-screen  overflow-x-auto"} id={"indexWrapper"}>
      <div className={"min-w-[280px] "}>
        <Navbar />
        <Billboard />
        <div className={"pb-40  overflow-x-clip"}>
          <MovieList data={movies} title={"Ostatnio popularne"} />
          <MovieList data={favorites} title={"Moja lista"} />
        </div>
      </div>
    </div>
  );
}
