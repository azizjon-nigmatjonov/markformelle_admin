import { useTranslation } from "react-i18next";
import {} from "../../../../../UI/IconGenerator/Svg";
import { ReactNode } from "react";

interface Props {
  active: boolean;
  text: string;
  icon: ReactNode;
  border?: boolean;
  show: boolean;
  onClick?: (value: any) => void;
}

const Element = ({
  active,
  text = "",
  icon,
  border = true,
  show = false,
  ...props
}: Props) => {
  const { t } = useTranslation();
  if (!show) return;
  return (
    <div
      className={`flex items-center space-x-[8px] px-4 group hover:bg-[var(--primary50)] ${
        active ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      {...props}
    >
      <div className="w-[15px] flex items-center justify-center">{icon}</div>
      <p
        className={`${
          border
            ? "border-b border-[var(--border)] group-hover:border-transparent"
            : ""
        } border-grayDark py-3 w-full select-none whitespace-nowrap text-[12px] ${
          active ? "text-black" : "text-[var(--gray)]"
        }`}
      >
        {t(text)}
      </p>
    </div>
  );
};

export default Element;
