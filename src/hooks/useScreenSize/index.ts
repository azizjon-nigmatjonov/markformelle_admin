import { useState, useEffect, useMemo } from "react";

export const useScreenSize = (status: string) => {
  const desktop = 1600;
  const smallDesktop = 1700;
  const macbook = 1400;
  const small_destop = 1280;
  const ipod = 940;
  const mobile = 768;
  const small = 540;

  const defaultWidth = useMemo(() => {
    switch (status) {
      case "desktop":
        return desktop;
      case "ipod":
        return ipod;
      case "smallDesktop":
        return smallDesktop;
      case "small_destop":
        return small_destop;
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
