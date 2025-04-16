import { useEffect, useRef } from "react";

const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const set = (callback: () => void, delay: number) => {
    clear();
    timeoutRef.current = setTimeout(callback, delay);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => clear, []);

  return { set, clear };
};

export default useTimeout;
