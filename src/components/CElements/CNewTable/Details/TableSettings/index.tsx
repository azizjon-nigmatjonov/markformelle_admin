import { useCallback, useEffect, useMemo, useState } from "react";
import { Closer } from "../../../../UI/Closer";
import { MenuItem } from "./MenuItems";
import { tableStoreActions } from "../../../../../store/table";
import { useDispatch } from "react-redux";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { ListDotIcon } from "../../../../UI/IconGenerator/Svg/Machines";
import ExcelDownload from "../../../../../hooks/useExcelDownload";
import ExcelReader from "../../../../../hooks/useExcelImport";
import {
  DeleteIcon,
  FilterIcon,
  PlusIcon,
} from "../../../../UI/IconGenerator/Svg";
import { PopoverDelete } from "../Actions/EditDelete/PopOver";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import {
  CheckMultipleIcon,
  UncheckMultipleIcon,
} from "../../../../UI/IconGenerator/Svg/Table";
import { TooltipPosition } from "../../../../../constants/toolPosition";

export const SettingDropdown = ({
  allCheck = false,
  menuList = [],
  handleFilterSave,
}: {
  menuList: any;
  allCheck?: boolean;
  setOpen: (val: boolean) => void;
  handleFilterSave: (val: any) => void;
}) => {
  return (
    <div className="absolute right-3 top-[33px] bg-white border border-[var(--gray30)] shadow-2xl rounded-[8px] z-[92] min-w-[150px] whitespace-nowrap px-2 py-2">
      <ul className="grid gap-y-3 max-h-[400px] overflow-y-scroll designed-scroll">
        {menuList.map((item: {}, index: number) => (
          <MenuItem
            key={index}
            element={item}
            allCheck={allCheck}
            handleFilterSave={handleFilterSave}
          />
        ))}
      </ul>
    </div>
  );
};

