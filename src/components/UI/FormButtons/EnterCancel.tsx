import { useEffect } from "react";
import { useKeyDownEvent } from "../../../hooks/useKeyDownEvent";
import { useTranslationHook } from "../../../hooks/useTranslation";

export const EnterCancelButtons = ({
  handleActions,
  uniqueID = "",
}: {
  uniqueID: string;
  handleActions: (val: string, val2: string) => void;
}) => {
  const { t } = useTranslationHook();
  const { currentKey } = useKeyDownEvent();

  useEffect(() => {
    if (currentKey === "Enter") {
      handleActions("Enter", uniqueID);
    }
  }, [currentKey, handleActions, uniqueID]);

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleActions("Close", uniqueID)}
        className="cancel-btn"
        type="button"
      >
        <span>{t("no")}</span>
      </button>

      <button
        onClick={() => handleActions("Enter", uniqueID)}
        className="custom-btn relative"
        type="button"
      >
        <span>{t("yes")}</span>
      </button>
    </div>
  );
};
