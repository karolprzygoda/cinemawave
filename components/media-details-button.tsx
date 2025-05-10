import Link from "next/link";
import { MediaListItem } from "@/lib/types";
import { ComponentProps } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MediaDetailsButtonProps = {
  mediaId: MediaListItem["id"];
} & ComponentProps<typeof Button>;

const MediaDetailsButton = ({
  mediaId,
  children,
  className,
  variant,
  size,
}: MediaDetailsButtonProps) => {
  return (
    <Link href={`/info/${mediaId}`} className={cn(buttonVariants({ variant, size }), className)}>
      <span className={"sr-only"}>More information about media {mediaId}</span>
      {children}
    </Link>
  );
};

export default MediaDetailsButton;
