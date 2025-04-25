import { useState, useEffect } from "react";

//using useScroll causes rerender everytime user scrolls that is why this hook was created.

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const above = window.scrollY > threshold;
      setScrolled((prev) => (prev !== above ? above : prev));
    };
    onScroll(); // Initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
