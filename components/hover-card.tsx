"use client";

//#TODO dodac media querry hooka

import { Button } from "@/components/ui/button";
import { FaChevronDown, FaPlay, FaPlus } from "react-icons/fa";
import Image from "next/image";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHydration } from "@/hooks/use-hydration";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MovieListItem } from "@/lib/types";
import useTimeout from "@/hooks/use-timeout";
import useUnmountAnimation from "@/hooks/use-unmount-animation";
import useKeyPress from "@/hooks/use-key-press";

const HOVER_CARD_HEIGHT = 415;
const HOVER_CARD_WIDTH = 448;
const TRANSITION_DURATION = 300;
const OPEN_TIMEOUT = 500;
const CLOSE_TIMEOUT = 200;

const calculatePosition = (triggerRect: DOMRect | null) => {
  if (!triggerRect) return null;

  const viewportWidth = window.innerWidth;
  const edgeOffset = viewportWidth * 0.04;
  const centerX = triggerRect.left + triggerRect.width / 2;

  let left = centerX - HOVER_CARD_WIDTH / 2;
  const top = triggerRect.top + window.scrollY + triggerRect.height / 2 - HOVER_CARD_HEIGHT / 2;

  if (left < edgeOffset) {
    left = edgeOffset;
  }

  if (left + HOVER_CARD_WIDTH > viewportWidth - edgeOffset) {
    left = viewportWidth - HOVER_CARD_WIDTH - edgeOffset;
  }

  return { top, left };
};

type HoverCardContextProps = {
  isOpen: boolean;
  isMounted: boolean;
  isUnmounting: boolean;
  triggerRect: DOMRect | null;
  movieData: MovieListItem;
  setTriggerRect: Dispatch<SetStateAction<DOMRect | null>>;
  handleOpen: () => void;
  handleClose: () => void;
  handleDebouncedOpen: (e: React.MouseEvent) => void;
  handleDebouncedClose: () => void;
};

const HoverCardContext = createContext<HoverCardContextProps | null>(null);

const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error("useHoverCardContext must be used within a HoverCardProvider");
  }
  return context;
};

type HoverCardProps = {
  children: ReactNode;
  movieData: MovieListItem;
};

const HoverCard = ({ children, movieData }: HoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const { isMounted, isUnmounting } = useUnmountAnimation(isOpen, TRANSITION_DURATION);
  const openTimeout = useTimeout();
  const closeTimeout = useTimeout();

  const clearTimeouts = () => {
    openTimeout.clear();
    closeTimeout.clear();
  };

  const handleOpen = () => {
    clearTimeouts();
    setIsOpen(true);
  };

  const handleClose = () => {
    clearTimeouts();
    setIsOpen(false);
  };

  const handleDebouncedOpen = (e: React.MouseEvent) => {
    clearTimeouts();
    const target = e.currentTarget;
    openTimeout.set(() => {
      setIsOpen(true);
      setTriggerRect(target.getBoundingClientRect());
    }, OPEN_TIMEOUT);
  };

  const handleDebouncedClose = () => {
    clearTimeouts();
    closeTimeout.set(() => setIsOpen(false), CLOSE_TIMEOUT);
  };

  useKeyPress("Escape", handleClose);

  return (
    <HoverCardContext.Provider
      value={{
        isOpen,
        isMounted,
        isUnmounting,
        triggerRect,
        movieData,
        setTriggerRect,
        handleOpen,
        handleClose,
        handleDebouncedOpen,
        handleDebouncedClose,
      }}
    >
      {children}
      <HoverCardContent />
    </HoverCardContext.Provider>
  );
};

const HoverCardContent = () => {
  const { triggerRect, isMounted, isUnmounting, movieData, handleOpen, handleClose } =
    useHoverCardContext();

  if (!isMounted) return null;

  return (
    <HoverCardPortal>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={cn(
          `bg-background absolute top-0 left-0 z-50 origin-center rounded-md shadow-[0px_3px_10px_rgba(0,0,0,0.75)]`,
          isUnmounting
            ? "animate-hover-card-close pointer-events-none"
            : "animate-hover-card-open pointer-events-auto",
        )}
        style={{
          ...calculatePosition(triggerRect),
          height: HOVER_CARD_HEIGHT,
          width: HOVER_CARD_WIDTH,
          animationDuration: `${TRANSITION_DURATION}ms`,
        }}
      >
        <div className={"relative h-[245px]"}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}`}
            alt={"movie"}
            className={"rounded-t-md"}
            fill
          />
        </div>
        <div className={"flex flex-col p-4"}>
          <div className={"mb-2 flex gap-3"}>
            <Button variant={"fab"} size={"fab"}>
              <FaPlay />
            </Button>
            <Button variant={"fabOutline"} size={"fab"}>
              <FaPlus />
            </Button>
            <Button variant={"fabOutline"} size={"fab"} className={"ms-auto"}>
              <FaChevronDown />
            </Button>
          </div>
          <div className={"my-3 flex items-center gap-2"}>
            <div className={"border-border border px-2 overflow-ellipsis"}>16+</div>
            <div>6 sezonów</div>
            <div
              className={
                "border-border rounded-radius text-muted-foreground border px-2 text-xs font-semibold"
              }
            >
              HD
            </div>
          </div>
          <div className={"mb-2 flex items-center gap-3"}>
            <div>O nietypowej tematyce</div>
            <div>Mocny</div>
            <div>Dramat</div>
          </div>
        </div>
      </div>
    </HoverCardPortal>
  );
};

type HoverCardTriggerProps = {
  children: ReactNode;
  className?: string;
};

const HoverCardTrigger = ({ children, className }: HoverCardTriggerProps) => {
  const { isOpen, movieData, setTriggerRect, handleDebouncedOpen, handleDebouncedClose } =
    useHoverCardContext();
  const hoverCardTriggerRef = useRef<HTMLAnchorElement | null>(null);

  //fixes the issue with the trigger rect not being updated on scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const rect = hoverCardTriggerRef.current?.getBoundingClientRect();
      if (rect) {
        setTriggerRect(rect);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, setTriggerRect]);

  return (
    <Link
      ref={hoverCardTriggerRef}
      href={`/watch/${movieData.id}`}
      className={className}
      onMouseEnter={handleDebouncedOpen}
      onMouseLeave={handleDebouncedClose}
    >
      {children}
    </Link>
  );
};

type HoverCardPortalProps = {
  children: ReactNode;
};

const HoverCardPortal = ({ children }: HoverCardPortalProps) => {
  const mounted = useHydration();

  if (!mounted) return null;

  return createPortal(children, document.body);
};

export { HoverCard, HoverCardTrigger };
