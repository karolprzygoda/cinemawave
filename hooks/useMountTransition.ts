import { useEffect, useState } from "react";

export default function useMountTransition({
  isMounted,
  unmountDelay,
}: {
  isMounted: boolean;
  unmountDelay: number;
}) {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
}
