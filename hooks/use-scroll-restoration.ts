import { useLayoutEffect } from "react";

const useScrollRestoration = () => {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);
};

export default useScrollRestoration;