export const HeaderSettings = ({
  sideFilter,
  filterParams,
  tableActions,
  pageName,
  bodyColumns = [],
  pageColumns = [],
  headColumns = [],
  allColumns = [],
  extra,
  title,
  sortData,
  defaultFilters = [],
  selectedItems = [],
  disabled = false,
  openSelect = false,
  defaultExcelFields,
}: {
  filterParams: any;
  title: string;
  pageName: string;
  headColumns: any;
  pageColumns: any;
  bodyColumns: any;
  allColumns: any;
  extra?: any;
  sideFilter: boolean;
  sortData: any;
  defaultFilters: any;
  selectedItems: any;
  disabled: boolean;
  openSelect: boolean;
  defaultExcelFields: string[];
  tableActions: (el: any, status: string) => void;
}) => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const [allCheck, setAllCheck] = useState(true);
  const handleFilterSave = (id: any) => {
    let arr: any = pageColumns?.length ? [...pageColumns] : [];

    if (id === "all") {
      if (allCheck) {
        arr = [];
        setAllCheck(false);
      } else {
        (arr = headColumns.map((item: { id: any }) => {
          if (typeof item.id === "object") {
            return item.id.join("");
          } else {
            return item.id;
          }
        })),
          setAllCheck(true);
      }
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 100);
    } else {
      if (id?.[0] && typeof id === "object") {
        id = id.join("");
      }

      if (arr.includes(id)) {
        setAllCheck(false);
        arr = arr.filter((item: string) => item !== id);
      } else {
        arr = [...arr, id];
      }
    }
    const obj = allColumns?.[0] ?? {};
    const keys = Object.keys(obj);

    if (keys.length === arr.length) {
      setAllCheck(true);
    }
    dispatch(tableStoreActions.setColumns({ pageName, payload: [...arr] }));
  };

  useEffect(() => {
    if (
      (!pageColumns?.length && headColumns?.length && allCheck) ||
      pageColumns?.[0] === null
    ) {
      setTimeout(() => {
        dispatch(
          tableStoreActions.setColumns({
            pageName,
            payload: headColumns.map((item: { id: any }) => {
              if (typeof item.id === "object") {
                return item.id.join("");
              } else {
                return item.id;
              }
            }),
          })
        );
      }, 500);
    }
  }, [pageColumns?.length, headColumns, allCheck]);

  const menuList = useMemo(() => {
    return [
      {
        label: t("active_columns"),
        id: "columns",
        type: "checkbox",
        data: JSON.parse(JSON.stringify(headColumns))?.map(
          (item: { id: string; checked: boolean; title: string }) => {
            let id: any = item.id;
            if (id?.[0] && typeof id === "object") {
              id = id.join("");
            }

            item.title = item.title || item.id;

            if (pageColumns.includes(id)) {
              item.checked = true;
            } else {
              item.checked = false;
            }
            return item;
          }
        ),
      },
    ];
  }, [headColumns?.length, pageColumns?.length]);

  const ExcelData = useMemo(() => {
    const keyOrder: any = [];
    headColumns?.forEach((item: any) => {
      if (pageColumns.includes(item.id)) {
        keyOrder.push(item.id);
      }
    });
    const arrayOfObjects: any = bodyColumns ?? [];

    const reorderObjects = (objects: any, order: any) => {
      if (!objects || !Array.isArray(objects)) {
        return [];
      }

      if (!order || !Array.isArray(order)) {
        return objects;
      }
      const result: any = [];
      objects.forEach((obj: any) => {
        const reorderedObj: any = {};
        order.forEach((key: any) => {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            reorderedObj[key] = obj[key];
          }
        });

        Object.keys(obj).forEach((key) => {
          if (!Object.prototype.hasOwnProperty.call(reorderedObj, key)) {
            reorderedObj[key] = obj[key];
          }
        });

        result.push(reorderedObj);
      });

      return result;
    };

    const reorderedArray = reorderObjects(arrayOfObjects, keyOrder);
    return reorderedArray;
  }, [headColumns.length, bodyColumns.length, pageColumns.length]);

  const handleExcelUploading = useCallback((data: any) => {
    tableActions(data, "read_excel");
  }, []);

  const colorMain = disabled ? "var(--gray)" : "var(--main)";
  if (
    defaultFilters.length === 1 &&
    defaultFilters.includes("actions") &&
    !title
  ) {
    return "";
  }
  return (
    <div className="pb-[45px] bg-white border-b border-[var(--border)] rounded-t-[12px]">
      <div
        className={`h-[45px] absolute w-full left-0 top-0 flex items-center ${
          title ? "desktop:px-3" : ""
        } justify-between`}
      >
        <div className="flex items-center space-x-2 h-full">
          {title ? (
            <h2
              className={`font-medium ${
                disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
              }`}
            >
              {title}
            </h2>
          ) : (
            ""
          )}
          {title ? (
            <div className="w-[1px] h-[60%] bg-[var(--border)]"></div>
          ) : (
            ""
          )}
          <div className="space-x-4 flex items-center">
            {defaultFilters.includes("add") && (
              <Tooltip
                title="Нажмите, чтобы добавить строку"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 15],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  onClick={() => tableActions({}, "modal")}
                  disabled={disabled}
                >
                  <div className="w-[30px] h-[30px] items-center justify-center flex">
                    <PlusIcon fill={colorMain} width={20} />
                  </div>
                  <p
                    className={`text-sm pr-2 ${
                      disabled ? "text-[var(--gray)]" : "text-[var(--black)]"
                    }`}
                  >
                    {t("add")}
                  </p>
                </IconButton>
              </Tooltip>
            )}
            {defaultFilters.includes("sellect_more") && (
              <Tooltip
                title="Нажмите, чтобы выбрать строки"
                arrow
                slotProps={TooltipPosition}
              >
                <IconButton
                  onClick={() => tableActions({}, "sellect_more_active")}
                  disabled={disabled}
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
                      selectedItems.length
                        ? "text-[var(--main)]"
                        : `${
                            disabled
                              ? "text-[var(--gray)]"
                              : "text-[var(--black)]"
                          }`
                    }`}
                  >
                    {t(openSelect ? "close_sellect" : "sellect_columns")}
                  </p>
                </IconButton>
              </Tooltip>
            )}
            {defaultFilters.includes("delete") && (
              <Tooltip
                title="Выберите строки для удаления"
                arrow
                placement="right"
                slotProps={TooltipPosition}
              >
                <div className="relative">
                  <IconButton
                    onClick={() => {
                      if (selectedItems.length) setOpenDelete(true);
                    }}
                    disabled={disabled}
                  >
                    <div className="w-[30px] h-[30px] items-center justify-center flex">
                      <DeleteIcon
                        fill={
                          selectedItems?.length ? "var(--main)" : "var(--gray)"
                        }
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
                  </IconButton>

                  {openDelete && (
                    <div className="absolute top-full shadow-2xl border border-[var(--gray30)] w-[300px] z-[99] bg-white rounded-[8px]">
                      <PopoverDelete
                        closePopover={(status) => {
                          setOpenDelete(false);
                          if (status) tableActions({}, "delete_multiple");
                        }}
                      />
                    </div>
                  )}
                </div>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 h-full">
          {defaultFilters.includes("add") && (
            <Tooltip
              title="Нажмите, чтобы перейти к переводам"
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 15],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                onClick={() => tableActions({}, "translation")}
                disabled={disabled}
              >
                <div
                  className={`h-[30px] w-[30px] flex items-center justify-center`}
                >
                  <svg
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={colorMain}
                  >
                    <path d="M5 15V17C5 18.0544 5.81588 18.9182 6.85074 18.9945L7 19H10V21H7C4.79086 21 3 19.2091 3 17V15H5ZM18 10L22.4 21H20.245L19.044 18H14.954L13.755 21H11.601L16 10H18ZM17 12.8852L15.753 16H18.245L17 12.8852ZM8 2V4H12V11H8V14H6V11H2V4H6V2H8ZM17 3C19.2091 3 21 4.79086 21 7V9H19V7C19 5.89543 18.1046 5 17 5H14V3H17ZM6 6H4V9H6V6ZM10 6H8V9H10V6Z"></path>
                  </svg>
                </div>
              </IconButton>
            </Tooltip>
          )}
          {defaultFilters.includes("filter") && (
            <Tooltip title="Активный фильтр" arrow slotProps={TooltipPosition}>
              <IconButton
                onClick={() => tableActions({}, "sidefilter")}
                disabled={disabled}
              >
                <div
                  className={`h-[30px] w-[30px] flex items-center justify-center`}
                >
                  <Badge badgeContent={sortData?.length} color="secondary">
                    <FilterIcon
                      fill={
                        disabled
                          ? "var(--gray)"
                          : sideFilter
                          ? "var(--primary)"
                          : "var(--main)"
                      }
                    />
                  </Badge>
                </div>
              </IconButton>
            </Tooltip>
          )}

          {defaultFilters.includes("excel_download") && (
            <ExcelDownload
              title={filterParams?.title}
              data={ExcelData}
              allColumns={allColumns}
              disabled={disabled}
              defaultExcelFields={defaultExcelFields}
            />
          )}

          {defaultFilters.includes("excel_upload") && (
            <ExcelReader
              setExcelData={handleExcelUploading}
              disabled={disabled}
            />
          )}

          {defaultFilters.includes("active_menu") && (
            <Tooltip
              title="Активные меню"
              arrow
              placement="top"
              slotProps={TooltipPosition}
            >
              <div className="relative">
                <div
                  onClick={() => (disabled ? {} : setOpen(true))}
                  className="relative"
                >
                  <IconButton disabled={disabled}>
                    <div
                      className={`w-[30px] h-[30px] rounded-[8px] items-center justify-center flex`}
                    >
                      <ListDotIcon
                        fill={
                          disabled
                            ? "var(--gray)"
                            : open
                            ? "var(--primary)"
                            : "var(--main)"
                        }
                      />
                    </div>
                  </IconButton>
                </div>
                {open && (
                  <SettingDropdown
                    setOpen={setOpen}
                    menuList={menuList}
                    allCheck={allCheck}
                    handleFilterSave={handleFilterSave}
                  />
                )}
              </div>
            </Tooltip>
          )}
          {extra}
        </div>
        {open && <Closer handleClose={() => setOpen(false)} classes="z-[91]" />}
      </div>
    </div>
  );
};
