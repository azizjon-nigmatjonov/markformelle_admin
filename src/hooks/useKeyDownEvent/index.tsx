import { useEffect, useState } from "react";
export const useKeyDownEvent = () => {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const keys: any = {
    F8: "Enter",
    x: "Close",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys && e.altKey) {
        e.preventDefault();
        setCurrentKey(keys[e.key]);
      }

      if (e.key === "Alt") {
        e.preventDefault();
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        e.preventDefault();
        setIsAltPressed(false);
        setCurrentKey("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isAltPressed, currentKey };
};
