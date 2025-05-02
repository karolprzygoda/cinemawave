import Image from "next/image";
import React from "react";
import { MediaListItem } from "@/lib/types";

type MediaBackdropProps = {
  mediaData: MediaListItem;
  className?: string;
};

const MediaBackdrop = ({ mediaData, className }: MediaBackdropProps) => {
  return (
    <div className={"relative aspect-video h-full w-full"}>
      <Image
        fill
        className={className}
        src={`${mediaData.backdrop_url}`}
        alt={`${mediaData.title} poster`}
      />
      <div className="absolute bottom-[8%] left-[8%] w-1/3">
        {mediaData.logo_url ? (
          <Image
            src={mediaData.logo_url}
            alt="movie logo"
            className="object-contain"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <span className={"font-semibold"}>{mediaData.title}</span>
        )}
      </div>
    </div>
  );
};

export default MediaBackdrop;
