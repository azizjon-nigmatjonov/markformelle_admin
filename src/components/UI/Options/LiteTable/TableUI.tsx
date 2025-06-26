import { useTranslation } from "react-i18next";
import { PlusIcon } from "../../IconGenerator/Svg";
import cls from "./style.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState, useCallback } from "react";
import { websiteActions } from "../../../../store/website";
import { useDispatch } from "react-redux";
interface Props {
  bodyColumns: any;
  headColumns: any;
  name: string;
  idTable?: number | null;
  isLoading: boolean;
  searchName: string;
  link: string;
  handleRowClick: (val: any, type: string) => void;
  onLoadMore?: () => void;
}
export const TableUI = ({
  name = "",
  // searchName = "",
  idTable,
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
  isLoading = false,
  link = "",
  onLoadMore,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!tableRef.current || !onLoadMore || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isNearBottom) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading]);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => tableElement.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!bodyColumns?.length) return;

      if (e.key === "ArrowDown") {
        setFocusedIndex((prev: number) =>
          Math.min(prev + 1, bodyColumns.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev: number) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && focusedIndex !== -1) {
        handleRowClick(
          { ...bodyColumns[focusedIndex], index: focusedIndex },
          "view_single"
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bodyColumns, focusedIndex]);

  useEffect(() => {
    if (rowRefs.current[focusedIndex]) {
      rowRefs.current[focusedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  return (
    <>
      <div
        ref={tableRef}
        className={`${cls.table} text-sm w-full overflow-scroll designed-scroll h-full pl-2`}
      >
        <div className={`${cls.header} flex w-full sticky top-0 rounded-[8px]`}>
          <div className="flex font-medium text-[var(--main)] w-full">
            {headColumns.map(
              (
                head: { id: string; title: string; width: number },
                index: number
              ) => (
                <div
                  key={index}
                  style={{ width: head?.width || "100%" }}
                  className={`${cls.cell} border-b border-[var(--border)] bg-white focus:border-[var(--primary)]`}
                >
                  <p className="pr-1.5">{head.title}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className={`${cls.body} w-full`}>
          {isLoading && bodyColumns.length === 0 ? (
            <div className="flex justify-center items-center h-[100px]">
              <CircularProgress />
            </div>
          ) : bodyColumns?.length ? (
            <>
              {bodyColumns.map((item: any, rowInd: number) => (
                <div
                  key={rowInd}
                  className={`${cls.row} flex w-full cursor-pointer`}
                  onClick={() => {
                    handleRowClick({ ...item, rowInd }, "view_single");
                  }}
                  onMouseDown={() => {
                    handleRowClick({ ...item, rowInd }, "view_single");
                  }}
                  ref={(el) => (rowRefs.current[rowInd] = el)}
                  onDoubleClick={() =>
                    handleRowClick({ ...item, rowInd }, "view")
                  }
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
                          idTable === item?.[name]
                            ? "bg-blue-200 relative"
                            : focusedIndex === rowInd
                            ? "bg-blue-100"
                            : ""
                        } font-medium border-b border-[var(--border)]`}
                      >
                        {idTable === item?.[name] && index === 0 ? (
                          <div className="w-[2px] bg-[var(--primary)] h-full absolute left-0 top-0"></div>
                        ) : (
                          ""
                        )}
                        <div>
                          {head.render
                            ? head.render(item[head?.id], item)
                            : item[head.id]}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
              {isLoading && bodyColumns.length > 0 && (
                <div className="flex justify-center items-center h-[50px]">
                  <CircularProgress size={20} />
                </div>
              )}
            </>
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
          onClick={() => {
            dispatch(websiteActions.setModalType(link));
          }}
        >
          <PlusIcon fill="var(--main)" />
          <span>{t("add")}</span>
        </button>
      </div>
    </>
  );
};
