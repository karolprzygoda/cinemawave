"use client";

import {
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

const DropdownMenuContext = createContext<DropdownMenuContextValues | null>(
  null,
);

type DropdownMenuProps = {
  children: ReactNode;
  variant?: "onClick" | "onHover";
};

const DropdownMenu = ({ variant = "onClick", children }: DropdownMenuProps) => {
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
      <div className={"group relative"}>{children}</div>
    </DropdownMenuContext.Provider>
  );
};

type DropdownMenuTriggerProps = {
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const DropdownMenuTrigger = ({
  className,
  children,

  ...props
}: DropdownMenuTriggerProps) => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuTrigger has to be child of DropDownMenu!");
  }

  const { variant, setIsOpen, leaveTimeout, clearLeaveTimeout, isOpen } =
    context;

  const handleClick = () => {
    setIsOpen((prev) => !prev);
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

  return (
    <button
      className={cn("cursor-pointer", className)}
      onClick={variant === "onClick" ? handleClick : () => {}}
      onMouseEnter={variant === "onHover" ? handleOnMouseEnter : undefined}
      onMouseLeave={variant === "onHover" ? handleOnMouseLeave : undefined}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls="dropdown-menu"
      {...props}
    >
      {children}
    </button>
  );
};

type DropdownMenuContentProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLUListElement>, "className" | "children">;

const DropdownMenuContent = ({
  className,
  children,
  ...props
}: DropdownMenuContentProps) => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuTrigger has to be child of DropDownMenu!");
  }

  const { isOpen, hasTransitionedIn, variant, setIsOpen, clearLeaveTimeout } =
    context;

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

  if (!(hasTransitionedIn || isOpen)) return null;

  return (
    <ul
      className={cn(
        "absolute top-14 right-0 flex w-56 flex-col gap-3 border border-neutral-800 bg-black/90 py-3 opacity-0 transition duration-300",
        hasTransitionedIn && isOpen && "opacity-100",
        hasTransitionedIn && !isOpen && "opacity-0",
        className,
      )}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      role="menu"
      id="dropdown-menu"
      {...props}
    >
      {children}
    </ul>
  );
};

type DropdownMenuItemProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLLIElement>, "className" | "children">;

const DropdownMenuItem = ({
  className,
  children,
  ...props
}: DropdownMenuItemProps) => {
  return (
    <li className={className} role="menuitem" tabIndex={-1} {...props}>
      {children}
    </li>
  );
};

type DropdownMenuSeparatorProps = {
  className?: string;
} & Omit<HTMLAttributes<HTMLHRElement>, "className">;

const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <hr
      className={cn("h-[1px] w-full border-neutral-800", className)}
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
