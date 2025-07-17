import { useEffect, useState } from "react";
export const useKeyDownEvent = () => {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [currentKey, setCurrentKey] = useState("");
  const [pressedKey, setPressedKey] = useState("");
  const keys: any = {
    F8: "Enter",
    x: "Close",
    F2: "Open",
    Escape: "Escape",
    Enter: "Enter",
    Insert: "Insert",
    Delete: "Delete",
    F4: "F4",
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys) {
        setPressedKey(keys[e.key]);
      }
      if (e.key in keys && e.ctrlKey) {
        e.preventDefault();
        setCurrentKey(keys[e.key]);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        setCurrentKey("Enter");
      }

      if (e.key === "Control") {
        e.preventDefault();
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        e.preventDefault();
        setIsAltPressed(false);
        setCurrentKey("");
      }
      setCurrentKey("");
      setPressedKey("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { isAltPressed, currentKey, pressedKey };
};
