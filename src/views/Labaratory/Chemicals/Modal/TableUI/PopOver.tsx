import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { WarningIcon } from "../../../../../components/UI/IconGenerator/Svg";

export const PopoverDelete = ({
  title = "Вы хотите удалить эти данные?",
  text = "",
  classes = "",
  closePopover = () => {},
}: {
  title?: string;
  text?: string;
  classes?: string;
  closePopover: (val: string) => void;
}) => {
  const { t } = useTranslationHook();
  return (
    <>
      <div className={`relative z-[99] bg-white p-2 ${classes} rounded-[8px]`}>
        <div className="whitespace-nowrap flex items-start space-x-3">
          <WarningIcon />{" "}
          <div>
            <p className="font-[600] text-sm">{title}</p>
            <p className="text-sm">{text}</p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 mt-2 text-sm">
          <button
            className="bg-[var(--border)] text-[var(--black)] px-4 py-1 rounded-[4px]"
            onClick={() => closePopover("")}
            type="button"
          >
            {t("no")}
          </button>
          <button
            className="bg-[var(--main)] px-4 py-1 rounded-[4px] text-white"
            onClick={() => closePopover("delete")}
            type="button"
          >
            {t("yes")}
          </button>
        </div>
      </div>
      <div className="w-[20px] h-[20px] border bg-white absolute left-[20px] top-[5px] rotate-45 z-[1]"></div>
    </>
  );
};
