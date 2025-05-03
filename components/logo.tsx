import Image, { ImageProps } from "next/image";
import logoImg from "@/public/images/logo.png";

type LogoProps = Omit<ImageProps, "src" | "alt">;

const Logo = ({ ...props }: LogoProps) => {
  return <Image src={logoImg} alt="Logo" priority {...props} />;
};

export default Logo;
