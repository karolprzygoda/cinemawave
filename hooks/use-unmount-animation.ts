import { useEffect, useState } from "react";

const useUnmountAnimation = (mounted: boolean, animationDuration: number) => {
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isMounted, setIsMounted] = useState(mounted);

  useEffect(() => {
    if (mounted) {
      setIsMounted(true);
      setIsUnmounting(false);
    }

    if (!mounted) {
      setIsUnmounting(true);
      const timeout = setTimeout(() => {
        setIsMounted(false);
        setIsUnmounting(false);
      }, animationDuration);

      return () => clearTimeout(timeout);
    }
  }, [animationDuration, mounted]);

  return { isUnmounting, isMounted };
};

export default useUnmountAnimation;
