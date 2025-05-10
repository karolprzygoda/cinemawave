"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import {
  ComponentProps,
  createContext,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarouselContext = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarouselContext must be used within a <Carousel />");
  }

  return context;
};

const Carousel = ({
  orientation = "horizontal",
  options,
  setApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps & HTMLAttributes<HTMLDivElement>) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        options,
        orientation: orientation || (options?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

type CarouselContentProps = HTMLAttributes<HTMLDivElement>;

const CarouselContent = ({ className, ...props }: CarouselContentProps) => {
  const { carouselRef, orientation } = useCarouselContext();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={cn("flex", orientation === "vertical" && "flex-col", className)} {...props} />
    </div>
  );
};

type CarouselItemProps = HTMLAttributes<HTMLDivElement>;

const CarouselItem = ({ className, ...props }: CarouselItemProps) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
};

type CarouselPreviousProps = HTMLAttributes<HTMLButtonElement> & ComponentProps<typeof Button>;

const CarouselPrevious = ({ className, variant = "outline", ...props }: CarouselPreviousProps) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarouselContext();

  return (
    <Button
      variant={variant}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label={"Previous slide"}
      {...props}
    >
      <CgChevronLeft className="h-4 w-4" />
    </Button>
  );
};

type CarouselNextProps = HTMLAttributes<HTMLButtonElement> & ComponentProps<typeof Button>;

const CarouselNext = ({ className, variant = "outline", ...props }: CarouselNextProps) => {
  const { orientation, scrollNext, canScrollNext } = useCarouselContext();

  return (
    <Button
      variant={variant}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      aria-label={"Next slide"}
      onClick={scrollNext}
      {...props}
    >
      <CgChevronRight className="h-4 w-4" />
    </Button>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
