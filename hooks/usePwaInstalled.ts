// hooks/usePwaInstalled.ts
import { useEffect, useState } from "react";

export const usePwaInstalled = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalled = () => {
      // iOS
      if ((window.navigator as any).standalone) {
        if ("standalone" in navigator && navigator.standalone) {
          setIsInstalled(true);
        }
      }
      // Chrome / Android / Desktop
      if (window.matchMedia("(display-mode: standalone)").matches)
        setIsInstalled(true);
    };

    checkInstalled();

    const handleAppInstalled = () => setIsInstalled(true);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  return isInstalled;
};
