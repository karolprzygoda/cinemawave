import Link from "next/link";
import React, { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MediaListItem } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";

type PlayButtonProps = {
  mediaId: MediaListItem["id"];
} & ComponentProps<typeof Button>;

const PlayButton = ({ mediaId, children, className, variant, size }: PlayButtonProps) => {
  return (
    <Link href={`/play/${mediaId}`} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
};

export default PlayButton;
