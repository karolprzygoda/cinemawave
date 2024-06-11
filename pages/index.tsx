import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

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
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div className={"w-screen h-screen  overflow-x-auto"} id={"indexWrapper"}>
      <div className={"min-w-[280px] "}>
        <Navbar />
        <Billboard />
        <div className={"pb-40 overflow-x-clip"}>
          <MovieList data={movies} title={"Ostatnio popularne"} />
        </div>
        <InfoModal visible={isOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
