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
import useTimeout from "@/hooks/use-timeout";
import useUnmountAnimation from "@/hooks/use-unmount-animation";
import useKeyPress from "@/hooks/use-key-press";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTMDBGenres } from "@/components/tmdb-genres-provider";
import { TMDBMediaItemMap, TMDBMediaListResult } from "@/lib/tmdb-types";

const ANIMATION_DURATION = 200;
const OPEN_TIMEOUT = 500;
const CLOSE_TIMEOUT = 200;

type HoverCardContextProps<T extends keyof TMDBMediaItemMap> = {
  isOpen: boolean;
  isMounted: boolean;
  isUnmounting: boolean;
  triggerRect: DOMRect | null;
  mediaData: TMDBMediaListResult<T>;
  setTriggerRect: Dispatch<SetStateAction<DOMRect | null>>;
  handleOpen: () => void;
  handleClose: () => void;
  handleDebouncedOpen: (e: React.MouseEvent) => void;
  handleDebouncedClose: () => void;
  opacityAnimation: boolean;
};

const HoverCardContext = createContext<HoverCardContextProps<"tv" | "movie"> | null>(null);

const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error("useHoverCardContext must be used within a HoverCardProvider");
  }
  return context;
};

type HoverCardProps<T extends keyof TMDBMediaItemMap> = {
  children: ReactNode;
  mediaData: TMDBMediaListResult<T>;
  opacityAnimation?: boolean;
};

const HoverCard = <T extends keyof TMDBMediaItemMap>({
  children,

  mediaData,
  opacityAnimation = false,
}: HoverCardProps<T>) => {
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
    if (isDesktop) {
      clearTimeouts();
      const target = e.currentTarget;
      openTimeout.set(() => {
        setIsOpen(true);
        setTriggerRect(target.getBoundingClientRect());
      }, OPEN_TIMEOUT);
    }
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
        mediaData,
        setTriggerRect,
        handleOpen,
        handleClose,
        handleDebouncedOpen,
        handleDebouncedClose,
        opacityAnimation,
      }}
    >
      {children}
      <HoverCardContent />
    </HoverCardContext.Provider>
  );
};

