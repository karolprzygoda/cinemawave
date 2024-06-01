import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

export default function AccountMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex ${isOpen ? "block" : "hidden"}`}
    >
      <div className={"flex flex-col gap-3"}>
        <div className={"px-3 group/item flex gap-3 items-center w-full"}>
          <img
            className={"w-8 rounded-md"}
            src="/images/default-blue.png"
            alt="userIcon"
          />
          <p className={"text-white text-sm group-hover/items:underline"}>
            Username
          </p>
        </div>
        <hr className={"bg-gray-600 border-0 h-px my-4"} />
        <button
          type={"button"}
          onClick={() => signOut()}
          className={"px-3 text-center text-white text-sm hover:underline"}
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
}
