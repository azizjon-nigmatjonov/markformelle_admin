import { useEffect } from "react";
import { useKeyDownEvent } from "../../../hooks/useKeyDownEvent";
import { useTranslationHook } from "../../../hooks/useTranslation";

export const SubmitCancelButtons = ({
  handleActions,
  type = "create",
  uniqueID = "",
}: {
  type: string;
  uniqueID: string;
  handleActions: (val: string, val2: string) => void;
}) => {
  const { t } = useTranslationHook();
  const { isAltPressed, currentKey } = useKeyDownEvent();

  useEffect(() => {
    if (currentKey) handleActions(currentKey, uniqueID);
  }, [currentKey]);

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleActions("Close", uniqueID)}
        className="cancel-btn"
        type="button"
      >
        <span>{t("cancel")}</span>
        {isAltPressed && (
          <div className="ml-2 absolute right-2 flex items-center justify-center bg-white">
            <img width={20} src="/images/key_x.png" alt="key_x" />
          </div>
        )}
      </button>

      <button className="custom-btn relative" type="submit">
        <span>{t(type)}</span>
        {isAltPressed && (
          <div className="ml-2 absolute right-2 flex items-center justify-center bg-white">
            <img width={20} src="/images/key_f8.png" alt="key_f8" />
          </div>
        )}
      </button>
    </div>
  );
};
