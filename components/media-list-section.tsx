import {
  Carousel,
  CarouselContainer,
  CarouselIndex,
  CarouselNextButton,
  CarouselPrevButton,
} from "@/components/ui/carousel";
import { HoverCard } from "@/components/hover-card";
import React from "react";
import { MediaListItem } from "@/lib/types";
import MediaBackdrop from "@/components/media-backdrop";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import NumberSVG from "@/components/number-svg";

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
      <h3 className={"mx-[4%] mb-3 font-semibold sm:text-xl lg:text-2xl xl:text-3xl 2xl:mx-[60px]"}>
        {sectionTitle}
      </h3>
      <Carousel options={CAROUSEL_OPTIONS}>
        <CarouselContainer className={"mx-[4%] 2xl:mx-[60px]"}>
          {mediaList.slice(0, isTopTen ? 10 : mediaList.length).map((mediaItem, index) => (
            <div
              key={mediaItem.id}
              className={"w-1/2 px-[0.2vw] sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"}
            >
              <HoverCard opacityAnimation={isTopTen} mediaData={mediaItem}>
                <SectionItem mediaData={mediaItem} isTopTen={isTopTen} index={index} />
              </HoverCard>
            </div>
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

  return <MediaBackdrop mediaData={mediaData} className={"rounded-radius"} />;
};

export default MediaListSection;
