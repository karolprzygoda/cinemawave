import Image, { ImageProps } from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt">;

const Logo = ({ ...props }: LogoProps) => {
  return <Image src="/images/logo.png" alt="Logo" {...props} />;
};

export default Logo;
