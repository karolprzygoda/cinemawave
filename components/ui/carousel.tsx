"use client";

import {
  ButtonHTMLAttributes,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { IconType } from "react-icons";

type CarouselProviderProps = {
  isPrevButtonDisabled: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  handleScrollPrev: () => void;
  handleScrollNext: () => void;
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

  const handleScrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    setIsPrevButtonDisabled(false);
  };

  const handleScrollPrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  };

  return (
    <CarouselContext.Provider
      value={{
        isPrevButtonDisabled,
        selectedIndex,
        scrollSnaps,
        handleScrollNext,
        handleScrollPrev,
      }}
    >
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
  return (
    <div className={cn("flex touch-pan-y touch-pinch-zoom [&>*]:shrink-0", className)}>
      {children}
    </div>
  );
};

const CarouselIndex = () => {
  const { selectedIndex, scrollSnaps } = useCarouselContext();

  return (
    <ul className={"absolute top-0 right-[4%] -mt-6 mb-3 hidden lg:flex"}>
      {scrollSnaps.map((_, index) => (
        <li
          key={`scroll-snap-${index}`}
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
  Icon: IconType;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselButton = ({ Icon, className, ...props }: CarouselButtonProps) => {
  return (
    <button
      type={"button"}
      className={cn(
        "group/carousel-button absolute top-0 z-20 hidden h-full w-[4%] cursor-pointer items-center justify-center bg-[hsla(0,0%,8%,0.5)] text-[3vw] transition hover:bg-[hsla(0,0%,8%,0.7)] disabled:hidden lg:flex 2xl:w-[60px] 2xl:text-5xl",
        className,
      )}
      {...props}
    >
      <Icon
        className={cn(
          "origin-center transform opacity-0 transition-transform group-hover/carousel:opacity-100 group-hover/carousel-button:scale-125 group-focus/carousel-button:opacity-100",
        )}
      />
    </button>
  );
};

const CarouselPrevButton = () => {
  const { isPrevButtonDisabled, handleScrollPrev } = useCarouselContext();

  return (
    <CarouselButton
      Icon={CgChevronLeft}
      className={"left-0"}
      disabled={isPrevButtonDisabled}
      onClick={handleScrollPrev}
      aria-label={"Previous slide"}
    />
  );
};

const CarouselNextButton = () => {
  const { handleScrollNext } = useCarouselContext();

  return (
    <CarouselButton
      Icon={CgChevronRight}
      className={"right-0"}
      onClick={handleScrollNext}
      aria-label={"Next slide"}
    />
  );
};

export { Carousel, CarouselContainer, CarouselIndex, CarouselNextButton, CarouselPrevButton };
