"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
  ElementType,
  PropsWithChildren,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  MouseEventHandler,
  PointerEventHandler,
} from "react";
import { cn } from "@/lib/utils";
import mergeRefs from "next/dist/client/components/react-dev-overlay/ui/utils/merge-refs";
import { AnimationType } from "@/lib/types";

// Defines the tag that will be rendered
type AsProp<C extends ElementType> = {
  as?: C;
};

// PropsToOmit<C, P> collects the keys of our custom props and expected HTML tag (as) attributes,
// so we can Omit them from the native props of C and avoid any name clashes.
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

// PolymorphicComponentProp constructs props for a polymorphic component by:
// Merging custom Props with `children` and all native HTML attributes of C except those whose keys conflict with your custom Props of polymorphic component.
export type PolymorphicComponentProp<C extends ElementType, Props = object> = PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// Makes sure the ref is of the correct type
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];

type MotionProps<C extends ElementType> = {
  show?: boolean;
  animate?: AnimationType;
  exit?: AnimationType;
  whileHover?: AnimationType;
  whileTap?: AnimationType;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onPointerUp?: PointerEventHandler;
  onPointerDown?: PointerEventHandler;
  onExitFinish?: () => void;
  ref?: PolymorphicRef<C>;
  className?: string;
};

const Motion = <C extends ElementType>({
  as,
  show = true,
  animate,
  exit,
  whileHover,
  whileTap,
  onMouseEnter,
  onMouseLeave,
  onPointerUp,
  onPointerDown,
  ref,
  onExitFinish,
  children,
  className,
  ...props
}: PolymorphicComponentProp<C, MotionProps<C>>) => {
  const Component = as ?? "div";
  const [shouldRender, setShouldRender] = useState(show);
  const motionRef = useRef<PolymorphicRef<C> | null>(null);
  const enterAnimationRef = useRef<Animation | null>(null);
  const exitAnimationRef = useRef<Animation | null>(null);
  const hoverAnimationRef = useRef<Animation | null>(null);
  const tapAnimationRef = useRef<Animation | null>(null);
  const mergedRef = mergeRefs(motionRef, ref);

  useLayoutEffect(() => {
    const motionElement = motionRef.current;
    if (!motionElement) return;

    if (exitAnimationRef.current) {
      exitAnimationRef.current.onfinish = null;
    }

    if (enterAnimationRef.current) {
      enterAnimationRef.current.onfinish = null;
    }

    if (show) {
      setShouldRender(true);
      if (animate) {
        enterAnimationRef.current = motionElement.animate(animate.keyframes, animate.options);
        enterAnimationRef.current!.onfinish = () => {
          enterAnimationRef.current!.commitStyles();
        };
      } else if (exitAnimationRef.current) {
        exitAnimationRef.current.cancel();
      }
    } else {
      if (exit) {
        exitAnimationRef.current = motionElement.animate(exit.keyframes, exit.options);
        exitAnimationRef.current!.onfinish = () => {
          setShouldRender(false);
          onExitFinish?.();
        };
      } else {
        setShouldRender(false);
      }
    }
  }, [exit, animate, show, onExitFinish]);

  const handleOnMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter?.(e);
    if (whileHover) {
      hoverAnimationRef.current = e.currentTarget.animate(whileHover.keyframes, whileHover.options);
    }
  };

  const handleOnMouseLeave = (e: React.MouseEvent) => {
    onMouseLeave?.(e);
    if (hoverAnimationRef.current) {
      hoverAnimationRef.current.reverse();
    }
  };

  const handleOnPointerUp = (e: React.PointerEvent) => {
    onPointerUp?.(e);
    if (tapAnimationRef.current) {
      tapAnimationRef.current.reverse();
    }
  };

  const handleOnPointerDown = (e: React.PointerEvent) => {
    onPointerDown?.(e);
    if (whileTap) {
      tapAnimationRef.current = e.currentTarget.animate(whileTap.keyframes, whileTap.options);
    }
  };

  if (!(show || shouldRender)) return null;

  return (
    <Component
      onPointerUp={handleOnPointerUp}
      onPointerDown={handleOnPointerDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      ref={mergedRef}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

const createMotionComponent = <T extends ElementType>(Component: T) => {
  const Wrapped = (props: PolymorphicComponentProp<T, MotionProps<T>>) => {
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
