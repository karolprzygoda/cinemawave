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
import useKeyPress from "@/hooks/use-key-press";
import useHideAppOverflow from "@/hooks/use-hide-app-overflow";
import { motion } from "@/components/ui/motion";
import Portal from "@/components/ui/portal";

const ANIMATION_DURATION = 300;

type OffcanvasContextProps = {
  isOpen: boolean;
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

  useHideAppOverflow(isOpen);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useKeyPress("Escape", handleClose);

  return (
    <OffcanvasContext.Provider value={{ isOpen, handleOpen, handleClose }}>
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
  const { isOpen } = useOffcanvasContext();

  const baseClasses = "fixed z-[9999] gap-4 bg-background shadow-lg border-border-muted ";

  const sideClasses = {
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  };

  return (
    <Portal>
      <OffcanvasBackDrop />
      <motion.div
        show={isOpen}
        animate={{
          keyframes: [
            {
              transform: side === "left" ? "translateX(-100%)" : "translateX(100%)",
            },
            {
              transform: "translateX(0)",
            },
          ],
          options: {
            duration: ANIMATION_DURATION,
            easing: "ease-out",
            fill: "forwards",
          },
        }}
        exit={{
          keyframes: [
            {
              transform: "translateX(0)",
            },
            {
              transform: side === "left" ? "translateX(-100%)" : "translateX(100%)",
            },
          ],
          options: {
            duration: ANIMATION_DURATION,
            easing: "ease-out",
            fill: "forwards",
          },
        }}
        className={cn(baseClasses, sideClasses[side], className)}
        aria-label="Side panel"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...props}
      >
        {children}
      </motion.div>
    </Portal>
  );
};

const OffcanvasBackDrop = () => {
  const { isOpen, handleClose } = useOffcanvasContext();

  return (
    <motion.div
      show={isOpen}
      animate={{
        keyframes: [
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
        ],
        options: {
          duration: ANIMATION_DURATION,
          easing: "ease-out",
          fill: "forwards",
        },
      }}
      exit={{
        keyframes: [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        options: {
          duration: ANIMATION_DURATION,
          easing: "ease-out",
          fill: "forwards",
        },
      }}
      className={"fixed top-0 right-0 z-[9999] h-screen w-screen bg-black/70"}
      onClick={handleClose}
      aria-label="Backdrop"
    ></motion.div>
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

export { Offcanvas, OffcanvasTrigger, OffcanvasContent, OffcanvasCloseButton, OffcanvasHeader };
