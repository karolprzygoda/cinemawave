"use client";

import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import useMountTransition from "@/hooks/use-mount-transition";
import { createPortal } from "react-dom";
import { useHydration } from "@/hooks/use-hydration";
import useKeyPress from "@/hooks/use-key-press";

type OffcanvasContextProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasTransitionedIn: boolean;
};

const OffcanvasContext = createContext<OffcanvasContextProps | null>(null);

type OffcanvasProps = {
  children: ReactNode;
};

const Offcanvas = ({ children }: OffcanvasProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasTransitionedIn = useMountTransition(isOpen, 300);

  useKeyPress("Escape", () => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <OffcanvasContext.Provider value={{ isOpen, setIsOpen, hasTransitionedIn }}>
      {children}
    </OffcanvasContext.Provider>
  );
};

type OffcanvasTriggerProps = {
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const OffcanvasTrigger = ({ className, children, ...props }: OffcanvasTriggerProps) => {
  const context = useContext(OffcanvasContext);

  if (!context) {
    throw new Error("OffcanvasTrigger has to be child of Offcanvas!");
  }

  const { setIsOpen } = context;

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <button className={cn("cursor-pointer", className)} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

type OffcanvasContentProps = {
  className?: string;
  side?: "left" | "right";
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLUListElement>, "className" | "children">;

const OffcanvasContent = ({ className, side = "left", children }: OffcanvasContentProps) => {
  const context = useContext(OffcanvasContext);

  if (!context) {
    throw new Error("OffcanvasContent has to be child of Offcanvas!");
  }

  const { isOpen, hasTransitionedIn } = context;

  const show = hasTransitionedIn && isOpen;

  const baseClasses =
    "fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out border-border-muted bg-background transition-transform duration-300";

  const sideClasses = {
    left: "inset-y-0 left-0 h-full w-full border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-full border-l sm:max-w-sm",
  };

  const translateClasses = {
    left: show ? "translate-x-0" : "-translate-x-full",
    right: show ? "translate-x-0" : "translate-x-full",
  };

  return (
    <OffcanvasPortal>
      {(hasTransitionedIn || isOpen) && (
        <>
          <OffcanvasBackDrop />
          <div
            className={cn(baseClasses, sideClasses[side], translateClasses[side], className)}
            aria-hidden={!isOpen}
            aria-label="Side panel"
            role="dialog"
          >
            {children}
          </div>
        </>
      )}
    </OffcanvasPortal>
  );
};

const OffcanvasBackDrop = () => {
  const context = useContext(OffcanvasContext);

  if (!context) {
    throw new Error("OffcanvasBackDrop has to be child of Offcanvas!");
  }

  const { isOpen, setIsOpen, hasTransitionedIn } = context;

  const show = hasTransitionedIn && isOpen;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-50 h-screen w-screen bg-black/70 opacity-0 transition duration-300",
        show && "opacity-100",
      )}
      onClick={handleClose}
      aria-hidden={!isOpen}
      aria-label="Backdrop"
    ></div>
  );
};

type OffcanvasCloseButtonProps = {
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const OffcanvasCloseButton = ({ className, children }: OffcanvasCloseButtonProps) => {
  const context = useContext(OffcanvasContext);

  if (!context) {
    throw new Error("OffcanvasContent has to be child of Offcanvas!");
  }

  const { setIsOpen } = context;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <button className={cn("cursor-pointer", className)} onClick={handleClose}>
      {children}
    </button>
  );
};

type OffcanvasHeaderProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

const OffcanvasHeader = ({ className, children }: OffcanvasHeaderProps) => {
  return (
    <div className={cn("border-border-muted flex flex-col space-y-2 border-b p-4", className)}>
      {children}
    </div>
  );
};

type OffcanvasPortalProps = {
  children: ReactNode;
};

const OffcanvasPortal = ({ children }: OffcanvasPortalProps) => {
  const mounted = useHydration();

  if (!mounted) return null;

  return createPortal(children, document.body);
};

export { Offcanvas, OffcanvasTrigger, OffcanvasContent, OffcanvasCloseButton, OffcanvasHeader };
