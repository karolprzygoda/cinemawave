import useTimeout from "@/hooks/use-timeout";

const useDebouncedToggle = (openDelay = 500, closeDelay = 200) => {
  const openTimeout = useTimeout();
  const closeTimeout = useTimeout();

  const clear = () => {
    openTimeout.clear();
    closeTimeout.clear();
  };

  const open = (callback: () => void) => {
    clear();
    openTimeout.set(callback, openDelay);
  };

  const close = (callback: () => void) => {
    clear();
    closeTimeout.set(callback, closeDelay);
  };

  return { open, close, clear };
};

export default useDebouncedToggle;
