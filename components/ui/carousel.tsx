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
      <div className={"group relative"}>
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

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
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

  const handleClick = () => {
    if (!emblaApi) return;
    if (type === "prev") emblaApi.scrollPrev();
    if (type === "next") {
      emblaApi.scrollNext();
      setIsPrevButtonDisabled(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group/button absolute top-0 z-20 hidden h-full w-[4%] cursor-pointer items-center justify-center bg-[hsla(0,0%,8%,0.5)] text-[3vw] transition hover:bg-[hsla(0,0%,8%,0.7)] lg:flex",
        type === "prev" ? "left-0" : "right-0",
        isPrevButtonDisabled && type === "prev" && "hidden!",
      )}
    >
      <CgChevronRight
        className={cn(
          "origin-center transform opacity-0 transition-transform group-hover:opacity-100 group-hover/button:scale-125",
          type === "prev" && "rotate-180",
        )}
      />
    </button>
  );
};

export { Carousel, CarouselContainer, CarouselIndex, CarouselButton };
