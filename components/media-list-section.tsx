import {
  Carousel,
  CarouselContainer,
  CarouselIndex,
  CarouselNextButton,
  CarouselPrevButton,
} from "@/components/ui/carousel";
import { TMDBMediaItemMap, TMDBMediaListResult } from "@/lib/tmdb-types";
import { HoverCard, HoverCardTrigger } from "@/components/hover-card";
import Image from "next/image";
import React from "react";

type TopTenSectionProps<T extends keyof TMDBMediaItemMap> = {
  sectionTitle: string;
  media: TMDBMediaListResult<T>[];
};

const MediaListSection = <T extends keyof TMDBMediaItemMap>({
  sectionTitle,
  media,
}: TopTenSectionProps<T>) => {
  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h3 className={"mx-[4%] mb-3 font-semibold sm:text-xl lg:text-2xl xl:text-3xl"}>
        {sectionTitle}
      </h3>
      <Carousel
        options={{
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
        }}
      >
        <CarouselContainer className={"mx-[4%]"}>
          {media.map((item) => (
            <SectionItem key={item.id} mediaData={item} />
          ))}
        </CarouselContainer>
        <CarouselIndex />
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
    </section>
  );
};
type SectionItemProps<T extends keyof TMDBMediaItemMap> = {
  mediaData: TMDBMediaListResult<T>;
};

const SectionItem = <T extends keyof TMDBMediaItemMap>({ mediaData }: SectionItemProps<T>) => {
  const displayTitle = "title" in mediaData ? mediaData.title : mediaData.name;

  return (
    <HoverCard mediaData={mediaData}>
      <HoverCardTrigger className="aspect-video">
        <Image
          fill
          className="rounded-radius"
          src={`https://image.tmdb.org/t/p/w500${mediaData.backdrop_path}`}
          alt={`${displayTitle} poster`}
        />
        <div className="absolute bottom-[8%] left-[8%] w-1/3">
          {mediaData.logo ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${mediaData.logo.file_path}`}
              alt="movie logo"
              className="object-contain"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <span className={"font-semibold"}>{displayTitle}</span>
          )}
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default MediaListSection;
