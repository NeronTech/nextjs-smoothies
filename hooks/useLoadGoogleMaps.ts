import { useEffect, useState } from "react";

export default function useLoadGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkGoogle = () => typeof google !== "undefined";
    if (checkGoogle()) {
      setLoaded(true);
    } else {
      const interval = setInterval(() => {
        if (checkGoogle()) {
          setLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return loaded;
}
