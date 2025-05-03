import Link from "next/link";
import { MediaListItem } from "@/lib/types";
import { ReactNode } from "react";

type MediaDetailsButtonProps = {
  mediaId: MediaListItem["id"];
  children: ReactNode;
  className?: string;
};

const MediaDetailsButton = ({ mediaId, children, className }: MediaDetailsButtonProps) => {
  return (
    <Link href={`/info/${mediaId}`} className={className}>
      <span className={"sr-only"}>More information about media {mediaId}</span>
      {children}
    </Link>
  );
};

export default MediaDetailsButton;
