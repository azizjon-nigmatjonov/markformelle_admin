import { useTranslation } from "react-i18next";
import { PlusIcon } from "../../IconGenerator/Svg";
import cls from "./style.module.scss";
interface Props {
  bodyColumns: any;
  headColumns: any;

  idTable?: number | null;
  handleRowClick: (val: any, type: string) => void;
}
export const TableUI = ({
  idTable,
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`${cls.table} ${
          idTable ? "" : cls.tableOneDetail
        } text-sm overflow-x-scroll designed-scroll h-full`}
      >
        <div className={`${cls.header} flex w-full`}>
          <div className="flex font-medium text-[var(--main)] w-full">
            {headColumns.map(
              (
                head: { id: string; title: string; width: number },
                index: number
              ) => (
                <div
                  key={index}
                  style={{ width: head?.width || "100%" }}
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
              onClick={() => handleRowClick({ ...item, index }, "view_single")}
              onDoubleClick={() => handleRowClick({ ...item, index }, "view")}
            >
              {headColumns.map(
                (
                  head: {
                    id: string;
                    title: string;
                    render?: any;
                    width: number;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    style={{ width: head?.width || "100%" }}
                    className={`${cls.cell} ${
                      idTable === item.LABRECETECALISMAID ? "bg-blue-200" : ""
                    } font-medium border-b border-[var(--border)]`}
                  >
                    <p>
                      {head.render
                        ? head.render(item[head?.id], item)
                        : item[head.id]}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="h-[30px] border-t border-[var(00border)] flex items-center justify-between px-2">
        <div></div>
        <button
          className="flex space-x-1 items-center text-sm text-[var(--main)]"
          type="button"
        >
          <PlusIcon fill="var(--main)" />
          <span>{t("add")}</span>
        </button>
      </div>
    </>
  );
};
