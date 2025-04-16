"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";
import { CgChevronRight } from "react-icons/cg";

type CarouselProviderProps = {
  emblaApi: EmblaCarouselType | undefined;
  isPrevButtonDisabled: boolean;
  setIsPrevButtonDisabled: Dispatch<SetStateAction<boolean>>;
};

const CarouselContext = createContext<CarouselProviderProps | null>(null);

const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarouselContext must be used within a CarouselProvider");
  }
  return context;
};

type CarouselProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
};

const Carousel = ({ children, options }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);

  return (
    <CarouselContext.Provider value={{ emblaApi, isPrevButtonDisabled, setIsPrevButtonDisabled }}>
      <div className={"group/carousel relative"}>
        <div className={"overflow-hidden"} ref={emblaRef}>
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

type CarouselContainerProps = {
  children: ReactNode;
  className?: string;
};

const CarouselContainer = ({ children, className }: CarouselContainerProps) => {
  return <div className={cn("flex touch-pan-y touch-pinch-zoom", className)}>{children}</div>;
};

const CarouselIndex = () => {
  const { emblaApi } = useCarouselContext();

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <ul className={"absolute top-0 right-[4%] -mt-6 mb-3 hidden lg:flex"}>
      {scrollSnaps.map((_, index) => (
        <li
          key={index}
          className={cn(
            "ms-[1px] h-0.5 w-3",
            index === selectedIndex ? "bg-[#aaa]" : "bg-[#4d4d4d]",
          )}
        ></li>
      ))}
    </ul>
  );
};

type CarouselButtonProps = {
  type: "prev" | "next";
};

const CarouselButton = ({ type }: CarouselButtonProps) => {
  const { emblaApi, isPrevButtonDisabled, setIsPrevButtonDisabled } = useCarouselContext();

  const isPrev = type === "prev";

  const handleClick = () => {
    if (!emblaApi) return;
    if (isPrev) {
      emblaApi.scrollPrev();
    } else {
      emblaApi.scrollNext();
      setIsPrevButtonDisabled(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      disabled={isPrevButtonDisabled && isPrev}
      className={cn(
        "group/carousel-button absolute top-0 z-20 hidden h-full w-[4%] cursor-pointer items-center justify-center bg-[hsla(0,0%,8%,0.5)] text-[3vw] transition hover:bg-[hsla(0,0%,8%,0.7)] disabled:hidden lg:flex",
        isPrev ? "left-0" : "right-0",
      )}
    >
      <CgChevronRight
        className={cn(
          "origin-center transform opacity-0 transition-transform group-hover/carousel:opacity-100 group-hover/carousel-button:scale-125 group-focus/carousel-button:opacity-100",
          isPrev && "rotate-180",
        )}
      />
    </button>
  );
};

export { Carousel, CarouselContainer, CarouselIndex, CarouselButton };
