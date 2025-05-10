"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useKeyPress from "@/hooks/use-key-press";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, getVerticalScrollbarWidth } from "@/lib/utils";
import useDebouncedToggle from "@/hooks/use-debounced-toggle";
import { motion } from "@/components/ui/motion";
import Portal from "@/components/ui/portal";

const ANIMATION_DURATION = 200;
const OPEN_TIMEOUT = 500;
const CLOSE_TIMEOUT = 200;

type HoverCardProps = {
  children: ReactNode;
  opacityAnimation?: boolean;
  edgeOffset?: number;
};

type HoverCardContextProps = {
  isOpen: boolean;
  triggerRect: DOMRect | null;
  opacityAnimation: boolean;
  edgeOffset: number;
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

const HoverCard = ({ children, opacityAnimation = false, edgeOffset = 0.05 }: HoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const { open, close, clear } = useDebouncedToggle(OPEN_TIMEOUT, CLOSE_TIMEOUT);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleOpen = () => {
    if (isDesktop) {
      clear();
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    clear();
    setIsOpen(false);
  };

  const handleDebouncedOpen = (e: React.MouseEvent) => {
    if (isDesktop) {
      const target = e.currentTarget;
      open(() => {
        setIsOpen(true);
        setTriggerRect(target.getBoundingClientRect());
      });
    }
  };

  const handleDebouncedClose = () => {
    close(() => setIsOpen(false));
  };

  useKeyPress("Escape", handleClose);

  return (
    <HoverCardContext.Provider
      value={{
        isOpen,
        triggerRect,
        opacityAnimation,
        edgeOffset,
        setTriggerRect,
        handleOpen,
        handleClose,
        handleDebouncedOpen,
        handleDebouncedClose,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
};

type HoverCardContentProps = {
  children: ReactNode;
  className?: string;
};

const HoverCardContent = ({ children, className }: HoverCardContentProps) => {
  const { isOpen, triggerRect, opacityAnimation, edgeOffset, handleOpen, handleClose } =
    useHoverCardContext();

  const [scale, setScale] = useState(1);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useLayoutEffect(() => {
    if (!triggerRect) return;

    const vw = window.innerWidth;

    const margin = vw * edgeOffset;
    const itemPadding = vw * 0.002;

    const triggerLeft = Math.round(triggerRect.left);
    const triggerRight = Math.round(triggerRect.right);
    const triggerTop = Math.round(triggerRect.top + window.scrollY);
    const triggerWidth = Math.round(triggerRect.width);
    const triggerHeight = Math.round(triggerRect.height);

    const cardW = Math.round(Math.max(vw * 0.2265625, 330));

    const scale = triggerWidth / cardW;

    const isLeftEdge = triggerLeft <= margin + 1;
    const isRightEdge = triggerRight >= vw - getVerticalScrollbarWidth() - margin - 2;

    const centerX = Math.round((triggerWidth - cardW) / 2);
    const centerY = Math.round(triggerHeight / 2);

    const translateX = isLeftEdge ? -itemPadding : isRightEdge ? triggerWidth - cardW : centerX;

    setScale(scale);
    setLeft(triggerLeft);
    setTop(triggerTop);
    setTranslateX(translateX);
    setTranslateY(centerY);
  }, [triggerRect, edgeOffset]);

  return (
    <Portal>
      <motion.div
        show={isOpen}
        role={"dialog"}
        style={{ left, top }}
        initial={{
          keyframes: [
            {
              transform: `translateY(0) translateX(0) translateZ(0) scale(${scale})`,
              boxShadow: "none",
              backgroundColor: "transparent",
              opacity: opacityAnimation ? 0 : 1,
            },
            {
              backgroundColor: "var(--background)",
              offset: 0.1,
            },
            {
              transform: `translateY(calc(-50% + ${translateY}px)) translateX(${translateX}px) translateZ(0) scale(1)`,
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
              backgroundColor: "var(--background)",
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
              transform: `translateY(calc(-50% + ${translateY}px)) translateX(${translateX}px) translateZ(0) scale(1)`,
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.75)",
              backgroundColor: "var(--background)",
              opacity: 1,
            },
            {
              backgroundColor: "var(--background)",
              offset: 0.5,
            },
            {
              transform: `translateY(0) translateZ(0) scale(${scale})`,
              boxShadow: "none",
              backgroundColor: "transparent",
              opacity: opacityAnimation ? 0 : 1,
            },
          ],
          options: {
            duration: ANIMATION_DURATION,
            easing: "ease-out",
            fill: "forwards",
          },
        }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={cn(
          "bg-background absolute z-50 w-[22.65625vw] min-w-[330px] origin-top-left rounded-md", //origin-top-left prevents subpixel rendering issues
          className,
        )}
      >
        {children}
      </motion.div>
    </Portal>
  );
};

type HoverCardTriggerProps = {
  children: ReactNode;
  className?: string;
};

const HoverCardTrigger = ({ children, className }: HoverCardTriggerProps) => {
  const { setTriggerRect, handleDebouncedOpen, handleDebouncedClose } = useHoverCardContext();
  const hoverCardTriggerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!hoverCardTriggerRef.current) return;

    const rect = hoverCardTriggerRef.current.getBoundingClientRect();
    setTriggerRect(rect);
  }, [setTriggerRect]);

  return (
    <div
      onMouseEnter={handleDebouncedOpen}
      onMouseLeave={handleDebouncedClose}
      ref={hoverCardTriggerRef}
      className={className}
    >
      {children}
    </div>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
