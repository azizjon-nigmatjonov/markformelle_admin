import { Closer } from "../../../../../UI/Closer";
import { WarningIcon } from "../../../../../UI/IconGenerator/Svg";

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
  return (
    <>
      <div className={`absolute left-0 top-full z-[92] ${classes}`}>
        <div className="absolute left-4 top-[-5px] w-[20px] h-[20px] bg-white rotate-45 rounded-[2px] z-[90] border border-[var(--border)]"></div>
        <div className="relative  p-2 z-[99] bg-white rounded-[4px] border border-[var(--border)] common-shadow ">
          <p className="whitespace-nowrap flex items-start space-x-5">
            <WarningIcon />{" "}
            <div>
              <p className="font-[600] text-sm">{title}</p>
              <p className="text-sm">{text}</p>
            </div>
          </p>

          <div className="flex items-center justify-end space-x-3 mt-2 text-sm">
            <button
              className="bg-[var(--border)] text-[var(--black)] px-4 py-2 rounded-[4px]"
              onClick={() => closePopover("")}
            >
              Нет
            </button>
            <button
              className="bg-[var(--main)] px-4 py-2 rounded-[4px] text-white"
              onClick={() => closePopover("delete")}
            >
              Да
            </button>
          </div>
        </div>
      </div>
      <Closer handleClose={() => closePopover("")} />
    </>
  );
};
