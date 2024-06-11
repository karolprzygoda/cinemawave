import { ReactNode } from "react";
import useMountTransition from "@/hooks/useMountTransition";
import ReactPortal from "@/components/ReactPortal";

export default function Offcanvas({
  className,
  children,
  isOpen,
  handleClose,
}: {
  className?: String;
  children?: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}) {
  const hasTransitionedIn = useMountTransition({
    isMounted: isOpen,
    unmountDelay: 500,
  });

  return (
    <ReactPortal>
      {(hasTransitionedIn || isOpen) && (
        <>
          <div
            className={`  top-0 z-40 absolute w-screen h-screen bg-black transition-opacity duration-500 ${
              hasTransitionedIn && isOpen ? "opacity-60" : "opacity-0"
            }`}
            onClick={handleClose}
          ></div>

          <div
            className={`${className} overflow-auto  z-50 w-screen max-w-xs top-0 left-0 absolute  h-screen shadow-xl delay-400 duration-500 ease-in-out transition-transform transform ${hasTransitionedIn && isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="min-w-[280px] relative w-full max-w-full pb-10 flex flex-col  h-full">
              {children}
            </div>
          </div>
        </>
      )}
    </ReactPortal>
  );
}
