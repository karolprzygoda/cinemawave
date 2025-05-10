"use client";

import { useHydration } from "@/hooks/use-hydration";
import { createPortal } from "react-dom";
import { Key, ReactNode } from "react";

type PortalProps = {
  children: ReactNode;
  container?: Element | DocumentFragment;
  key?: Key | null;
};

const Portal = ({ children, container, key }: PortalProps) => {
  const mounted = useHydration();

  if (!mounted) return null;

  return createPortal(children, typeof container === "undefined" ? document.body : container, key);
};

export default Portal;
