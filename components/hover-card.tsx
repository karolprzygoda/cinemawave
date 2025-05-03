"use client";

import { buttonVariants } from "@/components/ui/button";
import { FaChevronDown, FaPlay, FaPlus } from "react-icons/fa";
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
import PlayButton from "@/components/play-button";
import { MediaListItem } from "@/lib/types";
import MediaBackdrop from "@/components/media-backdrop";
import AddToWatchlistButton from "@/components/add-to-watchlist-button";
import MediaDetailsButton from "@/components/media-details-button";

const ANIMATION_DURATION = 200;
const OPEN_TIMEOUT = 500;
const CLOSE_TIMEOUT = 200;

type HoverCardContextProps = {
  isOpen: boolean;
  isMounted: boolean;
  isUnmounting: boolean;
  triggerRect: DOMRect | null;
  mediaData: MediaListItem;
  setTriggerRect: Dispatch<SetStateAction<DOMRect | null>>;
  handleOpen: () => void;
  handleClose: () => void;
  handleDebouncedOpen: (e: React.MouseEvent) => void;
  handleDebouncedClose: () => void;
  opacityAnimation: boolean;
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
  mediaData: MediaListItem;
  opacityAnimation?: boolean;
};

const HoverCard = ({ children, mediaData, opacityAnimation = false }: HoverCardProps) => {
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
        opacityAnimation,
        mediaData,
        setTriggerRect,
        handleOpen,
        handleClose,
        handleDebouncedOpen,
        handleDebouncedClose,
      }}
    >
      <HoverCardTrigger>{children}</HoverCardTrigger>
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
    opacityAnimation,
    handleOpen,
    handleClose,
  } = useHoverCardContext();

  const hoverCardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!triggerRect || !hoverCardRef.current) return;

    const hoverCard = hoverCardRef.current;
    const vw = window.innerWidth;
    const edgeOffset = vw * 0.04;

    const triggerLeft = Math.round(triggerRect.left);
    const triggerTop = Math.round(triggerRect.top + window.scrollY);

    // hover-card width and height
    const cardW = hoverCard.offsetWidth;
    const cardH = hoverCard.offsetHeight;

    const scale = triggerRect.width / cardW;

    const initialLeft = triggerLeft;

    const centerX = triggerRect.left + triggerRect.width / 2;
    const baseDeltaX = Math.round(centerX - cardW / 2 - initialLeft);
    const offsetY = Math.round(triggerRect.height / 2 - cardH / 2);

    const isLeftEdge = triggerRect.left <= edgeOffset + 1;
    const isRightEdge = triggerRect.left + triggerRect.width >= vw - 2 * edgeOffset - 1;

    const finalDeltaX = baseDeltaX + (isLeftEdge ? edgeOffset : isRightEdge ? -edgeOffset : 0);

    hoverCard.style.setProperty("--hover-scale", String(scale));
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
            transform: "translateX(0) translateY(0) scale(var(--hover-scale))",
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
            transform: "translateX(0) translateY(0) scale(var(--hover-scale))",
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

  return (
    <HoverCardPortal>
      {isMounted && (
        <div
          ref={hoverCardRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={`bg-background absolute z-50 w-[23.3vw] min-w-[330px] rounded-md will-change-transform`}
        >
          {mediaData.video_url ? (
            <video
              className="aspect-video h-full w-full rounded-t-md object-cover"
              autoPlay
              disablePictureInPicture
              muted
              loop
              poster={mediaData.backdrop_url}
              src={mediaData.video_url}
            ></video>
          ) : (
            <MediaBackdrop mediaData={mediaData} className={"rounded-t-md"} />
          )}
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
              <PlayButton
                mediaId={mediaData.id}
                className={buttonVariants({ variant: "fab", size: "fab" })}
              >
                <FaPlay />
              </PlayButton>
              <AddToWatchlistButton
                className={buttonVariants({ variant: "fabOutline", size: "fab" })}
              >
                <FaPlus />
              </AddToWatchlistButton>
              <MediaDetailsButton
                mediaId={mediaData.id}
                className={cn(buttonVariants({ variant: "fabOutline", size: "fab" }), "ms-auto")}
              >
                <FaChevronDown />
              </MediaDetailsButton>
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
              {mediaData.genres.map((genre) => (
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
};

const HoverCardTrigger = ({ children }: HoverCardTriggerProps) => {
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

export { HoverCard };
