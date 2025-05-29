import { useTranslation } from "react-i18next";
import {
  DeleteIcon,
  PlusIcon,
} from "../../../../../components/UI/IconGenerator/Svg";
import CheckIcon from "@mui/icons-material/Check";
import cls from "./style.module.scss";
import { useMemo, useRef, useState } from "react";
import { areAllRowsSelectedOnPage, toggleRowGroupSelection } from "./Logic";
import { PopoverDelete } from "./PopOver";
import {
  CheckMultipleIcon,
  UncheckMultipleIcon,
} from "../../../../../components/UI/IconGenerator/Svg/Table";
interface Props {
  bodyColumns: any;
  headColumns: any;
  title: string;
  idTable?: number | null;
  disabled: boolean;
  handleRowClick: (val: any, type: string, arr?: any) => void;
}
export const TableUI = ({
  idTable,
  bodyColumns = [],
  headColumns = [],
  handleRowClick,
  disabled = false,
  title = "table",
}: Props) => {
  const { t } = useTranslation();
  const headerScrollRef: any = useRef(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [sellectedItems, setSellectedItems]: any = useState([]);

  const bodySource = useMemo(() => {
    return bodyColumns?.map((item: {}, index: number) => {
      return {
        ...item,
        index: index + 1,
      };
    });
  }, [bodyColumns]);

  const handleSelectAll = () => {
    const rowIndexes = bodySource.map((item: { index: number }) => item.index);
    setSellectedItems(
      toggleRowGroupSelection({
        selectedItems: sellectedItems,
        currentGroup: rowIndexes,
      })
    );
  };

  const handleSelect = (el: { index: number }) => {
    if (sellectedItems.includes(el.index)) {
      setSellectedItems(
        sellectedItems.filter((item: number) => item !== el.index)
      );
    } else {
      setSellectedItems([...sellectedItems, el.index]);
    }
  };

  return (
    <>
      <div className="py-1 flex items-center justify-between px-2 border-b border-[var(--border)]">
        <h2
          className={`${
            disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
          }`}
        >
          {t(title)}
        </h2>
        <div className="flex space-x-3 relative">
          <button
            className="flex items-center"
            type="button"
            onClick={() => {
              setOpenSelect((prev: boolean) => !prev);
            }}
          >
            <div className="w-[30px] h-[30px] items-center justify-center flex">
              {openSelect ? (
                <UncheckMultipleIcon width={20} fill="var(--main)" />
              ) : (
                <CheckMultipleIcon
                  width={20}
                  fill={disabled ? "var(--gray)" : "var(--main)"}
                />
              )}
            </div>
            <p
              className={`text-sm pr-2 ${
                disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
              }`}
            >
              {t(openSelect ? "unsellect" : "sellect")}
            </p>
          </button>
          <button
            className="flex items-center"
            type="button"
            onClick={() => {
              if (sellectedItems.length) setOpenDelete(true);
            }}
          >
            <div className="w-[30px] h-[30px] items-center justify-center flex">
              <DeleteIcon
                fill={sellectedItems?.length ? "var(--main)" : "var(--gray)"}
                width={18}
              />
            </div>
            <p
              className={`text-sm pr-2 ${
                disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
              }`}
            >
              {t("delete")}
            </p>
          </button>
          {openDelete && (
            <div className="absolute right-0 top-full shadow-2xl border border-[var(--gray30)] w-[300px] z-[99] bg-white rounded-[8px]">
              <PopoverDelete
                closePopover={(status) => {
                  setOpenDelete(false);
                  if (status) {
                    handleRowClick(
                      {},
                      "delete",
                      bodySource.filter((body: { index: number }) =>
                        sellectedItems.includes(body.index)
                      )
                    );
                  }
                  setSellectedItems([]);
                }}
              />
            </div>
          )}
          <button
            className={`flex space-x-1 items-center text-sm ${
              disabled ? "text-[var(--gray)]" : "text-[var(--main)]"
            }`}
            onClick={() => handleRowClick({}, "modal")}
            disabled={disabled}
            type="button"
          >
            <PlusIcon fill={disabled ? "var(--gray)" : "var(--main)"} />
            <span>{t("add")}</span>
          </button>
        </div>
      </div>
      <div
        className={`${cls.tableOne} ${
          idTable ? "" : cls.tableOneDetail
        } text-sm overflow-x-scroll designed-scroll h-full`}
        ref={headerScrollRef}
      >
        <div className={`${cls.header} px-2 flex w-full`}>
          <div
            className={`flex font-medium ${
              disabled ? "text-[var(--gray)]" : "text-[var(--main)]"
            }`}
          >
            {openSelect && (
              <div
                className={`pr-2 flex items-center border-b border-[var(--border)]`}
              >
                <div
                  onClick={() => handleSelectAll()}
                  className={`w-[18px] h-[18px] rounded-[4px] border border-[var(--main)] flex items-center justify-center cursor-pointer`}
                >
                  {areAllRowsSelectedOnPage(sellectedItems, bodySource) &&
                  sellectedItems.length ? (
                    <CheckIcon style={{ fill: "var(--main)", width: 14 }} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
            {headColumns.map(
              (
                head: { id: string; title: string; width: number },
                index: number
              ) => (
                <div
                  key={index}
                  style={{ minWidth: head?.width || "auto" }}
                  className={`${cls.cell} border-b border-[var(--border)]`}
                >
                  <p>{head.title}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className={`${cls.body} w-full`}
          style={{ width: headerScrollRef?.current?.scrollWidth + "px" }}
        >
          {bodySource.map((item: any, index: number) => (
            <div
              key={index}
              className={`${cls.row} px-2 ${
                idTable === item.LABRECETECALISMAID
                  ? "bg-blue-200 relative w-full"
                  : ""
              } flex w-full cursor-pointer relative`}
            >
              {idTable === item.LABRECETECALISMAID && (
                <div className="bg-[var(--primary)] left-0 top-0 h-full w-[2px] absolute"></div>
              )}
              {openSelect && (
                <div
                  className={`pr-2 flex items-center border-b border-[var(--border)]`}
                >
                  <div
                    onClick={() => handleSelect(item)}
                    className={`w-[18px] h-[18px] rounded-[4px] border border-[var(--main)] flex items-center justify-center cursor-pointer`}
                  >
                    {sellectedItems.includes(index + 1) && (
                      <CheckIcon style={{ fill: "var(--main)", width: 14 }} />
                    )}
                  </div>
                </div>
              )}
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
                    style={{ minWidth: head?.width || "auto" }}
                    onClick={() =>
                      handleRowClick({ ...item, index }, "view_single")
                    }
                    onDoubleClick={() =>
                      handleRowClick({ ...item, index }, "view")
                    }
                    className={`${cls.cell} font-medium border-b border-[var(--border)]`}
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
      </div>
    </>
  );
};
