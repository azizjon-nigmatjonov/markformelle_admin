import { useTranslation } from "react-i18next";
import { ArrowDownFilled } from "../../UI/IconGenerator/Svg";
import { Closer } from "../../UI/Closer";

interface Props {
  title: string;
  open: boolean;
  setOpen: (val: any) => void;
  children: any;
}

export const CList = ({
  title = "name",
  children,
  open = false,
  setOpen = () => {},
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between space-x-4 cursor-pointer"
      >
        <h3>{t(title)}</h3>
        <div className={open ? "" : "rotate-[180deg]"}>
          <ArrowDownFilled />
        </div>
      </div>
      {open ? (
        <div className="absolute w-full left-0 top-full bg-white common-shadow p-3 z-[92] rounded-[8px] border border-[var(--border)]">
          {children}
        </div>
      ) : (
        ""
      )}
      {open && <Closer handleClose={() => setOpen(false)} />}
    </div>
  );
};
