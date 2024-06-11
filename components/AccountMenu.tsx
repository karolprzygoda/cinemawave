import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";
import useMountTransition from "@/hooks/useMountTransition";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function AccountMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}) {
  const { data } = useCurrentUser();

  const hasTransitionedIn = useMountTransition({
    isMounted: isOpen,
    unmountDelay: 300,
  });

  return (
    <>
      {(hasTransitionedIn || isOpen) && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={` bg-black  w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex transition duration-300 ${
            hasTransitionedIn && isOpen ? "opacity-80" : "opacity-0"
          }`}
        >
          <div className={"flex flex-col gap-3"}>
            <div className={"px-3 group/item flex gap-3 items-center w-full"}>
              <img
                className={"w-8 rounded-md"}
                src="/images/default-blue.png"
                alt="userIcon"
              />
              <p className={"text-white text-sm group-hover/items:underline"}>
                {data?.name}
              </p>
            </div>
            <hr className={"bg-gray-600 border-0 h-px my-4"} />
            <Link
              href={"/faqPage"}
              className={
                "px-3 mb-4 text-center text-white text-sm hover:underline"
              }
            >
              Centrum pomocy
            </Link>
            <button
              type={"button"}
              onClick={() => signOut()}
              className={"px-3 text-center text-white text-sm hover:underline"}
            >
              Wyloguj się
            </button>
          </div>
        </div>
      )}
    </>
  );
}
