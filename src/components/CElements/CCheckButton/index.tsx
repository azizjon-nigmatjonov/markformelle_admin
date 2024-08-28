import { useTranslation } from "react-i18next";
// import { CheckLine } from "../../../components/UI/IconGenerator/Svg";

interface Props {
  element: any;
  checked?: boolean;
  color?: string;
  handleCheck?: (val: any) => void;
}

const CCheckButton = ({
  element,
  handleCheck = () => {},
  checked = false,
  color = "white",
}: Props) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => handleCheck(element)}
      className={`flex items-center gap-2 cursor-pointer px-12px rounded-[8px] border border-[var(--border)] h-[35px] w-full whitespace-nowrap`}
      style={{
        backgroundColor: checked ? color : "",
        color: checked ? "white" : "var(--gray)",
      }}
    >
      <p className="font-medium">{t(element.label)}</p>
    </div>
  );
};

export default CCheckButton;
