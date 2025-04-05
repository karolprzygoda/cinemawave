import { useEffect, useRef, useState } from "react";

type UseKeyPressOptions = {
  preventDefault?: boolean;
  onKeyUp?: boolean;
};

const useKeyPress = (
  targetKey: string,
  callback?: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {},
): boolean => {
  const { preventDefault = false, onKeyUp = false } = options;
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  const callbackRef = useRef<((event: KeyboardEvent) => void) | undefined>(
    callback,
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        if (preventDefault) event.preventDefault();
        setIsKeyPressed(true);
        if (!onKeyUp && callbackRef.current) {
          callbackRef.current(event);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        setIsKeyPressed(false);

        if (onKeyUp && callbackRef.current) {
          callbackRef.current(event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey, preventDefault, onKeyUp]);

  return isKeyPressed;
};

export default useKeyPress;
