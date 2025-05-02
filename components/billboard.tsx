"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import PlayButton from "@/components/play-button";
import { cn } from "@/lib/utils";
import MediaDetailsButton from "@/components/media-details-button";
import { MediaListItem } from "@/lib/types";

type BillboardProps = {
  movie: MediaListItem;
};

const Billboard = ({ movie }: BillboardProps) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pauses the video when the tab is invisible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <div className="relative -mt-20 mb-[20px] hidden h-[40vw] w-full lg:block">
      <div className={"absolute -z-10 h-[56.25vw]"}>
        <video
          ref={videoRef}
          className={"h-full w-full object-cover"}
          disablePictureInPicture
          autoPlay
          muted={muted}
          loop
          poster={movie.backdrop_url}
        >
          <source src={movie.video_url} type="video/mp4" />
        </video>
        <BillboardMask />
      </div>
      <div
        className={"absolute bottom-0 left-[4%] z-50 flex max-w-1/2 flex-col gap-6 xl:max-w-2xl"}
      >
        <h2 className={"text-accent text-3xl font-bold drop-shadow-xl xl:text-6xl"}>
          {movie.title}
        </h2>
        <div className={"text-accent font-semibold drop-shadow-xl xl:text-xl"}>
          {movie.description}
        </div>
        <div className={"flex items-center gap-4"}>
          <PlayButton
            mediaId={movie.id}
            className={cn(
              buttonVariants({ variant: "accent" }),
              "h-11 px-8 text-xl xl:h-auto xl:py-3 xl:text-2xl xl:font-bold xl:[&_svg]:size-7",
            )}
          >
            <FaPlay />
            Play
          </PlayButton>
          <MediaDetailsButton
            mediaId={movie.id}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-11 px-8 text-xl xl:h-auto xl:py-3 xl:text-2xl xl:font-bold xl:[&_svg]:size-7",
            )}
          >
            <LuInfo />
            More Info
          </MediaDetailsButton>
        </div>
      </div>
      <Button
        onClick={handleToggleMute}
        variant={"fabOutline"}
        size={"fab"}
        aria-label={muted ? "Unmute" : "Mute"}
        className={
          "hover:bg-foreground/20 focus:bg-foreground/60 border-foreground text-foreground absolute right-[4%] bottom-0 h-14 w-14 [&_svg]:size-7"
        }
      >
        {muted ? <GoMute /> : <GoUnmute />}
      </Button>
    </div>
  );
};

const BillboardMask = () => {
  return (
    <>
      <div className="absolute top-auto bottom-[-1px] z-10 h-[14.7vw] w-full bg-[linear-gradient(180deg,hsla(0,0%,8%,0)_0%,hsla(0,0%,8%,0.15)_15%,hsla(0,0%,8%,0.35)_29%,hsla(0,0%,8%,0.58)_44%,#141414_68%,#141414_100%)] bg-[length:100%_100%] bg-[position:0_top] bg-repeat-x opacity-100"></div>
      <div className="absolute right-[26.09%] bottom-0 left-0 z-0 h-full bg-[linear-gradient(77deg,_rgba(0,_0,_0,_0.6),_transparent_85%)]"></div>
    </>
  );
};

export default Billboard;
