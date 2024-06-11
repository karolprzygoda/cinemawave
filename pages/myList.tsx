import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
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
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div className={"w-screen h-screen  overflow-x-auto"} id={"indexWrapper"}>
      <div className={"min-w-[280px] "}>
        <Navbar />
        <div className={"pb-40 overflow-x-clip"}>
          <MovieList data={favorites} title={"Moja lista"} />
        </div>
        <InfoModal visible={isOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
