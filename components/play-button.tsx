import Link from "next/link";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MediaListItem } from "@/lib/types";

type PlayButtonProps = {
  mediaId: MediaListItem["id"];
  className?: string;
  children?: ReactNode;
};

const PlayButton = ({ mediaId, children, className }: PlayButtonProps) => {
  return (
    <Link href={`/play/${mediaId}`} className={cn(className)}>
      {children}
    </Link>
  );
};

export default PlayButton;
