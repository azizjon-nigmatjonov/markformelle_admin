import { useTranslation } from "react-i18next";
import { PlusIcon } from "../../../../../components/UI/IconGenerator/Svg";
import cls from "./style.module.scss";
interface Props {
  bodyColumns: any;
  headColumns: any;
  title: string;
  handleRowClick: (val: any, type: string) => void;
}
export const TableUI = ({
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
  title = "table",
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-1 flex items-center justify-between px-2 border-b border-[var(--border)]">
        <h2>{title}</h2>
        <button className="flex space-x-1 items-center text-sm">
          <PlusIcon fill="var(--black)" />
          <span>{t("add")}</span>
        </button>
      </div>
      <div
        className={`${cls.twoRowTable} text-sm overflow-x-scroll designed-scroll h-full`}
      >
        <div className={`${cls.header} flex w-full`}>
          <div className="flex font-medium text-[var(--main)]">
            {headColumns.map(
              (head: { id: string; title: string }, index: number) => (
                <div
                  key={index}
                  className={`${cls.cell} border-b border-[var(--border)]`}
                >
                  <p>{head.title}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className={`${cls.body} w-full`}>
          {bodyColumns.map((item: any, index: number) => (
            <div
              key={index}
              className={`${cls.row} flex w-full cursor-pointer`}
              onClick={() => handleRowClick({ ...item, index }, "view")}
            >
              {headColumns.map(
                (head: { id: string; title: string }, index: number) => (
                  <div
                    key={index}
                    className={`${cls.cell} font-medium border-b border-[var(--border)]`}
                  >
                    <p>{item[head.id]}</p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
