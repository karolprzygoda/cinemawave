import {
  Carousel,
  CarouselContainer,
  CarouselIndex,
  CarouselNextButton,
  CarouselPrevButton,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardTrigger } from "@/components/hover-card";
import React from "react";
import { MediaListItem } from "@/lib/types";
import MediaBackdrop from "@/components/media-backdrop";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import NumberSVG from "@/components/number-svg";
import { cn } from "@/lib/utils";

const CAROUSEL_OPTIONS = {
  slidesToScroll: "auto",
  loop: false,
  align: "start",
  dragFree: true,
  breakpoints: {
    "(min-width: 1024px)": {
      slidesToScroll: 5,
      dragFree: false,
      loop: true,
      watchDrag: false,
    },
    "(min-width: 1440px)": {
      slidesToScroll: "auto",
      align: "end",
    },
  },
} as EmblaOptionsType;

type TopTenSectionProps = {
  sectionTitle: string;
  mediaList: MediaListItem[];
  variant?: "list" | "top-ten";
};

const MediaListSection = ({ sectionTitle, mediaList, variant = "list" }: TopTenSectionProps) => {
  const isTopTen = variant === "top-ten";

  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h3 className={"mx-[4%] mb-3 font-semibold sm:text-xl lg:text-2xl xl:text-3xl"}>
        {sectionTitle}
      </h3>
      <Carousel options={CAROUSEL_OPTIONS}>
        <CarouselContainer className={cn("mx-[4%]", isTopTen && "pb-[10%] md:pb-[5%] lg:pb-0")}>
          {mediaList.slice(0, isTopTen ? 10 : mediaList.length).map((mediaItem, index) => (
            <HoverCard key={mediaItem.id} opacityAnimation={isTopTen} mediaData={mediaItem}>
              <HoverCardTrigger className={isTopTen ? "aspect-[10/7]" : "aspect-video"}>
                <SectionItem mediaData={mediaItem} isTopTen={isTopTen} index={index} />
              </HoverCardTrigger>
            </HoverCard>
          ))}
        </CarouselContainer>
        <CarouselIndex />
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
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
      <>
        <NumberSVG
          index={index}
          className="absolute -bottom-5 left-0 z-0 h-2/3 w-1/2 lg:right-auto lg:bottom-0 lg:h-full"
        />
        <Image
          width={256}
          height={384}
          className="rounded-r-radius absolute right-0 z-0 w-3/5 lg:h-full lg:w-1/2"
          src={mediaData.poster_url}
          alt={`${mediaData.title} poster`}
        />
      </>
    );
  }

  return <MediaBackdrop mediaData={mediaData} className={"rounded-radius"} />;
};

export default MediaListSection;
