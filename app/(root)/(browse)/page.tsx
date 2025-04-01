import Billboard from "@/components/billboard";
import Header from "@/components/header";

const Page = () => {
  return (
    <div className={"h-screen w-screen overflow-x-auto"}>
      <Header />
      {/*<Billboard />*/}
      {/*<div className={"overflow-x-clip pb-40"}>*/}
      {/*  <MovieList data={movies} title={"Ostatnio popularne"} />*/}
      {/*</div>*/}
      {/*<InfoModal visible={isOpen} onClose={closeModal} />*/}
    </div>
  );
};

export default Page;
