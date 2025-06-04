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
  name: string;
  bodyColumns: any;
  headColumns: any;
  title: string;
  idTable?: number | null;
  disabled: boolean;
  handleRowClick: (val: any, type: string, arr?: any) => void;
}
export const TableUI = ({
  name,
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
    <div className="border rounded-[12px] border-[var(--border)]">
      <div className="py-1 flex items-center justify-between px-2 border-b border-[var(--border)] text-sm">
        <h2
          className={`font-medium ${
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
                <UncheckMultipleIcon width={18} fill="var(--main)" />
              ) : (
                <CheckMultipleIcon
                  width={18}
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
              if (idTable) setOpenDelete(true);
            }}
          >
            <div className="w-[30px] h-[30px] items-center justify-center flex">
              <DeleteIcon
                fill={!disabled ? "var(--main)" : "var(--gray)"}
                width={16}
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
                      bodySource.filter((body: any) =>
                        sellectedItems?.length
                          ? sellectedItems.includes(body.index)
                          : idTable === body[name]
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
      <div className="overflow-scroll designed-scroll h-[340px]">
        <div>
          <table
            className={`text-sm h-full ${cls.table}`}
            ref={headerScrollRef}
          >
            <thead
              className={`w-full font-medium text-sm`}
              style={{ height: "30px" }}
            >
              <tr
                className={` ${
                  disabled ? "text-[var(--gray)]" : "text-[var(--main)]"
                }`}
              >
                {openSelect && (
                  <th
                    className={`border-b border-[var(--border)] `}
                    style={{ height: "30px" }}
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
                  </th>
                )}
                {headColumns.map(
                  (
                    head: { id: string; title: string; width: number },
                    index: number
                  ) => (
                    <th
                      key={index}
                      className={`text-left border-b border-r border-[var(--border)] ${cls.cell}`}
                    >
                      <p>{head.title}</p>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className={`w-full whitespace-nowrap`}>
              {bodySource.map((item: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`${cls.row} ${
                    idTable === item[name] ? "bg-blue-200 relative w-full" : ""
                  } w-full cursor-pointer relative`}
                  style={{ height: "30px", minHeight: "30px !important" }}
                >
                  {openSelect && (
                    <td
                      className={`${cls.cell} border-r border-b border-[var(--border)] `}
                      style={{ height: "30px" }}
                    >
                      <div
                        onClick={() => handleSelect(item)}
                        className={`w-[18px] h-[18px] rounded-[4px] border border-[var(--main)] flex items-center justify-center cursor-pointer`}
                      >
                        {sellectedItems.includes(rowIndex + 1) && (
                          <CheckIcon
                            style={{ fill: "var(--main)", width: 14 }}
                          />
                        )}
                      </div>
                    </td>
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
                      <td
                        key={index}
                        onClick={() =>
                          handleRowClick({ ...item, index }, "view_single")
                        }
                        onDoubleClick={() =>
                          handleRowClick({ ...item, index }, "view")
                        }
                        style={{ height: "30px" }}
                        className={`${cls.cell} font-medium border-b border-[var(--border)]`}
                      >
                        {idTable === item[name] && index === 0 && (
                          <div className="bg-[var(--primary)] left-0 top-0 h-full w-[2px] absolute"></div>
                        )}
                        <p className="h-[30px]">
                          {head.render
                            ? head.render(item[head?.id], item)
                            : item[head.id]}
                        </p>
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
