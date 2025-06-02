"use client";

import Portal from "@/components/ui/portal";

const ANIMATION_DURATION = 100;
const POINTER_STYLES = {
  top: "after:-bottom-2 after:left-[calc(50%+var(--arrow-offset))] after:-translate-x-1/2 after:border-t-[1rem] after:border-l-[1rem] after:border-r-[1rem] after:border-t-white after:border-l-transparent after:border-r-transparent after:absolute mb-4",
  bottom:
    "after:-top-2 after:left-[calc(50%+var(--arrow-offset))] after:-translate-x-1/2 after:border-b-[1rem] after:border-l-[1rem] after:border-r-[1rem] after:border-b-white after:border-l-transparent after:border-r-transparent after:absolute mt-4",
  left: "after:-right-2 after:top-1/2 after:-translate-y-1/2 after:border-l-[1rem] after:border-t-[1rem] after:border-b-[1rem] after:border-l-white after:border-t-transparent after:border-b-transparent after:absolute mr-4",
  right:
    "after:-left-2 after:top-1/2 after:-translate-y-1/2 after:border-r-[1rem] after:border-t-[1rem] after:border-b-[1rem] after:border-r-white after:border-t-transparent after:border-b-transparent after:absolute ml-4",
};

const EDGE_MARGIN = 16; // Margin to avoid edges

import React, {
  ButtonHTMLAttributes,
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "@/components/ui/motion";
import { clamp, cn } from "@/lib/utils";
import { AsChildProps } from "@/lib/types";
import Slot from "@/components/ui/slot";

type TooltipContextProps = {
  show: boolean;
  triggerRect: DOMRect | null;
  handleOpen: (e: React.MouseEvent) => void;
  handleClose: () => void;
};

type TooltipProps = {
  children: ReactNode;
};

const TooltipContext = createContext<TooltipContextProps | null>(null);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltipContext must be used within a <Tooltip />");
  }
  return context;
};

const Tooltip = ({ children }: TooltipProps) => {
  const [show, setShow] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const handleOpen = (e: React.MouseEvent) => {
    setTriggerRect(e.currentTarget.getBoundingClientRect());
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <TooltipContext.Provider value={{ show, triggerRect, handleOpen, handleClose }}>
      {children}
    </TooltipContext.Provider>
  );
};

type TooltipTriggerProps = {
  asChild?: boolean;
} & AsChildProps<ButtonHTMLAttributes<HTMLButtonElement>>;

const TooltipTrigger = ({ asChild = false, ...props }: TooltipTriggerProps) => {
  const { handleOpen, handleClose } = useTooltipContext();

  const Comp = asChild ? Slot : "button";
  return <Comp onMouseEnter={handleOpen} onMouseLeave={handleClose} {...props} />;
};

type TooltipContentProps = {
  children?: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
};

const TooltipContent = ({ children, className, position = "top" }: TooltipContentProps) => {
  const { show, triggerRect } = useTooltipContext();
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [arrowOffset, setArrowOffset] = useState(0);
  const [actualPosition, setActualPosition] = useState(position);
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!triggerRect || !show || !tooltipContentRef.current) return;

    const tip = tooltipContentRef.current;
    const { width: trgW, height: trgH, left, top, right, bottom } = triggerRect;
    const { offsetWidth: tipW, offsetHeight: tipH } = tip;
    const { scrollX: sx, scrollY: sy } = window;
    const { scrollWidth: sw, scrollHeight: sh } = document.documentElement;

    const trgL = left + sx;
    const trgT = top + sy;
    const trgB = bottom + sy;
    const trgR = right + sx;
    const trgCX = trgL + trgW / 2;
    const trgCY = trgT + trgH / 2;

    const config = {
      top: {
        baseX: clamp(trgCX - tipW / 2, EDGE_MARGIN, sw - tipW - EDGE_MARGIN),
        baseY: trgT - tipH,
        shouldSwap: trgT - tipH <= 0,
        altPos: "bottom",
      },
      bottom: {
        baseX: clamp(trgCX - tipW / 2, EDGE_MARGIN, sw - tipW - EDGE_MARGIN),
        baseY: trgB,
        shouldSwap: trgB + tipH >= sh,
        altPos: "top",
      },
      left: {
        baseX: trgL - tipW,
        baseY: clamp(trgCY - tipH / 2, EDGE_MARGIN, sh - tipH - EDGE_MARGIN),
        shouldSwap: trgL - tipW <= 0,
        altPos: "right",
      },
      right: {
        baseX: trgR,
        baseY: clamp(trgCY - tipH / 2, EDGE_MARGIN, sh - tipH - EDGE_MARGIN),
        shouldSwap: trgR + tipW >= sw,
        altPos: "left",
      },
    } as const;

    const { baseX, baseY, shouldSwap, altPos } = config[position];

    const x = shouldSwap ? config[altPos].baseX : baseX;
    const y = shouldSwap ? config[altPos].baseY : baseY;

    if (shouldSwap) setActualPosition(altPos);

    setLeft(x);
    setTop(y);
    setArrowOffset(trgCX - tipW / 2 - x);
  }, [position, show, triggerRect]);

  return (
    <Portal>
      <motion.div
        ref={tooltipContentRef}
        show={show}
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
        className={"absolute z-50"}
        style={{ top, left, "--arrow-offset": `${arrowOffset}px` } as React.CSSProperties}
      >
        <div
          className={cn(
            "rounded-radius relative flex items-center justify-center bg-white px-6 py-2 text-2xl font-semibold text-nowrap text-black shadow-md",
            POINTER_STYLES[actualPosition],
            className,
          )}
        >
          {children}
        </div>
      </motion.div>
    </Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };
