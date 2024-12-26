import { useTranslation } from "react-i18next";
import { CheckLine } from "../../../components/UI/IconGenerator/Svg";

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
  const { t } = useTranslation();
  return (
    <div
      onClick={() => {
        if (!disabled) handleCheck(element);
      }}
      className={`flex items-center rounded-lg border-[var(--gray20)]  w-full whitespace-nowrap ${
        element?.label ? "border gap-2 px-[12px] h-[35px]" : ""
      } ${disabled ? "cursor-not-allowed " : "cursor-pointer "}`}
    >
      <div className="w-[18px] h-[18px]">
        <div
          className={`w-[18px] h-[18px] rounded-[4px] border-2 ${
            checked ? "border-[var(--main)]" : "border-[var(--gray20)]"
          } ${disabled ? "bg-[var(--gray20)]" : ""}`}
        >
          {checked ? <CheckLine fill="var(--main)" /> : ""}
        </div>
      </div>
      {element?.label && <p>{t(element.label)}</p>}
    </div>
  );
};

export default CCheckbox;
