import { useEffect, useState } from "react";

type ScrollPositionType = {
  x: number;
  y: number;
};

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPositionType>({ x: 0, y: 0 });

  const handleScroll = () => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScroll;
