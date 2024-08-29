import { useState, useEffect, useMemo } from "react";

export const useScreenSize = (status: string) => {
  const smallDesktop = 1500;
  const mobile = 768;
  const small = 540;

  const defaultWidth = useMemo(() => {
    switch (status) {
      case "smallDesktop":
        return smallDesktop;
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
