"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";

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

const CAROUSEL_NAV_BUTTON_STYLES =
  "group/carousel-button text-white p-0 top-0 z-20 hidden transition-none h-full w-[4%] translate-0 rounded-none! border-0 bg-[hsla(0,0%,8%,0.5)] [&_svg]:size-[3vw]  hover:bg-[hsla(0,0%,8%,0.7)] disabled:hidden lg:flex 2xl:w-[60px] 2xl:[&_svg]:size-10 [&_svg]:origin-center [&_svg]:transform [&_svg]:opacity-0 [&_svg]:transition-transform [&_svg]:group-hover/carousel:opacity-100 [&_svg]:group-hover/carousel-button:scale-125 [&_svg]:group-focus/carousel-button:opacity-100";

type MediaSectionCarouselProps = {
  children: ReactNode;
};

const MediaSectionCarousel = ({ children }: MediaSectionCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSnap, setCurrentSnap] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    setScrollSnaps(api.scrollSnapList());
    setCurrentSnap(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSnap(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
    setPrevButtonDisabled(false);
  }, [api]);

  return (
    <Carousel setApi={setApi} className={"group/carousel"} options={CAROUSEL_OPTIONS}>
      <CarouselContent className={"mx-[4%] 2xl:mx-[60px]"}>{children}</CarouselContent>
      <CarouselPagination scrollSnaps={scrollSnaps} current={currentSnap} />
      <CarouselNext onClick={scrollNext} className={cn("right-0", CAROUSEL_NAV_BUTTON_STYLES)} />
      <CarouselPrevious
        disabled={prevButtonDisabled}
        className={cn("left-0", CAROUSEL_NAV_BUTTON_STYLES)}
      />
    </Carousel>
  );
};

type MediaSectionCarouselItemProps = {
  children: ReactNode;
};

const MediaSectionCarouselItem = ({ children }: MediaSectionCarouselItemProps) => {
  return (
    <CarouselItem
      className={"basis-1/2 px-[0.2vw] sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"}
    >
      {children}
    </CarouselItem>
  );
};

type CarouselPaginationProps = {
  scrollSnaps: number[];
  current: number;
};

const CarouselPagination = ({ scrollSnaps, current }: CarouselPaginationProps) => {
  return (
    <ul className={"absolute top-0 right-[4%] -mt-4 hidden lg:flex"}>
      {scrollSnaps.map((_, index) => (
        <li
          key={`scroll-snap-${index}`}
          className={cn("ms-[1px] h-0.5 w-3", index === current ? "bg-[#aaa]" : "bg-[#4d4d4d]")}
        ></li>
      ))}
    </ul>
  );
};

export { MediaSectionCarousel, MediaSectionCarouselItem };
