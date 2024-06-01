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
    <>
      <Navbar />
    </>
  );
}
