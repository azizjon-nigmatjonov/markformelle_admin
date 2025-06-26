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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const form = (e.target as HTMLElement).closest("form");
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const active = document.activeElement;
        const currentIndex = elements.indexOf(active as HTMLElement);

        const next = elements[currentIndex + 1];
        if (next && typeof next.focus === "function") {
          next.focus();
        }
      }
    }
    if (e.code === "Space") {
      handleCheck({ ...element, checked: !value });
      setValue(!value);
    }
  };

  return (
    <div
      onClick={() => {
        if (!disabled) {
          handleCheck({ ...element, checked: !value });
          setValue(!value);
        }
      }}
      className={`flex items-center rounded-[8px] border-[var(--border)] w-full whitespace-nowrap relative ${
        element?.label ? "border gap-2 px-2 h-[30px]" : ""
      } ${disabled ? "cursor-not-allowed " : "cursor-pointer "}`}
    >
      <div className="w-[18px] h-[18px] relative z-[2]">
        <div
          className={`w-[18px] h-[18px] rounded-[4px] border ${
            value ? "border-[var(--main)]" : "border-[var(--gray30)]"
          } ${disabled ? "bg-[var(--border)]" : ""}`}
        >
          {value ? <CheckLine fill="var(--main)" /> : ""}
        </div>
      </div>
      <input
        readOnly
        className={`focus:border  w-full absolute left-0 top-0 h-full rounded-[8px] cursor-pointer ${
          element?.label?.length > 1 ? "pl-10" : ""
        }`}
        onKeyDown={(e: any) => handleKeyDown(e)}
        type="text"
        value={t(element?.label || "")}
      />
    </div>
  );
};

export default CCheckbox;
