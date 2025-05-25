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
import Link from "next/link";
import MediaPreviewContent from "@/components/media-preview-content";

type TopTenSectionProps = {
  sectionTitle: string;
  mediaList: MediaListItem[];
  variant?: "list" | "top-ten";
};

const MediaListSection = ({ sectionTitle, mediaList, variant = "list" }: TopTenSectionProps) => {
  const isTopTen = variant === "top-ten";

  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h2 className={"mx-[4%] font-semibold 2xl:mx-[60px]"}>
        <Link
          className={
            "mb-2 inline-block hover:text-white sm:mb-3 sm:text-xl lg:text-2xl xl:mb-5 xl:text-[1.4vw] xl:leading-[1.25vw]"
          }
          href={"#"}
        >
          {sectionTitle}
        </Link>
      </h2>
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
                <MediaPreviewContent mediaItem={mediaItem} />
              </HoverCardContent>
            </HoverCard>
          </MediaSectionCarouselItem>
        ))}
      </MediaSectionCarousel>
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
          className="absolute bottom-2 left-0 z-0 h-1/2 w-1/2 lg:bottom-0 lg:h-full"
        />
        <Image
          width={145}
          height={217}
          sizes="(min-width: 1280px) 8vw,(min-width: 1024px) 9vw,(min-width: 768px) 14vw, (min-width: 640px) 18vw, 28vw"
          className="rounded-r-radius absolute right-0 h-full w-3/5 lg:w-1/2"
          src={mediaData.poster_url}
          alt={`${mediaData.title} poster`}
          priority
        />
      </div>
    );
  }

  return <MediaBackdrop mediaData={mediaData} className={"rounded-radius"} />;
};

export default MediaListSection;
