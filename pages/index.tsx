import { getSession, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";

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
  const { data: user } = useCurrentUser();

  return (
    <div className={"w-screen h-screen  overflow-x-auto"} id={"indexWrapper"}>
      <div className={"min-w-[280px] "}>
        <Navbar />
      </div>
    </div>
  );
}
