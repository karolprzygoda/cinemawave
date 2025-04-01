import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo"
      height={48}
      width={200}
      className={"ms-3 py-5"}
    />
  );
};

export default Logo;