const HoverCardContent = () => {
  const {
    triggerRect,
    isMounted,
    isUnmounting,
    mediaData,
    handleOpen,
    handleClose,
    opacityAnimation,
  } = useHoverCardContext();

  const hoverCardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!triggerRect || !hoverCardRef.current) return;

    const hoverCard = hoverCardRef.current;
    const vw = window.innerWidth;
    const edgeOffset = vw * 0.04;
    const paddingX = vw * 0.002; // 0.2vw trigger padding

    const triggerLeft = Math.round(triggerRect.left);
    const triggerTop = Math.round(triggerRect.top + window.scrollY);

    // hover-card width and height
    const cardW = hoverCard.offsetWidth;
    const cardH = hoverCard.offsetHeight;

    // trigger content width
    const contentW = triggerRect.width - 2 * paddingX;

    const scaleX = contentW / cardW;
    const scaleY = triggerRect.width / cardW;

    const initialLeft = triggerLeft + paddingX;

    const centerX = triggerRect.left + triggerRect.width / 2;
    const baseDeltaX = Math.round(centerX - cardW / 2 - initialLeft);
    const offsetY = Math.round(triggerRect.height / 2 - cardH / 2);

    const isLeftEdge = triggerRect.left <= edgeOffset + 1;
    const isRightEdge = triggerRect.left + triggerRect.width >= vw - 2 * edgeOffset - 1;

    const finalDeltaX = baseDeltaX + (isLeftEdge ? edgeOffset : isRightEdge ? -edgeOffset : 0);

    hoverCard.style.setProperty("--hover-scale-x", String(scaleX));
    hoverCard.style.setProperty("--hover-scale-y", String(scaleY));
    hoverCard.style.setProperty("--hover-translate-x", `${finalDeltaX}px`);
    hoverCard.style.setProperty("--hover-offset", `${offsetY}px`);

    hoverCard.style.left = `${initialLeft}px`;
    hoverCard.style.top = `${triggerTop}px`;
    hoverCard.style.transformOrigin = "left top";
  }, [isMounted, triggerRect]);

  useLayoutEffect(() => {
    const el = hoverCardRef.current;
    if (!el) return;

    if (isMounted && !isUnmounting) {
      el.animate(
        [
          {
            transform:
              "translateX(0) translateY(0) scale(var(--hover-scale-x), var(--hover-scale-y))",
            boxShadow: "none",
            backgroundColor: "transparent",
            opacity: opacityAnimation ? 0 : 1,
          },
          {
            backgroundColor: "var(--background)",
            offset: 0.1,
          },
          {
            transform:
              "translateX(var(--hover-translate-x)) translateY(var(--hover-offset)) scale(1)",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            backgroundColor: "var(--background)",
            opacity: 1,
          },
        ],
        {
          duration: ANIMATION_DURATION,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    }

    if (isUnmounting) {
      el.animate(
        [
          {
            transform:
              "translateX(var(--hover-translate-x)) translateY(var(--hover-offset)) scale(1)",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
            backgroundColor: "var(--background)",
          },
          {
            backgroundColor: "var(--background)",
            offset: 0.5,
          },
          {
            transform:
              "translateX(0) translateY(0) scale(var(--hover-scale-x), var(--hover-scale-y))",
            boxShadow: "none",
            backgroundColor: "transparent",
            opacity: opacityAnimation ? 0 : 1,
          },
        ],
        {
          duration: ANIMATION_DURATION,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    }
  }, [isMounted, isUnmounting, opacityAnimation]);

  const { genresMap } = useTMDBGenres();

  const displayTitle = "title" in mediaData ? mediaData.title : mediaData.name;

  return (
    <HoverCardPortal>
      {isMounted && (
        <div
          ref={hoverCardRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={cn(
            `bg-background absolute z-50 w-[23.3vw] min-w-[330px] rounded-md will-change-transform`,
          )}
        >
          <div className="relative aspect-video">
            <Image
              src={`https://image.tmdb.org/t/p/original/${mediaData.backdrop_path}`}
              alt="movie"
              className="rounded-t-md object-cover"
              fill
            />
            <div className="absolute bottom-[8%] left-[8%] w-1/3">
              {mediaData.logo ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original/${mediaData.logo.file_path}`}
                  alt="movie logo"
                  className="object-contain"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <span className={"font-semibold"}>{displayTitle}</span>
              )}
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col p-4",
              isUnmounting ? "animate-fade-out" : "animate-fade-in",
            )}
            style={{
              willChange: "opacity",
              animationDuration: `${ANIMATION_DURATION}ms`,
              animationFillMode: "forwards",
            }}
          >
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
              {mediaData.genre_ids.map((genreId) => (
                <div key={genreId}>{genresMap.get(genreId)}</div>
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
  const { isOpen, mediaData, setTriggerRect, handleDebouncedOpen, handleDebouncedClose } =
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
      href={`/watch/${mediaData.id}`}
      onMouseEnter={handleDebouncedOpen}
      onMouseLeave={handleDebouncedClose}
      ref={hoverCardTriggerRef}
      className={cn(
        "group/hover-card-trigger relative flex h-full w-1/2 shrink-0 px-[0.2vw] focus:outline-none sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6",
        className,
      )}
    >
      <div className="before:rounded-radius relative h-full w-full before:pointer-events-none before:absolute before:inset-0 before:z-20 before:border-[2px] before:border-neutral-300 before:opacity-0 before:content-[''] group-focus/hover-card-trigger:before:opacity-100">
        {children}
      </div>
    </Link>
  );
};

const PlayButton = () => {
  const { mediaData } = useHoverCardContext();

  return (
    <Link
      href={`/play/${mediaData.id}`}
      className={buttonVariants({ variant: "fab", size: "fab" })}
    >
      <FaPlay />
    </Link>
  );
};

const MoreInfoButton = () => {
  const { mediaData } = useHoverCardContext();

  return (
    <Link
      href={`/info/${mediaData.id}`}
      className={cn(buttonVariants({ variant: "fabOutline", size: "fab" }), "ms-auto")}
    >
      <FaChevronDown />
    </Link>
  );
};

const AddToWatchButton = () => {
  const { mediaData } = useHoverCardContext();

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
