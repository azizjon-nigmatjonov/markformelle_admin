import { useState, useEffect, useMemo } from "react";

export const useScreenSize = (status: string) => {
  const desktop = 1700;
  const smallDesktop = 1500;
  const macbook = 1400;
  const mobile = 768;
  const small = 540;

  const defaultWidth = useMemo(() => {
    switch (status) {
      case "desktop":
        return desktop
      case "smallDesktop":
        return smallDesktop;
      case "macbook":
        return macbook;
      case "mobile":
        return mobile;
      default:
        return small;
    }
  }, [mobile, status]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window) {
      setIsMobile(window.innerWidth < defaultWidth);
      window.addEventListener("resize", () => {
        setIsMobile(window.innerWidth < defaultWidth);
      });
    }
  }, [defaultWidth]);
  return isMobile;
};
