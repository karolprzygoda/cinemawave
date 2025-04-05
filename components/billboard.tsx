import Image from "next/image";

const Billboard = () => {
  return (
    <div className="relative -top-20 h-[56.25vw] w-full">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={"/images/tmp.jpg"} alt={"xd"} fill className="object-cover" priority />
      </div>

      {/* Gradient overlay */}
      <div className="absolute top-auto bottom-[-1px] z-20 h-[14.7vw] w-full bg-[linear-gradient(180deg,hsla(0,0%,8%,0)_0%,hsla(0,0%,8%,0.15)_15%,hsla(0,0%,8%,0.35)_29%,hsla(0,0%,8%,0.58)_44%,#141414_68%,#141414_100%)] bg-[length:100%_100%] bg-[position:0_top] bg-repeat-x opacity-100"></div>
      <div className="absolute bottom-0 left-0 z-0 h-full w-1/2 bg-[linear-gradient(77deg,_rgba(0,_0,_0,_0.6),_transparent_85%)]" />
    </div>
  );
};

export default Billboard;
