import { useEffect, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

export default function ReactPortal({ children }: { children: ReactNode }) {
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const portalRoot = document.createElement("div");
    document.body.appendChild(portalRoot);
    setPortalRoot(portalRoot);

    return () => {
      if (portalRoot) {
        document.body.removeChild(portalRoot);
      }
    };
  }, []);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
}
