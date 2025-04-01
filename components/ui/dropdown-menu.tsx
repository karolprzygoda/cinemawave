"use client";

import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import useMountTransition from "@/hooks/use-mount-transition";

type DropdownMenuContexValues = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  hasTransitionedIn: boolean;
};

const DropdownMenuContex = createContext<DropdownMenuContexValues | null>(null);

type DropdownMenuProps = {
  children: ReactNode;
};

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasTransitionedIn = useMountTransition(isOpen, 300);

  return (
    <DropdownMenuContex.Provider
      value={{ isOpen, setIsOpen, hasTransitionedIn }}
    >
      <div className={"relative"}>{children}</div>
    </DropdownMenuContex.Provider>
  );
};

type DropdownMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownMenuTrigger = ({ ...props }: DropdownMenuTriggerProps) => {
  const context = useContext(DropdownMenuContex);

  if (!context) {
    throw new Error("DropdownMenuTrigger has to be child of DropDownMenu!");
  }

  const { setIsOpen } = context;

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      {...props}
      className={cn("cursor-pointer", props.className)}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

type DropdownMenuContentProps = HTMLAttributes<HTMLUListElement>;

const DropdownMenuContent = ({ ...props }: DropdownMenuContentProps) => {
  const context = useContext(DropdownMenuContex);

  if (!context) {
    throw new Error("DropdownMenuTrigger has to be child of DropDownMenu!");
  }

  const { isOpen, hasTransitionedIn } = context;

  if (!(hasTransitionedIn || isOpen)) return null;

  return (
    <ul
      className={cn(
        "absolute top-14 right-0 flex w-56 flex-col gap-3 border border-neutral-800 bg-black/90 py-5 opacity-0 transition duration-300",
        hasTransitionedIn && isOpen && "opacity-100",
        hasTransitionedIn && !isOpen && "opacity-0",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </ul>
  );
};

type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement>;

const DropdownMenuItem = ({ ...props }: DropdownMenuItemProps) => {
  return (
    <li className={cn("", props.className)} {...props}>
      {props.children}
    </li>
  );
};

type DropdownMenuSeparatorProps = HTMLAttributes<HTMLHRElement>;

const DropdownMenuSeparator = ({ ...props }: DropdownMenuSeparatorProps) => {
  return (
    <hr
      className={cn("h-[1px] w-full border-neutral-800", props.className)}
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
