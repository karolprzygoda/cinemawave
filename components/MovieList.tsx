import { isEmpty } from "lodash";
import MovieCard from "@/components/MovieCard";

export default function MovieList({
  data,
  title,
}: {
  data: Record<string, any>;
  title: string;
}) {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className={"px-6 md:px-12 mt-6 md:mt-10 space-y-8 overflow-y-visible"}>
      <div>
        <p className={"text-white text-xl md:text-2xl font-semibold mb-4"}>
          {title}
        </p>
        <div
          className={"grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8"}
        >
          {data.map((movie: any) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
