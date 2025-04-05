import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  className?: string;
  src: string;
};

const Avatar = ({ className, src }: AvatarProps) => {
  return (
    <span className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-md", className)}>
      <Image fill src={src} alt="profile-avatar" className={"object-cover"} />
    </span>
  );
};

export default Avatar;
