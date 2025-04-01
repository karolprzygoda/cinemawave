import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";

type PlayButtonProps = {
  movieId: string;
}

const PlayButton = ({movieId}:PlayButtonProps) => {

  return (
    <Link
      href={`/watch/${movieId}`}
      className={
        "bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-neutral-300 transition"
      }
    >
      <BsFillPlayFill size={25} className={"mr-1"} />
      Play
    </Link>
  );

};

export default PlayButton;
