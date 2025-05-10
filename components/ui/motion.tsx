"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  ElementType,
  Ref,
  ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/utils";
import mergeRefs from "next/dist/client/components/react-dev-overlay/ui/utils/merge-refs";
import { AnimationType } from "@/lib/types";

type MotionBaseProps<E extends ElementType> = {
  as?: E;
  show: boolean;
  initial: AnimationType;
  exit: AnimationType;
  ref?: Ref<HTMLElement>;
  className?: string;
};

type MotionProps<E extends ElementType> = MotionBaseProps<E> & ComponentPropsWithoutRef<E>;

const Motion = <E extends ElementType = "div">({
  as,
  show,
  initial,
  exit,
  ref,
  children,
  className,
  ...props
}: MotionProps<E>) => {
  const Component = as || "div";
  const motionRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const mergedRef = mergeRefs(motionRef, ref);
  const [isMounted, setIsMounted] = useState(show);
  const [isUnmounting, setIsUnmounting] = useState(false);

  useLayoutEffect(() => {
    if (show) {
      setIsMounted(true);
      setIsUnmounting(false);
    } else {
      setIsUnmounting(true);
    }
  }, [show]);

  useLayoutEffect(() => {
    const motionEl = motionRef.current;
    if (!motionEl) return;

    animationRef.current?.cancel();

    const runAnimation = (
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
      onFinish?: () => void,
    ) => {
      animationRef.current = motionEl.animate(keyframes, options);
      animationRef.current.onfinish = () => {
        animationRef.current = null;
        onFinish?.();
      };
    };

    if (isUnmounting) {
      runAnimation(exit.keyframes, exit.options, () => setIsMounted(false));
    } else {
      runAnimation(initial.keyframes, initial.options);
    }
  }, [exit, initial, isUnmounting]);

  if (!isMounted) return null;

  return (
    <Component
      ref={mergedRef}
      className={cn("will-change-transform", className)}
      {...(props as ComponentPropsWithoutRef<E>)}
    >
      {children}
    </Component>
  );
};

const createMotionComponent = <E extends ElementType>(Component: E) => {
  const Wrapped = (props: MotionProps<E>) => {
    return <Motion as={Component} {...props} />;
  };

  Wrapped.displayName = `motion.${typeof Component === "string" ? Component : "custom"}`;
  return Wrapped;
};

export const motion = {
  div: createMotionComponent("div"),
  span: createMotionComponent("span"),
  p: createMotionComponent("p"),
  section: createMotionComponent("section"),
  article: createMotionComponent("article"),
  header: createMotionComponent("header"),
  footer: createMotionComponent("footer"),
  main: createMotionComponent("main"),
  nav: createMotionComponent("nav"),
  aside: createMotionComponent("aside"),
  ul: createMotionComponent("ul"),
  li: createMotionComponent("li"),
  ol: createMotionComponent("ol"),
  h1: createMotionComponent("h1"),
  h2: createMotionComponent("h2"),
  h3: createMotionComponent("h3"),
  h4: createMotionComponent("h4"),
  h5: createMotionComponent("h5"),
  h6: createMotionComponent("h6"),
  button: createMotionComponent("button"),
  a: createMotionComponent("a"),
  img: createMotionComponent("img"),
  form: createMotionComponent("form"),
  input: createMotionComponent("input"),
  textarea: createMotionComponent("textarea"),
  select: createMotionComponent("select"),
  label: createMotionComponent("label"),
  table: createMotionComponent("table"),
  tr: createMotionComponent("tr"),
  td: createMotionComponent("td"),
  th: createMotionComponent("th"),
  blockquote: createMotionComponent("blockquote"),
  figure: createMotionComponent("figure"),
  figcaption: createMotionComponent("figcaption"),
  details: createMotionComponent("details"),
  summary: createMotionComponent("summary"),
  dialog: createMotionComponent("dialog"),
};
