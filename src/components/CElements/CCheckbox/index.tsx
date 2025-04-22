import { CheckLine } from "../../../components/UI/IconGenerator/Svg";
import { useEffect, useState } from "react";
import { useTranslationHook } from "../../../hooks/useTranslation";

interface Props {
  element?: any;
  checked?: boolean;
  disabled?: boolean;
  handleCheck?: (val: any) => void;
}

const CCheckbox = ({
  element,
  handleCheck = () => {},
  checked = false,
  disabled = false,
}: Props) => {
  const { t } = useTranslationHook();
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <div
      onClick={() => {
        if (!disabled) {
          setValue(!value);
          handleCheck({ ...element, checked: !value });
        }
      }}
      className={`flex items-center rounded-[8px] border-[var(--border)] w-full whitespace-nowrap ${
        element?.label ? "border gap-2 px-[12px] h-[35px]" : ""
      } ${disabled ? "cursor-not-allowed " : "cursor-pointer "}`}
    >
      <div className="w-[18px] h-[18px]">
        <div
          className={`w-[18px] h-[18px] rounded-[4px] border ${
            value ? "border-[var(--main)]" : "border-[var(--gray30)]"
          } ${disabled ? "bg-[var(--border)]" : ""}`}
        >
          {value ? <CheckLine fill="var(--main)" /> : ""}
        </div>
      </div>
      {element?.label && <p className="text-sm">{t(element.label)}</p>}
    </div>
  );
};

export default CCheckbox;
