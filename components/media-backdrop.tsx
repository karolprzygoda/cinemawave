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
        sizes="(min-width: 1280px) calc(16.1vw - 15px), (min-width: 1040px) 18.18vw, (min-width: 780px) 22.92vw, (min-width: 640px) 30vw, 45.63vw"
      />
      <MediaBackdropLogo mediaData={mediaData} />
    </div>
  );
};

type MediaBackdropLogoProps = {
  mediaData: MediaListItem;
};

const MediaBackdropLogo = ({ mediaData }: MediaBackdropLogoProps) => {
  if (mediaData.provider !== "tmdb") {
    return null;
  }

  return (
    <div className="absolute bottom-[8%] left-[8%] w-1/3">
      {mediaData.logo ? (
        <Image
          src={mediaData.logo.file_path}
          alt={`${mediaData.title} logo`}
          className="h-auto w-full object-contain"
          width={mediaData.logo.width}
          height={mediaData.logo.height}
          priority
        />
      ) : (
        <span className={"font-semibold"}>{mediaData.title}</span>
      )}
    </div>
  );
};

export default MediaBackdrop;
