import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

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

const Profiles = () => {
  const router = useRouter();
  const { data: user, error } = useCurrentUser();
  const loading = !user && !error;

  return (
    <div className="flex items-center h-full justify-center overflow-auto ">
      {loading ? (
        <ClipLoader size={150} color={"#dc2626"} loading={loading} />
      ) : (
        <div className="flex flex-col profilesContainer min-w-[280px]">
          <h1 className="text-5xl md:text-6xl text-white text-center">
            Kto ogląda?
          </h1>
          <div className="flex items-center justify-center gap-8 mt-10">
            <button onClick={() => router.push("/")}>
              <div className="group flex-row  mx-auto">
                <div className=" rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                  <img
                    className={"w-[8vw]  min-w-28 aspect-auto"}
                    src="/images/default-blue.png"
                    alt="Profile"
                  />
                </div>
                <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                  {user?.name}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
