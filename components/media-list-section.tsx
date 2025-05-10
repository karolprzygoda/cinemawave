import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import React from "react";
import { MediaListItem } from "@/lib/types";
import MediaBackdrop from "@/components/media-backdrop";
import Image from "next/image";
import NumberSVG from "@/components/number-svg";
import {
  MediaSectionCarousel,
  MediaSectionCarouselItem,
} from "@/components/media-section-carousel";
import PlayButton from "@/components/play-button";
import { FaChevronDown, FaPlay, FaPlus } from "react-icons/fa";
import AddToWatchlistButton from "@/components/add-to-watchlist-button";
import MediaDetailsButton from "@/components/media-details-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type TopTenSectionProps = {
  sectionTitle: string;
  mediaList: MediaListItem[];
  variant?: "list" | "top-ten";
};

const MediaListSection = ({ sectionTitle, mediaList, variant = "list" }: TopTenSectionProps) => {
  const isTopTen = variant === "top-ten";

  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h3 className={"mx-[4%] mb-3 font-semibold sm:text-xl lg:text-2xl xl:text-3xl 2xl:mx-[60px]"}>
        {sectionTitle}
      </h3>
      <MediaSectionCarousel>
        {mediaList.slice(0, isTopTen ? 10 : mediaList.length).map((mediaItem, index) => (
          <MediaSectionCarouselItem key={mediaItem.id}>
            <HoverCard opacityAnimation={isTopTen}>
              <HoverCardTrigger>
                <Link
                  href={`/watch/${mediaItem.id}`}
                  className={"-outline-offset-2 [&>*]:-z-10"} //embla carousel forces horizontal and vertical overflow hidden, so it also affects outlines.
                >
                  <SectionItem mediaData={mediaItem} isTopTen={isTopTen} index={index} />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
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
                  // style={{
                  //   willChange: "opacity",
                  //   animationDuration: `${ANIMATION_DURATION}ms`,
                  //   animationFillMode: "forwards",
                  // }}
                >
                  <div className={"mb-2 flex gap-3"}>
                    <PlayButton mediaId={mediaItem.id} variant={"fab"} size={"fab"}>
                      <FaPlay />
                    </PlayButton>
                    <AddToWatchlistButton variant={"fabOutline"} size={"fab"}>
                      <FaPlus />
                    </AddToWatchlistButton>
                    <MediaDetailsButton
                      mediaId={mediaItem.id}
                      variant={"fabOutline"}
                      size={"fab"}
                      className={"ms-auto"}
                    >
                      <FaChevronDown />
                    </MediaDetailsButton>
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
              </HoverCardContent>
            </HoverCard>
          </MediaSectionCarouselItem>
        ))}
      </MediaSectionCarousel>
      {/*<div*/}
      {/*  className={cn(*/}
      {/*    `bg-background absolute z-50 w-[23.3vw] min-w-[330px] origin-top-left rounded-md`,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <MediaBackdrop mediaData={mediaList[0]} className={"rounded-t-md"} />*/}

      {/*  <div*/}
      {/*    className={cn(*/}
      {/*      "flex flex-col p-4",*/}
      {/*      // isUnmounting ? "animate-fade-out" : "animate-fade-in",*/}
      {/*    )}*/}
      {/*    // style={{*/}
      {/*    //   willChange: "opacity",*/}
      {/*    //   animationDuration: `${ANIMATION_DURATION}ms`,*/}
      {/*    //   animationFillMode: "forwards",*/}
      {/*    // }}*/}
      {/*  >*/}
      {/*    <div className={"mb-2 flex gap-3"}>*/}
      {/*      <PlayButton mediaId={mediaList[0].id} variant={"fab"} size={"fab"}>*/}
      {/*        <FaPlay />*/}
      {/*      </PlayButton>*/}
      {/*      <AddToWatchlistButton variant={"fabOutline"} size={"fab"}>*/}
      {/*        <FaPlus />*/}
      {/*      </AddToWatchlistButton>*/}
      {/*      <MediaDetailsButton*/}
      {/*        mediaId={mediaList[0].id}*/}
      {/*        variant={"fabOutline"}*/}
      {/*        size={"fab"}*/}
      {/*        className={"ms-auto"}*/}
      {/*      >*/}
      {/*        <FaChevronDown />*/}
      {/*      </MediaDetailsButton>*/}
      {/*    </div>*/}
      {/*    <div className={"my-3 flex items-center gap-2"}>*/}
      {/*      <div className={"border-border border px-2 overflow-ellipsis"}>16+</div>*/}
      {/*      <div>6 sezonów</div>*/}
      {/*      <div*/}
      {/*        className={*/}
      {/*          "border-border rounded-radius text-muted-foreground border px-2 text-xs font-semibold"*/}
      {/*        }*/}
      {/*      >*/}
      {/*        HD*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className={"mb-2 flex flex-wrap items-center gap-3"}>*/}
      {/*      {mediaList[0].genres.map((genre) => (*/}
      {/*        <div key={genre.id}>{genre.name}</div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

type SectionItemProps = {
  isTopTen: boolean;
  mediaData: MediaListItem;
  index: number;
};

const SectionItem = ({ isTopTen, mediaData, index }: SectionItemProps) => {
  if (isTopTen) {
    return (
      <div className={"relative aspect-[10/9] h-full w-full lg:aspect-[4/3]"}>
        <NumberSVG
          index={index}
          className="absolute bottom-2 left-0 h-1/2 w-1/2 lg:bottom-0 lg:h-full"
        />
        <Image
          width={145}
          height={217}
          sizes="(min-width: 1280px) 8vw,(min-width: 1024px) 9vw,(min-width: 768px) 14vw, (min-width: 640px) 18vw, 28vw"
          className="rounded-r-radius absolute right-0 h-full w-3/5 lg:w-1/2"
          src={mediaData.poster_url}
          alt={`${mediaData.title} poster`}
        />
      </div>
    );
  }

  // return <div className={"relative aspect-video h-full w-full bg-white"}></div>;

  return <MediaBackdrop mediaData={mediaData} className={"rounded-radius"} />;
};

export default MediaListSection;
