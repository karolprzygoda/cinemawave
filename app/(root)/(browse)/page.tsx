import Billboard from "@/components/billboard";
import prismadb from "@/lib/prismadb";

const Page = async () => {
  const movies = await prismadb.movies.findMany();

  console.log(movies);

  return (
    <>
      <Billboard />
    </>
  );
};

export default Page;
