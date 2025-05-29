import { useTranslation } from "react-i18next";
import { PlusIcon } from "../../IconGenerator/Svg";
import cls from "./style.module.scss";
import { OneSkeleton } from "../../../CElements/CSkeleton/OneSkeleton";
interface Props {
  bodyColumns: any;
  headColumns: any;
  name: string;
  idTable?: number | null;
  isLoading: boolean;
  handleRowClick: (val: any, type: string) => void;
}
export const TableUI = ({
  name = "",
  idTable,
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
  isLoading = false,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`${cls.table} text-sm w-full overflow-scroll designed-scroll h-full pl-2`}
      >
        <div
          className={`${cls.header} flex w-full sticky top-0 bg-white rounded-[8px]`}
        >
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
          {isLoading ? (
            <OneSkeleton rounded={8} />
          ) : bodyColumns?.length ? (
            bodyColumns.map((item: any, index: number) => (
              <div
                key={index}
                className={`${cls.row} flex w-full cursor-pointer`}
                onClick={() =>
                  handleRowClick({ ...item, index }, "view_single")
                }
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
                        idTable === item?.[name] ? "bg-blue-200 relative" : ""
                      } font-medium border-b border-[var(--border)]`}
                    >
                      {idTable === item?.[name] && index === 0 ? (
                        <div className="w-[2px] bg-[var(--primary)] h-full absolute left-0 top-0"></div>
                      ) : (
                        ""
                      )}
                      <p>
                        {head.render
                          ? head.render(item[head?.id], item)
                          : item[head.id]}
                      </p>
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center py-5">
              <img width={100} src="/images/no-data.png" alt="empty" />
            </div>
          )}
        </div>
      </div>
      <div className="h-[35px] border-t border-[var(00border)] flex items-center justify-between px-2">
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
