import React, { ReactNode } from "react";
import AuthFormContainer from "@/components/AuthFormContainer";
import Footer from "@/components/Footer";

export default function AuthScreensWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={
        "relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover"
      }
    >
      <div
        className={
          "bg-black  min-h-[100dvh] h-[100dvh]   lg:bg-opacity-65 flex flex-col   overflow-auto"
        }
      >
        <div className={"min-w-[280px] h-full flex flex-col"}>
          <div className={"py-5"}>
            <img
              src="/images/logo.png"
              alt="Logo"
              className={"ms-3 sm:ms-10 h-12"}
            />
          </div>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

AuthScreensWrapper.AuthFormContainer = AuthFormContainer;
