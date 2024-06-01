import { ReactNode } from "react";
import useMountTransition from "@/hooks/useMountTransition";

export default function Offcanvas({
  children,
  isOpen,
  handleClose,
}: {
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const hasTransitionedIn = useMountTransition({
    isMounted: isOpen,
    unmountDelay: 1000,
  });

  return (
    <>
      {(hasTransitionedIn || isOpen) && (
        <>
          <div
            className={`  top-0 z-40 absolute w-screen h-screen bg-black transition-opacity duration-500 ${
              hasTransitionedIn && isOpen ? "opacity-60" : "opacity-0"
            }`}
            onClick={handleClose}
          ></div>

          <div
            className={
              " z-50 w-screen max-w-sm top-0 left-0 absolute bg-white h-dvh shadow-xl delay-400 duration-500 ease-in-out transition-transform transform " +
              (hasTransitionedIn && isOpen
                ? "translate-x-0"
                : "-translate-x-full")
            }
          >
            <div className="relative w-screen max-w-sm pb-10 flex flex-col space-y-6 h-full">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}
