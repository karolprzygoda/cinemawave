import { Numbers } from "@/components/numbers";
import { MovieListItem } from "@/lib/types";
import Image from "next/image";

type TopTenSectionProps = {
  movies: MovieListItem[];
};

const TopTenSection = ({ movies }: TopTenSectionProps) => {
  return (
    <section className={"my-[3vw] flex flex-col"}>
      <h3 className={"mx-[4%] mb-[0.5em] font-semibold sm:text-xl lg:text-2xl xl:text-3xl"}>
        Top 10 seriali w Polsce dzisiaj
      </h3>
      <div
        className={
          "scrollbar-off flex overflow-x-auto px-[4%] pb-[14%] md:pb-[5%] lg:gap-3 lg:pb-0"
        }
      >
        {movies.map((item, index) => {
          const NumberSVG = Numbers[index];
          return (
            <div
              key={index}
              className="relative flex aspect-[10/7] w-1/2 shrink-0 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
            >
              <NumberSVG
                className={
                  "absolute -bottom-5 left-0 h-2/3 w-1/2 lg:right-auto lg:bottom-0 lg:h-full lg:w-1/2"
                }
              />
              <Image
                width={500}
                height={750}
                className={"rounded-radius absolute right-0 aspect-[7/10] w-3/5 lg:h-full lg:w-1/2"}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={`Image ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopTenSection;
