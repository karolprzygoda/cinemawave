import { useEffect, useState } from "react";

const useScrolled = (scrollY = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > scrollY;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, scrolled]);

  return scrolled;
};

export default useScrolled;
