import React, { ReactNode } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthFormContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      className={
        "flex-1 flex justify-center items-center lg:mt-16 lg:mb-[23rem]"
      }
    >
      <div
        className={
          "bg-black bg-opacity-70 px-3 lg:px-10  py-14  max-w-md  rounded-md w-full flex flex-col"
        }
      >
        {children}
      </div>
    </main>
  );
}

function Oauth() {
  return (
    <div className={"flex items-center gap-4 justify-center my-5"}>
      <button
        onClick={() => signIn("google", { callbackUrl: "/profiles" })}
        className={
          "w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition"
        }
      >
        <FcGoogle size={30} />
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/profiles" })}
        className={
          "w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 transition"
        }
      >
        <FaGithub size={30} />
      </button>
    </div>
  );
}

function Route({ text, href }: { text: string; href: String }) {
  return (
    <Link
      href={(href as unknown) || URL}
      className={"text-white self-center hover:underline cursor-pointer "}
    >
      {text}
    </Link>
  );
}

function Header({ text }: { text: string }) {
  return <h2 className={"text-white text-4xl font-semibold mb-8"}>{text}</h2>;
}

function Error({ children, show }: { children: ReactNode; show: boolean }) {
  return (
    <div
      className={`bg-yellow-600 p-3  rounded-md mb-8 ${show ? "blok" : "hidden"}`}
    >
      {children}
    </div>
  );
}

AuthFormContainer.Header = Header;
AuthFormContainer.Error = Error;
AuthFormContainer.Outh = Oauth;
AuthFormContainer.Route = Route;
