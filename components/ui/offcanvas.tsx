"use client";

import {
  ButtonHTMLAttributes,
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useHydration } from "@/hooks/use-hydration";
import useKeyPress from "@/hooks/use-key-press";
import useHideAppOverflow from "@/hooks/use-hide-app-overflow";
import useUnmountAnimation from "@/hooks/use-unmount-animation";

const ANIMATION_DURATION = 300;

type OffcanvasContextProps = {
  isMounted: boolean;
  isUnmounting: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const OffcanvasContext = createContext<OffcanvasContextProps | null>(null);

const useOffcanvasContext = () => {
  const context = useContext(OffcanvasContext);
  if (!context) {
    throw new Error("useOffcanvasContext must be used within an OffcanvasProvider");
  }
  return context;
};

type OffcanvasProps = {
  children: ReactNode;
};

const Offcanvas = ({ children }: OffcanvasProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMounted, isUnmounting } = useUnmountAnimation(isOpen, ANIMATION_DURATION);

  useHideAppOverflow(isOpen);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useKeyPress("Escape", handleClose);

  return (
    <OffcanvasContext.Provider value={{ isMounted, isUnmounting, handleOpen, handleClose }}>
      {children}
    </OffcanvasContext.Provider>
  );
};

type OffcanvasTriggerProps = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const OffcanvasTrigger = ({ className, children, ...props }: OffcanvasTriggerProps) => {
  const { handleOpen } = useOffcanvasContext();

  return (
    <button className={cn("cursor-pointer", className)} onClick={handleOpen} {...props}>
      {children}
    </button>
  );
};

type OffcanvasContentProps = {
  className?: string;
  side?: "left" | "right";
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const OffcanvasContent = ({
  className,
  side = "left",
  children,
  ...props
}: OffcanvasContentProps) => {
  const { isMounted, isUnmounting } = useOffcanvasContext();

  const baseClasses = "fixed z-[9999] gap-4 bg-background shadow-lg border-border-muted ";

  const sideClasses = {
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  };

  const animation = {
    left: isUnmounting ? "animate-slide-out-ltr" : "animate-slide-in-ltr",
    right: isUnmounting ? "animate-slide-out-rtl" : "animate-slide-in-rtl",
  };

  if (!isMounted) return null;

  return (
    <OffcanvasPortal>
      <OffcanvasBackDrop />
      <div
        className={cn(baseClasses, sideClasses[side], animation[side], className)}
        style={{
          animationDuration: `${ANIMATION_DURATION}ms`,
        }}
        aria-hidden={!isMounted}
        aria-label="Side panel"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    </OffcanvasPortal>
  );
};

const OffcanvasBackDrop = () => {
  const { isMounted, isUnmounting, handleClose } = useOffcanvasContext();

  return (
    <div
      className={cn(
        "fixed top-0 right-0 z-[9999] h-screen w-screen bg-black/70",
        isUnmounting ? "animate-fade-out" : "animate-fade-in",
      )}
      style={{
        animationDuration: `${ANIMATION_DURATION}ms`,
      }}
      onClick={handleClose}
      aria-hidden={!isMounted}
      aria-label="Backdrop"
    ></div>
  );
};

type OffcanvasCloseButtonProps = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const OffcanvasCloseButton = ({ className, children, ...props }: OffcanvasCloseButtonProps) => {
  const { handleClose } = useOffcanvasContext();

  return (
    <button className={cn("cursor-pointer", className)} onClick={handleClose} {...props}>
      {children}
    </button>
  );
};

type OffcanvasHeaderProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const OffcanvasHeader = ({ className, children, ...props }: OffcanvasHeaderProps) => {
  return (
    <div
      className={cn("border-border-muted flex flex-col space-y-2 border-b p-4", className)}
      {...props}
    >
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
