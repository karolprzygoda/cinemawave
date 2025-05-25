"use client";

import React, { createContext, ReactNode, useContext, useLayoutEffect, useState } from "react";
import useKeyPress from "@/hooks/use-key-press";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, getVerticalScrollbarWidth } from "@/lib/utils";
import { motion } from "@/components/ui/motion";
import Portal from "@/components/ui/portal";
import useTimeout from "@/hooks/use-timeout";

const OPEN_TIMEOUT = 500;
const ANIMATION_OPTIONS = {
  duration: 200,
  easing: "ease-out",
  fill: "forwards" as const,
};

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
  handleOpen: () => void;
  handleDebounceOpen: (e: React.MouseEvent) => void;
  handleClose: () => void;
  handleCancelOpen: () => void;
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { set, clear: handleCancelOpen } = useTimeout();

  const handleOpen = () => {
    if (isDesktop) {
      setIsOpen(true);
    }
  };

  const handleDebounceOpen = (e: React.MouseEvent) => {
    if (isDesktop) {
      const target = e.currentTarget;
      set(() => {
        setTriggerRect(target.getBoundingClientRect());
        setIsOpen(true);
      }, OPEN_TIMEOUT);
    }
  };

  const handleClose = () => {
    handleCancelOpen();
    setIsOpen(false);
  };

  useKeyPress("Escape", handleClose);

  return (
    <HoverCardContext.Provider
      value={{
        isOpen,
        triggerRect,
        opacityAnimation,
        edgeOffset,
        handleOpen,
        handleDebounceOpen,
        handleClose,
        handleCancelOpen,
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
  const [safeToRender, setSafeToRender] = useState(false);

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
    setSafeToRender(true);
  }, [triggerRect, edgeOffset]);

  if (!safeToRender) return;

  return (
    <Portal>
      <motion.div
        show={isOpen}
        role={"dialog"}
        style={{
          left,
          top,
          transform: `scale(${scale}`,
          boxShadow: "none",
          backgroundColor: "transparent",
          opacity: opacityAnimation ? 0 : 1,
        }}
        animate={{
          keyframes: [
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
          options: ANIMATION_OPTIONS,
        }}
        exit={{
          keyframes: [
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
          options: ANIMATION_OPTIONS,
        }}
        onExitFinish={() => setSafeToRender(false)}
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
  const { handleDebounceOpen, handleCancelOpen } = useHoverCardContext();

  return (
    <div onMouseEnter={handleDebounceOpen} onMouseLeave={handleCancelOpen} className={className}>
      {children}
    </div>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent };
