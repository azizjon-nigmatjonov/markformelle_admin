import { useTranslation } from "react-i18next";
import { PlusIcon } from "../../IconGenerator/Svg";
import { OneSkeleton } from "../../../CElements/CSkeleton/OneSkeleton";
import cls from "./style.module.scss";
// import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useRef, useState } from "react";
interface Props {
  bodyColumns: any;
  headColumns: any;
  name: string;
  idTable?: number | null;
  isLoading: boolean;
  searchName: string;
  handleRowClick: (val: any, type: string) => void;
}
export const TableUI = ({
  name = "",
  // searchName = "",
  idTable,
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
  isLoading = false,
}: Props) => {
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        const form = (e.target as HTMLElement).closest("form");
        if (form) {
          const elements = Array.from(form.elements) as HTMLElement[];
          const active = document.activeElement;
          const currentIndex = elements.indexOf(active as HTMLElement);

          const next = elements[currentIndex + 1];
          if (next && typeof next.focus === "function") {
            next.focus();
          }
        }
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
                  className={`${cls.cell} border-b border-[var(--border)] focus:border-[var(--primary)]`}
                >
                  <p className="pr-1.5">{head.title}</p>
                  {/* <div
                    onClick={() =>
                      handleRowClick({ id: head.id }, "active_col")
                    }
                    className={`w-[15px] h-[15px] rounded-[4px] border border-[var(--main)] cursor-pointer`}
                  >
                    <div className="w-[15px] h-full flex items-center justify-center">
                      {searchName === head.id ? (
                        <CheckIcon style={{ fill: "var(--main)", width: 12 }} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div> */}
                </div>
              )
            )}
          </div>
        </div>

        <div className={`${cls.body} w-full`}>
          {isLoading ? (
            <OneSkeleton rounded={8} />
          ) : bodyColumns?.length ? (
            bodyColumns.map((item: any, rowInd: number) => (
              <div
                key={rowInd}
                className={`${cls.row} flex w-full cursor-pointer`}
                onClick={() => {
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
                        idTable === item?.[name] || focusedIndex === rowInd
                          ? "bg-blue-200 relative"
                          : ""
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
