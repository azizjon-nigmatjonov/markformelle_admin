import { useMemo, useRef, useState } from "react";
import cls from "./style.module.scss";
import {
  DeleteIcon,
  PlusIcon,
} from "../../../../../components/UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";
import { PopoverDelete } from "./PopOver";
import CheckIcon from "@mui/icons-material/Check";
import {
  CheckMultipleIcon,
  UncheckMultipleIcon,
} from "../../../../../components/UI/IconGenerator/Svg/Table";
import { IconButton } from "@mui/material";
import { translateActions } from "../../../../../store/translation/translate.slice";
import { useDispatch } from "react-redux";
import usePageRouter from "../../../../../hooks/useObjectRouter";
interface Props {
  title: string;
  disabled: boolean;
  bodyColumns: any;
  headColumns: any;
  idTable: number | null;
  handleRightClick: (
    e: any,
    atisNo: { ATISNO: number; LABRECETEATISID: number }
  ) => void;
  handleRowClick: (val: any, type: string, arr?: any) => void;
}
export const TwoRowTable = ({
  disabled = false,
  bodyColumns = {},
  headColumns = [],
  handleRowClick,
  idTable,
  handleRightClick,
}: Props) => {
  const { navigateTo } = usePageRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const headerScrollRef: any = useRef(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [sellectedItems, setSellectedItems]: any = useState([]);

  const [sellectedItemsSecondTable, setSellectedItemsSecondTable]: any =
    useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const bodySource = useMemo(() => {
    return {
      okey:
        bodyColumns?.okey?.map((item: {}, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        }) ?? [],
      okeysiz:
        bodyColumns?.okeysiz?.map((item: {}, index: number) => {
          return {
            ...item,
            index: index + 1,
          };
        }) ?? [],
    };
  }, [bodyColumns]);

  const handleSelect = (el: { index: number }) => {
    if (sellectedItems.includes(el.index)) {
      setSellectedItems(
        sellectedItems.filter((item: number) => item !== el.index)
      );
    } else {
      setSellectedItems([...sellectedItems, el.index]);
    }
  };

  const handleSelectSecondTable = (el: { index: number }) => {
    if (sellectedItemsSecondTable.includes(el.index)) {
      setSellectedItemsSecondTable(
        sellectedItemsSecondTable.filter((item: number) => item !== el.index)
      );
    } else {
      setSellectedItemsSecondTable([...sellectedItemsSecondTable, el.index]);
    }
  };

  const translationActions = () => {
    const newArr: object[] = [];
    headColumns.forEach((element: { id: string }) => {
      const obj = {
        KEYWORD: element.id,
        RU: "",
        EN: "",
        UZ: "",
        TU: "",
      };
      newArr.push(obj);
    });

    dispatch(translateActions.setTranslation(newArr));

    navigateTo("/settings/profile?tab=translation");
  }


  return (
    <>
      <div className="rounded-[12px] border border-[var(--border)]">
        <div className="flex items-center justify-between px-2 border-b border-[var(--border)] text-sm">

          <button
            className={`flex space-x-1 items-center text-sm ${disabled ? "text-[var(--gray)]" : "text-[var(--main)]"
              }`}
            onClick={() => handleRowClick({}, "modal")}
            disabled={disabled}
            type="button"
          >
            <PlusIcon fill={disabled ? "var(--gray)" : "var(--main)"} />
            <span>{t("add")}</span>
          </button>
          {/* <h2
            className={`font-medium ${disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
              }`}
          >
            {t(title)}
          </h2> */}
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
                className={`text-sm pr-2 ${disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
                  }`}
              >
                {t(openSelect ? "cancel" : "sellect")}
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
                  fill={idTable ? "var(--main)" : "var(--gray)"}
                  width={16}
                />
              </div>
              <p
                className={`text-sm pr-2 ${disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
                  }`}
              >
                {t("delete")}
              </p>
            </button>

            <IconButton
              onClick={() => translationActions()}
              disabled={disabled}
            >
              <div
                className={`h-[30px] w-[30px] flex items-center justify-center`}
              >
                <svg
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={disabled ? "var(--gray)" : "var(--main)"}
                >
                  <path d="M5 15V17C5 18.0544 5.81588 18.9182 6.85074 18.9945L7 19H10V21H7C4.79086 21 3 19.2091 3 17V15H5ZM18 10L22.4 21H20.245L19.044 18H14.954L13.755 21H11.601L16 10H18ZM17 12.8852L15.753 16H18.245L17 12.8852ZM8 2V4H12V11H8V14H6V11H2V4H6V2H8ZM17 3C19.2091 3 21 4.79086 21 7V9H19V7C19 5.89543 18.1046 5 17 5H14V3H17ZM6 6H4V9H6V6ZM10 6H8V9H10V6Z"></path>
                </svg>
              </div>
            </IconButton>
            {openDelete && (
              <div className="absolute top-full shadow-2xl border border-[var(--gray30)] w-[300px] z-[99] bg-white rounded-[8px]">
                <PopoverDelete
                  closePopover={(status) => {
                    setOpenDelete(false);
                    if (status) {
                      handleRowClick({}, "delete", [
                        ...bodySource.okey.filter((body: any) =>
                          sellectedItems.length
                            ? sellectedItems.includes(body.index)
                            : idTable === body.LABRECETEATISID
                        ),
                        ...bodySource.okeysiz.filter((body: any) =>
                          sellectedItemsSecondTable.length
                            ? sellectedItemsSecondTable.includes(body.index)
                            : idTable === body.LABRECETEATISID
                        ),
                      ]);
                    }
                    setSellectedItems([]);
                    setSellectedItemsSecondTable([]);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`${cls.twoRowTable} text-sm overflow-x-scroll overflow-y-hidden designed-scroll h-[400px]`}
        >
          <div className={`${cls.header} flex`} ref={headerScrollRef}>
            <div
              className={`flex font-medium ${disabled ? "text-[var(--gray)]" : "text-[var(--main)]"
                }`}
            >
              {openSelect && (
                <div
                  className={`pr-2 flex items-center border-b border-[var(--border)]`}
                >
                  <div
                    className={`w-[18px] h-[18px] flex items-center justify-center cursor-pointer`}
                  ></div>
                </div>
              )}
              {headColumns.map(
                (head: { id: string; title: string; width: number }) => (
                  <div
                    key={head.id + head.title}
                    style={{ width: head?.width || "auto" }}
                    className={`${cls.cell} border-b border-l border-[var(--border)]`}
                  >
                    <p>{t(head.title) || head.title}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div
            className={`${cls.body} h-[45%] max-h-[45%] overflow-y-scroll remove-scroll bg-green-200 w-full`}
            style={{ width: headerScrollRef?.current?.scrollWidth + "px" }}
          >
            {bodySource?.okey?.map((item: any, index: number) => (
              <div
                key={index}
                className={`${cls.row} relative ${idTable === item.LABRECETEATISID
                  ? "bg-blue-200"
                  : "bg-green-200"
                  } flex relative`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRightClick(e, item);
                }}
              >
                {idTable === item.LABRECETEATISID && (
                  <div className="bg-[var(--primary)] left-0 top-0 h-full w-[2px] absolute"></div>
                )}
                {openSelect && (
                  <div
                    className={`pr-2 flex items-center border-b border-green-300`}
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
                  (head: {
                    id: string;
                    title: string;
                    render: any;
                    width: number;
                  }) => (
                    <div
                      key={head.id + head.title}
                      style={{ width: head?.width || "auto" }}
                      className={`${cls.cell
                        } font-medium border-b border-l border-green-300 ${idTable === item.LABRECETEATISID
                          ? "bg-blue-200 border-blue-300"
                          : "bg-green-200"
                        } cursor-pointer`}
                      onClick={() =>
                        handleRowClick({ ...item, index }, "view_single")
                      }
                      onDoubleClick={() =>
                        handleRowClick({ ...item, index }, "view")
                      }
                    >
                      <p style={{ width: head?.width || "auto" }}>
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
          <div className="h-[6px] w-full"></div>

          <div
            className={`${cls.body} bg-yellow-100 w-full h-[43%] max-h-[43%] overflow-y-scroll remove-scroll`}
            style={{ width: headerScrollRef?.current?.scrollWidth + "px" }}
          >
            {bodySource?.okeysiz?.map((item: any, index: number) => (
              <div
                key={index}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRightClick(e, item);
                }}
                className={`${cls.row} relative ${idTable === item.LABRECETEATISID
                  ? "bg-blue-200"
                  : "bg-yellow-100"
                  } flex cursor-pointer`}
              >
                {idTable === item.LABRECETEATISID && (
                  <div className="bg-[var(--primary)] left-0 top-0 h-full w-[2px] absolute"></div>
                )}
                {openSelect && (
                  <div
                    className={`pr-2 flex items-center border-b border-yellow-300`}
                  >
                    <div
                      onClick={() => handleSelectSecondTable(item)}
                      className={`w-[18px] h-[18px] rounded-[4px] border border-[var(--main)] flex items-center justify-center cursor-pointer`}
                    >
                      {sellectedItemsSecondTable.includes(index + 1) && (
                        <CheckIcon style={{ fill: "var(--main)", width: 14 }} />
                      )}
                    </div>
                  </div>
                )}
                {headColumns.map(
                  (head: {
                    id: string;
                    title: string;
                    render: any;
                    width: number;
                  }) => (
                    <div
                      key={head.id + head.title}
                      style={{ width: head?.width || "auto" }}
                      onClick={() =>
                        handleRowClick({ ...item, index }, "view_single")
                      }
                      onDoubleClick={() =>
                        handleRowClick({ ...item, index }, "view")
                      }
                      className={`${cls.cell} ${idTable === item.LABRECETEATISID
                        ? "bg-blue-200 border-blue-300"
                        : "bg-yellow-100"
                        } font-medium border-b border-l border-yellow-300`}
                    >
                      <p style={{ width: head?.width || "auto" }}>
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
      </div>
    </>
  );
};
