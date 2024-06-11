import { useCallback, useEffect, useState } from "react";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import ReactPortal from "@/components/ReactPortal";
import useMountTransition from "@/hooks/useMountTransition";

export default function InfoModal({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose: any;
}) {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie({ id: movieId as string });

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const hasTransitionedIn = useMountTransition({
    isMounted: !!visible,
    unmountDelay: 300,
  });

  return (
    <ReactPortal>
      {(hasTransitionedIn || !!visible) && (
        <>
          <div
            className={`left-0 top-0 z-40 absolute w-full h-full transition duration-300 bg-black  ${hasTransitionedIn && !!visible ? "bg-opacity-80" : "bg-opacity-0"}  flex justify-center items-center  absolute inset-0`}
            onClick={handleClose}
          ></div>
          <div
            className={`${isVisible && hasTransitionedIn ? "scale-100" : "scale-0"} w-full  h-full lg:h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 absolute lg:w-auto  lg:max-w-3xl lg:rounded-md overflow-x-auto   duration-300  bg-zinc-900 drop-shadow-md`}
          >
            <div className={"min-w-[280px]"}>
              <div className={"relative h-96"}>
                <video
                  className={"w-full brightness-[60%] object-cover h-full"}
                  autoPlay
                  muted
                  loop
                  poster={data?.thumbnailUrl}
                  src={data?.videoUrl}
                ></video>
                <div
                  className={
                    "cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                  }
                  onClick={handleClose}
                >
                  <AiOutlineClose className={"text-white"} size={20} />
                </div>
                <div className={"absolute bottom-[10%] left-4 lg:left-10"}>
                  <p
                    className={
                      "text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8"
                    }
                  >
                    {data?.title}
                  </p>
                  <div className={"flex gap-4 items-center"}>
                    <PlayButton movieId={data?.id} />
                    <FavoriteButton movieId={data?.id} />
                  </div>
                </div>
              </div>

              <div className={"px-4 lg:px-12 py-8"}>
                <p className={"text-green-400 font-semibold text-lg mb-6"}>
                  Nowość
                </p>
                <p className={"text-white text-lg mb-4"}>{data?.description}</p>
                <p className={"text-white text-lg mb-2"}>{data?.duration}</p>
                <p className={"text-white text-lg"}>{data?.genre}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </ReactPortal>
  );
}
