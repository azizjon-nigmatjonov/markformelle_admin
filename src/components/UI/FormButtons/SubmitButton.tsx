import { useEffect } from "react";
import { useKeyDownEvent } from "../../../hooks/useKeyDownEvent";
import { useTranslationHook } from "../../../hooks/useTranslation";

export const SubmitButton = ({
  handleActions,
  type = "create",
  uniqueID,
}: {
  type: string;
  uniqueID: string;
  handleActions: (val: string, val2: string) => void;
}) => {
  const { t } = useTranslationHook();
  const { isAltPressed, currentKey, pressedKey } = useKeyDownEvent();

  useEffect(() => {
    if (currentKey && isAltPressed) handleActions(currentKey, uniqueID);
  }, [currentKey, isAltPressed]);

  useEffect(() => {
    if (type === "F4" && pressedKey === "F4") {
      handleActions(pressedKey, uniqueID);
    }
  }, [pressedKey, type]);

  if (type === "F4") {
    return (
      <button
        onClick={() => {
          handleActions(pressedKey, uniqueID);
        }}
        className="h-[30px] px-8 bg-[var(--primary)] text-white rounded-[8px] relative"
        type="button"
      >
        create asama
        {isAltPressed && <span className="absolute right-2">F4</span>}
      </button>
    );
  }

  return (
    <button className="custom-btn relative" type="submit">
      <span>{t(type)}</span>
      {isAltPressed && (
        <div className="ml-2 absolute right-2 flex items-center justify-center bg-white">
          <img width={20} src="/images/key_f8.png" alt="key_f8" />
        </div>
      )}
    </button>
  );
};
