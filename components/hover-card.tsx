"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { FaChevronDown, FaPlay, FaPlus } from "react-icons/fa";
import Image from "next/image";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useHydration } from "@/hooks/use-hydration";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TMDBMovie } from "@/lib/types";
import useTimeout from "@/hooks/use-timeout";
import useUnmountAnimation from "@/hooks/use-unmount-animation";
import useKeyPress from "@/hooks/use-key-press";
import { useMediaQuery } from "@/hooks/use-media-query";

const ANIMATION_DURATION = 300;
const OPEN_TIMEOUT = 500;
const CLOSE_TIMEOUT = 200;

type HoverCardContextProps = {
  isOpen: boolean;
  isMounted: boolean;
  isUnmounting: boolean;
  triggerRect: DOMRect | null;
  movieData: TMDBMovie;
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
  movieData: TMDBMovie;
};

const HoverCard = ({ children, movieData }: HoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const { isMounted, isUnmounting } = useUnmountAnimation(isOpen, ANIMATION_DURATION);
  const openTimeout = useTimeout();
  const closeTimeout = useTimeout();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const clearTimeouts = () => {
    openTimeout.clear();
    closeTimeout.clear();
  };

  const handleOpen = () => {
    if (isDesktop) {
      clearTimeouts();
      setIsOpen(true);
    }
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

  const hoverCardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!triggerRect || !hoverCardRef.current) return;

    const viewportWidth = window.innerWidth;
    const edgeOffset = viewportWidth * 0.04;
    const centerX = triggerRect.left + triggerRect.width / 2;

    const cardHeight = hoverCardRef.current.offsetHeight;
    const cardWidth = hoverCardRef.current.offsetWidth;

    const left = Math.min(
      Math.max(centerX - cardWidth / 2, edgeOffset),
      viewportWidth - cardWidth - edgeOffset,
    );
    const top = triggerRect.top + window.scrollY + triggerRect.height / 2 - cardHeight / 2;

    hoverCardRef.current.style.left = `${Math.round(left)}px`;
    hoverCardRef.current.style.top = `${Math.round(top)}px`;
  }, [isMounted, triggerRect]);

  return (
    <HoverCardPortal>
      {isMounted && (
        <div
          ref={hoverCardRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={cn(
            `bg-background absolute z-50 w-[23.3vw] min-w-[330px] origin-center rounded-md shadow-[0px_3px_10px_rgba(0,0,0,0.75)]`,
            isUnmounting
              ? "animate-hover-card-close pointer-events-none"
              : "animate-hover-card-open pointer-events-auto",
          )}
          style={{
            animationDuration: `${ANIMATION_DURATION}ms`,
            animationFillMode: "forwards", //fixes flickering on close in firefox
          }}
        >
          <div className="relative aspect-video">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
              alt="movie"
              className="rounded-t-md object-cover"
              fill
            />
            <div className="absolute bottom-4 left-4 w-3/5 max-w-[150px]">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movieData.logo.file_path}`}
                alt="movie logo"
                className="object-contain"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className={"flex flex-col p-4"}>
            <div className={"mb-2 flex gap-3"}>
              <PlayButton />
              <AddToWatchButton />
              <MoreInfoButton />
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
            <div className={"mb-2 flex flex-wrap items-center gap-3"}>
              {movieData.genres.map((genre) => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
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

  //fixes the issue with the trigger rect not being updated on a scroll.
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

const PlayButton = () => {
  const { movieData } = useHoverCardContext();

  return (
    <Link
      href={`/play/${movieData.id}`}
      className={buttonVariants({ variant: "fab", size: "fab" })}
    >
      <FaPlay />
    </Link>
  );
};

const MoreInfoButton = () => {
  const { movieData } = useHoverCardContext();

  return (
    <Link
      href={`/info/${movieData.id}`}
      className={cn(buttonVariants({ variant: "fabOutline", size: "fab" }), "ms-auto")}
    >
      <FaChevronDown />
    </Link>
  );
};

const AddToWatchButton = () => {
  const { movieData } = useHoverCardContext();

  return (
    <Button variant={"fabOutline"} size={"fab"}>
      <FaPlus />
    </Button>
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
