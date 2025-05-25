import Link, { LinkProps } from "next/link";
import { MediaListItem } from "@/lib/types";
import { ComponentProps, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MediaDetailsButtonProps = {
  mediaId: MediaListItem["id"];
  children: ReactNode;
} & Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> &
  Omit<LinkProps, "href">;

const MediaDetailsButton = ({
  mediaId,
  children,
  className,
  variant,
  size,
  ...props
}: MediaDetailsButtonProps) => {
  return (
    <Link
      href={`/info/${mediaId}`}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span className={"sr-only"}>More information about media {mediaId}</span>
      {children}
    </Link>
  );
};

export default MediaDetailsButton;
