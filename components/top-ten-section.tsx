import { Numbers } from "@/components/numbers";
import { TMDBMovie } from "@/lib/types";
import Image from "next/image";
import {
  Carousel,
  CarouselContainer,
  CarouselIndex,
  CarouselNextButton,
  CarouselPrevButton,
} from "@/components/ui/carousel";
import { HoverCard, HoverCardTrigger } from "@/components/hover-card";

type TopTenSectionProps = {
  movies: TMDBMovie[];
};

const TopTenSection = ({ movies }: TopTenSectionProps) => {
  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h3 className={"mx-[4%] mb-3 font-semibold sm:text-xl lg:text-2xl xl:text-3xl"}>
        Top 10 seriali w Polsce dzisiaj
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
        <CarouselContainer className={"mx-[4%] pb-[14%] md:pb-[5%] lg:pb-0"}>
          {movies.map((item, index) => (
            <TopTenSectionItem key={item.id} index={index} movieData={item} />
          ))}
        </CarouselContainer>
        <CarouselIndex />
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
    </section>
  );
};

type TopTenSectionItem = {
  index: number;
  movieData: TMDBMovie;
};

const TopTenSectionItem = ({ index, movieData }: TopTenSectionItem) => {
  const NumberSVG = Numbers[index];
  return (
    <HoverCard movieData={movieData}>
      <HoverCardTrigger className="group/hover-card-trigger relative flex aspect-[10/7] h-full w-1/2 shrink-0 px-[0.2vw] focus:outline-none sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="before:rounded-radius relative h-full w-full before:pointer-events-none before:absolute before:inset-0 before:z-20 before:border-[2px] before:border-neutral-300 before:opacity-0 before:content-[''] group-focus/hover-card-trigger:before:opacity-100">
          <NumberSVG className="absolute -bottom-5 left-0 z-0 h-2/3 w-1/2 lg:right-auto lg:bottom-0 lg:h-full lg:w-1/2" />
          <Image
            width={500}
            height={750}
            className="rounded-r-radius absolute right-0 z-0 w-3/5 lg:h-full lg:w-1/2"
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={`${movieData.title} poster`}
          />
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default TopTenSection;
