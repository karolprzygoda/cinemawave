import { useEffect } from "react";

const useHideAppOverflow = (hide: boolean) => {
  useEffect(() => {
    if (hide) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hide]);
};

export default useHideAppOverflow;
