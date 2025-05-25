"use client";

import Link, { LinkProps } from "next/link";
import React, { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MediaListItem } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";

type PlayButtonProps = {
  mediaId: MediaListItem["id"];
  children: ReactNode;
} & Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> &
  Omit<LinkProps, "href">;

const PlayButton = ({ mediaId, children, className, variant, size, ...props }: PlayButtonProps) => {
  return (
    <Link
      aria-label={"Play media"}
      href={`/play/${mediaId}`}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PlayButton;
