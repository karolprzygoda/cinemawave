"use client";

import React, {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import useMountTransition from "@/hooks/use-mount-transition";

type DropdownMenuContextValues = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasTransitionedIn: boolean;
  variant: "onClick" | "onHover";
  leaveTimeout: RefObject<NodeJS.Timeout | null>;
  clearLeaveTimeout: () => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextValues | null>(null);

type DropdownMenuProps = {
  children: ReactNode;
  className?: string;
  variant?: "onClick" | "onHover";
};

const DropdownMenu = ({ variant = "onClick", className, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasTransitionedIn = useMountTransition(isOpen, 300);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearLeaveTimeout = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  };

  return (
    <DropdownMenuContext.Provider
      value={{
        isOpen,
        setIsOpen,
        hasTransitionedIn,
        variant,
        leaveTimeout,
        clearLeaveTimeout,
      }}
    >
      <div className={cn("group relative", className)}>{children}</div>
    </DropdownMenuContext.Provider>
  );
};

type DropdownMenuTriggerProps = {
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const DropdownMenuTrigger = ({ className, children, ...props }: DropdownMenuTriggerProps) => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuTrigger must be a child of DropdownMenu!");
  }

  const { variant, setIsOpen, leaveTimeout, clearLeaveTimeout, isOpen } = context;

  const handleClick = () => {
    if (variant === "onClick") {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOnMouseEnter = () => {
    if (variant === "onHover") {
      clearLeaveTimeout();
      setIsOpen(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (variant === "onHover") {
      leaveTimeout.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <button
      className={cn("cursor-pointer", className)}
      onClick={handleClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
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
  className?: string;
  children: ReactNode;
  align?: "left" | "right" | "center";
  sideOffset?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

const DropdownMenuContent = ({
  className,
  children,
  align = "right",
  ...props
}: DropdownMenuContentProps) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuContent must be a child of DropdownMenu!");
  }

  const { isOpen, hasTransitionedIn, variant, setIsOpen, clearLeaveTimeout } = context;

  const show = hasTransitionedIn && isOpen;

  const handleOnMouseEnter = () => {
    if (variant === "onHover") {
      clearLeaveTimeout();
      setIsOpen(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (variant === "onHover") {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  if (!(hasTransitionedIn || isOpen)) return null;

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={cn(
        "border-border-muted absolute top-14 flex w-56 flex-col gap-3 border bg-black/90 py-3 opacity-0 shadow transition duration-300",
        alignmentClasses[align],
        show && "opacity-100",
        className,
      )}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onKeyDown={handleKeyDown}
      role="menu"
      aria-labelledby={"dropdown-menu"}
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
};

type DropdownMenuItemProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

const DropdownMenuItem = ({ className, children, ...props }: DropdownMenuItemProps) => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuItem must be a child of DropdownMenu!");
  }

  return (
    <div
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
} & Omit<HTMLAttributes<HTMLHRElement>, "className">;

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
