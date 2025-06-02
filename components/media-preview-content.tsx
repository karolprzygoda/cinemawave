"use client";

import MediaBackdrop from "@/components/media-backdrop";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import PlayButton from "@/components/play-button";
import { FaChevronDown, FaPlay, FaPlus } from "react-icons/fa";
import AddToWatchlistButton from "@/components/add-to-watchlist-button";
import MediaDetailsButton from "@/components/media-details-button";
import React from "react";
import { MediaListItem } from "@/lib/types";

type MediaPreviewContentProps = {
  mediaItem: MediaListItem;
};

const MediaPreviewContent = ({ mediaItem }: MediaPreviewContentProps) => {
  return (
    <>
      {mediaItem.video_url ? (
        <video
          className="aspect-video h-full w-full rounded-t-md object-cover"
          autoPlay
          disablePictureInPicture
          muted
          loop
          poster={mediaItem.backdrop_url}
          src={mediaItem.video_url}
        ></video>
      ) : (
        <MediaBackdrop mediaData={mediaItem} className={"rounded-t-md"} />
      )}
      <div
        className={cn(
          "flex flex-col p-4",
          // isUnmounting ? "animate-fade-out" : "animate-fade-in",
        )}
      >
        <div className={"mb-2 flex gap-3"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PlayButton mediaId={mediaItem.id} variant={"fab"} size={"fab"}>
                <FaPlay />
              </PlayButton>
            </TooltipTrigger>
            <TooltipContent position={"left"}>
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <AddToWatchlistButton variant={"fabOutline"} size={"fab"}>
                <FaPlus />
              </AddToWatchlistButton>
            </TooltipTrigger>
            <TooltipContent>Add to My Watchlist</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <MediaDetailsButton
                mediaId={mediaItem.id}
                variant={"fabOutline"}
                size={"fab"}
                className={"ms-auto"}
              >
                <FaChevronDown />
              </MediaDetailsButton>
            </TooltipTrigger>
            <TooltipContent>More Information</TooltipContent>
          </Tooltip>
        </div>
        <div className={"my-3 flex items-center gap-2"}>
          <div className={"border-border border px-2 overflow-ellipsis"}>16+</div>
          <div>6 sezonów</div>
          <div
            className={
              "border-border rounded-radius text-muted-foreground border px-2 text-xs font-semibold"
            }
          >
            HD
          </div>
        </div>
        <div className={"mb-2 flex flex-wrap items-center gap-3"}>
          {mediaItem.genres.map((genre) => (
            <div key={genre.id}>{genre.name}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MediaPreviewContent;
