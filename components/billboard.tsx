import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";

type BillboardProps = {
  data: {
    id: string;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
  };
};

const Billboard = ({ data }: BillboardProps) => {
  return (
    <div className="relative -mt-20 hidden w-full lg:block">
      <div className={"mb-[20px] pb-[40%]"}>
        <div className={"absolute -z-10 h-[56.25vw]"}>
          <video
            className={"h-full w-full object-cover"}
            src={data.video_url}
            autoPlay
            muted
            loop
            poster={data.thumbnail_url}
          ></video>
          <div
            className={
              "absolute bottom-[29%] left-[4%] z-50 flex max-w-1/2 flex-col gap-6 xl:max-w-2xl"
            }
          >
            <h2 className={"text-accent text-3xl font-bold drop-shadow-xl xl:text-6xl"}>
              {data.title}
            </h2>
            <div className={"text-accent font-semibold drop-shadow-xl xl:text-xl"}>
              {data.description}
            </div>
            <div className={"flex items-center gap-4"}>
              <Button
                variant={"accent"}
                className={
                  "h-11 px-8 text-xl xl:h-auto xl:py-3 xl:text-2xl xl:font-bold xl:[&_svg]:size-7"
                }
              >
                <FaPlay />
                Play
              </Button>
              <Button
                variant={"secondary"}
                className={
                  "h-11 px-8 text-xl xl:h-auto xl:py-3 xl:text-2xl xl:font-bold xl:[&_svg]:size-7"
                }
              >
                <LuInfo />
                More Info
              </Button>
            </div>
          </div>
          <BillboardMask />
        </div>
      </div>
    </div>
  );
};

const BillboardMask = () => {
  return (
    <>
      <div className="absolute top-auto bottom-[-1px] z-10 h-[14.7vw] w-full bg-[linear-gradient(180deg,hsla(0,0%,8%,0)_0%,hsla(0,0%,8%,0.15)_15%,hsla(0,0%,8%,0.35)_29%,hsla(0,0%,8%,0.58)_44%,#141414_68%,#141414_100%)] bg-[length:100%_100%] bg-[position:0_top] bg-repeat-x opacity-100"></div>
      <div className="absolute right-[26.09%] bottom-0 left-0 z-0 h-full bg-[linear-gradient(77deg,_rgba(0,_0,_0,_0.6),_transparent_85%)]"></div>
    </>
  );
};

export default Billboard;
