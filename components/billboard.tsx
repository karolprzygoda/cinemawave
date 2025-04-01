import { MovieData } from "@/lib/types";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "@/components/play-button";

type BillboardProps = {
  movieData:MovieData
}

const Billboard = ({movieData}:BillboardProps) => {
  return (
    <div className={"hidden min-[870px]:block relative mt-[-88px] h-[56.25vw"}>
      <video
        className={"w-full h-[56.25vw] object-cover brightness-[60%]"}
        src={movieData.videoUrl}
        autoPlay
        muted
        loop
        poster={movieData.thumbnailUrl}
      ></video>
      <div className={"absolute top-[30%] md:top-[40%] ml-4 md:ml-16"}>
        <p
          className={
            "text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl"
          }
        >
          {movieData.title}
        </p>
        <p
          className={
            "text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl"
          }
        >
          {movieData.description}
        </p>
        <div className={"flex items-center mt-3 md:mt-4 gap-3"}>
          <PlayButton movieId={movieData.id} />
          <button
            // onClick={handleOpenModal}
            className={
              "bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-opacity-20 transition"
            }
          >
            <AiOutlineInfoCircle className={"mr-1"} />
            Więcej informacji
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
