"use client";

import React, {
  ButtonHTMLAttributes,
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import useTimeout from "@/hooks/use-timeout";
import useKeyPress from "@/hooks/use-key-press";
import useOnClickOutside from "@/hooks/use-onclick-outside";
import { motion } from "@/components/ui/motion";

const ANIMATION_DURATION = 300;

const DROPDOWN_ALIGNMENT = {
  left: "left-0",
  right: "right-0",
  center: "left-1/2 -translate-x-1/2",
};

type DropdownMenuContextProps = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOnClickOpen: () => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextProps | null>(null);

const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenuContext must be used within a DropdownMenuProvider");
  }
  return context;
};

type DropdownMenuProps = {
  children: ReactNode;
  className?: string;
  variant?: "onClick" | "onHover";
};

const DropdownMenu = ({ children, className, variant = "onClick" }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useTimeout();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    closeTimeout.clear();
    setIsOpen(true);
  };

  const handleClose = () => {
    closeTimeout.clear();
    setIsOpen(false);
  };

  const handleOnClickOpen = () => {
    if (variant === "onClick") {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOnHoverOpen = () => {
    if (variant === "onHover") {
      closeTimeout.clear();
      handleOpen();
    }
  };

  const handleOnHoverClose = () => {
    if (variant === "onHover") {
      closeTimeout.clear();
      closeTimeout.set(() => setIsOpen(false), ANIMATION_DURATION);
    }
  };

  useKeyPress("Escape", handleClose);
  useOnClickOutside(dropdownRef, handleClose);

  return (
    <DropdownMenuContext.Provider
      value={{
        isOpen,
        handleOpen,
        handleClose,
        handleOnClickOpen,
      }}
    >
      <div
        ref={dropdownRef}
        onMouseEnter={handleOnHoverOpen}
        onMouseLeave={handleOnHoverClose}
        className={cn("relative", className)}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

type DropdownMenuTriggerProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownMenuTrigger = ({ children, className, ...props }: DropdownMenuTriggerProps) => {
  const { isOpen, handleOpen, handleOnClickOpen } = useDropdownMenuContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <button
      className={cn(
        "group/dropdown-trigger flex cursor-pointer items-center justify-center",
        className,
      )}
      onClick={handleOnClickOpen}
      onKeyDown={handleKeyDown}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={"dropdown-trigger"}
      {...props}
    >
      {children}
    </button>
  );
};

type DropdownMenuContentProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
} & HTMLAttributes<HTMLDivElement>;

const DropdownMenuContent = ({
  children,
  className,
  align = "right",
  ...props
}: DropdownMenuContentProps) => {
  const { isOpen } = useDropdownMenuContext();

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
      className={cn(
        "border-border-muted absolute top-14 flex w-56 flex-col gap-3 border bg-black/90 py-3 shadow",
        DROPDOWN_ALIGNMENT[align],
        className,
      )}
      role="menu"
      aria-label={"dropdown-menu"}
      tabIndex={-1}
      {...props}
    >
      {children}
    </motion.div>
  );
};

type DropdownMenuItemProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const DropdownMenuItem = ({ children, className, ...props }: DropdownMenuItemProps) => {
  const { handleClose } = useDropdownMenuContext();

  return (
    <div
      onClick={handleClose}
      className={cn("cursor-pointer px-[10px] py-[5px]", className)}
      role="menuitem"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
};

type DropdownMenuSeparatorProps = {
  className?: string;
} & HTMLAttributes<HTMLHRElement>;

const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => {
  return (
    <hr
      className={cn("border-border-muted h-[1px] w-full", className)}
      role="separator"
      {...props}
    />
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
