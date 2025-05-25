"use client";

import Portal from "@/components/ui/portal";

const ANIMATION_DURATION = 100;
const POINTER_STYLES = {
  top: "after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-t-[1rem] after:border-l-[1rem] after:border-r-[1rem] after:border-t-white after:border-l-transparent after:border-r-transparent after:absolute mb-4",
  bottom:
    "after:-top-2 after:left-1/2 after:-translate-x-1/2 after:border-b-[1rem] after:border-l-[1rem] after:border-r-[1rem] after:border-b-white after:border-l-transparent after:border-r-transparent after:absolute mt-4",
  left: "after:-right-2 after:top-1/2 after:-translate-y-1/2 after:border-l-[1rem] after:border-t-[1rem] after:border-b-[1rem] after:border-l-white after:border-t-transparent after:border-b-transparent after:absolute mr-4",
  right:
    "after:-left-2 after:top-1/2 after:-translate-y-1/2 after:border-r-[1rem] after:border-t-[1rem] after:border-b-[1rem] after:border-r-white after:border-t-transparent after:border-b-transparent after:absolute ml-4",
};

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
import { cn } from "@/lib/utils";
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
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const tooltipContent = tooltipContentRef.current;
    if (!triggerRect || !show || !tooltipContent) return;
    const tooltipWidth = tooltipContent.offsetWidth;
    const tooltipHeight = tooltipContent.offsetHeight;

    switch (position) {
      case "top":
        setTop(triggerRect.top + window.scrollY - tooltipHeight);
        setLeft(triggerRect.left + window.scrollX + (triggerRect.width - tooltipWidth) / 2);
        break;
      case "bottom":
        setTop(triggerRect.bottom + window.scrollY);
        setLeft(triggerRect.left + window.scrollX + (triggerRect.width - tooltipWidth) / 2);
        break;
      case "left":
        setTop(triggerRect.top + window.scrollY + (triggerRect.height - tooltipHeight) / 2);
        setLeft(triggerRect.left + window.scrollX - tooltipWidth);
        break;
      case "right":
        setTop(triggerRect.top + window.scrollY + (triggerRect.height - tooltipHeight) / 2);
        setLeft(triggerRect.right + window.scrollX);
        break;
    }
  }, [triggerRect, show, position]);

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
        style={{ top, left }}
      >
        <div
          className={cn(
            "rounded-radius relative flex items-center justify-center bg-white px-6 py-2 text-2xl font-semibold text-black shadow-md",
            POINTER_STYLES[position],
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
