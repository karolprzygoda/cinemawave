import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";

export default function Watch() {
  const [show, setShow] = useState(false);
  const [lastMouseMovement, setLastMouseMovement] = useState(Date.now());
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie({ id: movieId as string });

  const hideAfterInactivity = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastMouseMovement >= 3000) {
      setShow(false);
    }
  }, [lastMouseMovement]);

  useEffect(() => {
    const timer = setInterval(hideAfterInactivity, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [hideAfterInactivity]);

  const handleMouseMove = () => {
    setLastMouseMovement(Date.now());
    if (!show) {
      setShow(true);
    }
  };

  return (
    <div className={"h-screen w-screen bg-black"} onMouseMove={handleMouseMove}>
      <nav
        className={`text-md fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70 transition duration-500 ${show ? "" : "-translate-y-full"}`}
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className={"text-white cursor-pointer text-[20px] md:text-[30px]"}
        />
        <p className={"text-white  md:text-3xl font-bold"}>
          <span className={"font-light me-2"}>Oglądasz:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className={"h-full w-full"}
        src={data?.videoUrl}
      ></video>
    </div>
  );
}
