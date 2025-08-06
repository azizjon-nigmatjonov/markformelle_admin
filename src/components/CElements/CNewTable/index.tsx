import { TableRow } from "@mui/material";
import React, { useRef, useTransition } from "react";
import "./index.scss";

import {
  CTableHeadCell,
  CTableCell,
  CTableWrapper,
  CTableHead,
  CTableRow,
  CTableBody,
} from "./Details";
import { HeaderSettings } from "./Details/TableSettings";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import TabbleActions from "./Details/Actions";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { tableSizeAction } from "../../../store/tableSize/tableSizeSlice";
import { usePermissions } from "../../../hooks/usePermissions";
import CPagination from "./Details/Pagination";
import { TableSettingsData } from "./Logic";
import { tableStoreActions } from "../../../store/table";
import { SideFilter, TableFilter } from "./Details/Filter";
import CheckIcon from "@mui/icons-material/Check";
import { GetCurrentDate } from "../../../utils/getDate";
import usePageRouter from "../../../hooks/useObjectRouter";
import { translateActions } from "../../../store/translation/translate.slice";
import {
  areAllRowsSelectedOnPage,
  toggleRowGroupSelection,
} from "./Logic/helpers";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

// Define base types for better type safety
interface TableMeta {
  totalCount: number;
  pageCount: number;
}

interface TableColumn<T = any> {
  id: string | string[];
  title: string;
  width?: string | number;
  textAlign?: "left" | "center" | "right";
  render?: (value: any, item: T) => React.ReactNode;
  renderHead?: () => React.ReactNode;
  filter?: boolean;
  click?: "custom" | "default";
  freez?: boolean;
  delete?: boolean;
  edit?: boolean;
  view?: boolean;
  sellect_more?: boolean;
  innerId?: string;
}

interface TableRowData {
  id: string | number;
  index: number;
  empty?: boolean;
  checked?: boolean;
  backgroundColor?: string;
  freez?: boolean;
  delete?: boolean;
  edit?: boolean;
  view?: boolean;
  sellect_more?: boolean;
  [key: string]: any;
}

interface FilterParams {
  page: number;
  perPage: number;
  q?: string;
  drag?: boolean;
  edit?: boolean;
  [key: string]: any;
}

interface TableSettings {
  id: string;
  colWidth: number;
  isStiky: boolean;
  colIdx: number;
}

interface Props<T = TableRowData> {
  meta?: TableMeta;
  title?: string;
  headColumns: TableColumn<T>[];
  bodyColumns?: T[];
  clickable?: boolean;
  isLoading?: boolean;
  passRouter?: boolean;
  isResizeble?: boolean;
  disablePagination?: boolean;
  limitList?: number[];
  handleFilterParams: (val: FilterParams) => void;
  filterParams: FilterParams;
  handleActions?: (val: any, val2: string, evt?: any) => void;
  idForTable?: string;
  footer?: React.ReactNode;
  removeSearch?: boolean;
  extra?: React.ReactNode;
  autoHeight?: string;
  defaultFilters?: string[];
  defaultSearch?: Record<string, any>;
  animation?: boolean;
  defaultActions?: string[];
  defaultExcelFields?: string[];
  disabled?: boolean;
  removeHeader?: boolean;
  innerTable?: boolean;
  currentIdRow?: number | number[];
  rightChildren?: (item: T) => React.ReactNode;
}

// Interface for MemoizedTableRow props
interface MemoizedTableRowProps<T extends TableRowData = TableRowData> {
  item: T;
  rowIndex: number;
  newHeadColumns: TableColumn<T>[];
  effect: number[];
  clickable: boolean;
  checkPermission: (permission: string) => boolean;
  currentIndex: number | null;
  selectedItems: number[];
  openSelect: boolean;
  tableActions: (el: T, status: string, evt?: any) => void;
  tableSettings: Record<string, TableSettings[]>;
  pageName: string;
  calculateWidth: (colId: string, index: number) => number;
  hoveredIndex: number | null;
  draggingIndex: number | null;
  getBodyCol: (column: TableColumn<T>, item: T) => React.ReactNode;
  defaultFilters: string[];
  defaultActions: string[];
  sellectedRows?: number[];
  rightChildren?: (val: T) => React.ReactNode;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CNewTable = <T extends TableRowData = TableRowData>({
  meta = {
    totalCount: 0,
    pageCount: 0,
  },
  animation = true,
  innerTable = false,
  title = "",
  extra,
  autoHeight = "",
  headColumns = [],
  bodyColumns = [],
  clickable = true,
  isLoading = false,
  passRouter = false,
  isResizeble = true,
  idForTable,
  disablePagination = false,
  currentIdRow,
  limitList = [50, 100, 200],
  filterParams = {
    page: 1,
    perPage: 50,
  },
  handleFilterParams = () => {},
  handleActions = () => {},
  defaultExcelFields = [],
  disabled = false,
  defaultActions = ["view", "edit", "delete", "is_sellect_more"],
  defaultFilters = [
    "add",
    "delete",
    "excel_download",
    "excel_upload",
    "filter",
    "active_menu",
    "actions",
    "sellect_more",
  ],
  defaultSearch = {},
  rightChildren = () => null,
}: Props<T>) => {
  const { navigateTo } = usePageRouter();
  const tableSize = useSelector((state: any) => state.tableSize.tableSize);
  const location = useLocation();
  const tableSettings: Record<string, any> = {};
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeSort, setActiveSort] = useState(false);
  const dispatch = useDispatch();
  const [effect, setEffect] = useState<number[]>([]);
  const { checkPermission } = usePermissions();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedElements, setSearchedElements] = useState<Record<string, any>>(
    {
      ...defaultSearch,
    }
  );
  const [_, startTransition] = useTransition();
  const { handleCheckbox } = TableSettingsData({
    filterParams,
    handleFilterParams,
  });
  const storedColumns = useSelector((state: any) => state.table.columns);
  const order = useSelector((state: any) => state.table.order);
  const [newBodyColumns, setNewBodyColumns] = useState<T[]>([]);
  const [sortData, setSortData] = useState<
    Array<{ value: string; id: string; search?: string; title?: string }>
  >([]);
  const [reOrder, setReorder] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [searchLoop, setSearchLoop] = useState(false);
  const [sideFilter, setSideFilter] = useState(false);
  const pageName: string = useMemo(() => {
    const strLen =
      location.pathname.split("/")[2].length +
      location.pathname.split("/")[1].length;

    let result = location.pathname.substring(0, strLen + 2);

    if (idForTable) result = result + "/" + idForTable;

    return result;
  }, [location, idForTable]);
  const pageColumns = storedColumns[pageName];
  const pageOrder = order[pageName] ?? [];
  const [newHeadColumns, setNewHeadColumns] = useState<TableColumn<T>[]>([
    ...headColumns,
  ]);
  const [items, setItems] = useState<TableColumn<T>[]>([...headColumns]);
  const [currentFilter, setCurrentFilter] = useState<number | null>(null);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  // const rowRefs = useRef<HTMLTableRowElement[]>([]);
  const [openSelect, setOpenSelect] = useState(false);

  const [bodySource, setBodySource] = useState<T[]>([]);

  const sellectedRows = useMemo(() => {
    return typeof currentIdRow === "number" ? [currentIdRow] : currentIdRow;
  }, [currentIdRow]);

  const SetFiltersFn = (obj: Record<string, any>) => {
    startTransition(() => {
      const newObj: Record<string, any> = JSON.parse(JSON.stringify(obj));
      let str = "";

      for (let key in newObj) {
        if (newObj[key]) {
          str.length
            ? (str += "&" + key + "=" + newObj[key])
            : (str += key + "=" + newObj[key]);
        }
      }

      handleFilterParams({
        ...filterParams,
        page: 1,
        q: str,
      });
    });
  };

  useEffect(() => {
    if (defaultFilters.includes("sidebar_filter")) {
      setSideFilter(true);
    }
  }, [defaultFilters]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(isLoading);
    }, 700);
  }, [isLoading]);
  useEffect(() => {
    if (!bodyColumns?.length) {
      setNewBodyColumns([]);
      return;
    }

    startTransition(() => {
      const arr = JSON.parse(JSON.stringify(bodyColumns));
      let result: any = [];

      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 0);
      sortData?.forEach((sortObj: any) => {
        const { value, id, search }: any = {
          ...sortObj,
        };

        if (value === "sort") {
          if (search === "up") {
            result = arr?.sort((a: any, b: any) => {
              const aVal = a[id] + "";
              const bVal = b[id] + "";

              if (isNaN(parseFloat(a[id]))) {
                return bVal.localeCompare(aVal);
              }

              return (
                parseInt(bVal.replace(/\D/g, "")) -
                parseInt(aVal.replace(/\D/g, ""))
              );
            });
          }

          if (search === "down") {
            result = arr?.sort((a: any, b: any) => {
              const aVal = a[id] + "";
              const bVal = b[id] + "";

              if (isNaN(parseFloat(a[id]))) {
                return aVal.localeCompare(bVal);
              }

              return (
                parseInt(aVal.replace(/\D/g, "")) -
                parseInt(bVal.replace(/\D/g, ""))
              );
            });
          }
        }
      });

      setNewBodyColumns(result.length ? result : arr);

      result = [];
    });
  }, [bodyColumns, activeSort, sortData.length]);

  const SetAnimationEffectTime = (index: number) => {
    setTimeout(() => {
      setEffect((prevEffect) => [...prevEffect, index]);
    }, index * 30);
  };

  useEffect(() => {
    if (!newBodyColumns?.length) {
      setBodySource([]);
      return;
    }
    if (loading) {
      setBodySource([]);
    }
    if (animation && loading) {
      setEffect([]);
    }
    if (!animation) {
      setEffect(newBodyColumns.map((_, index: number) => index));
    }

    const checks = (status: any) => {
      if (status === undefined) return true;

      return status;
    };

    const list =
      newBodyColumns.map((item: any, index?: any) => {
        if (animation) SetAnimationEffectTime(index);

        return {
          ...item,
          is_freez: checks(item?.freez),
          is_delete: checks(item?.delete),
          is_edit: checks(item?.edit),
          is_view: checks(item?.view),
          is_sellect_more: checks(item?.sellect_more),
          index:
            filterParams.page < 2
              ? index + 1
              : index + filterParams.perPage * (filterParams.page - 1) + 1,
        };
      }) ?? [];

    setBodySource(list);
  }, [
    newBodyColumns,
    filterParams.perPage,
    filterParams.page,
    headColumns,
    loading,
    animation,
  ]);

  useEffect(() => {
    if (!isResizeble) return;

    const createResizableTable = function (table: any) {
      if (!table) return;

      const cols = table.querySelectorAll("th");

      [].forEach.call(cols, function (col: any, idx: number) {
        const resizer = document.createElement("span");
        resizer.classList.add("resizer");
        resizer.style.height = `${table.offsetHeight}px`;

        col.appendChild(resizer);

        createResizableColumn(col, resizer, idx);
      });
    };

    const createResizableColumn = function (
      col: any,
      resizer: any,
      idx: number
    ) {
      let x = 0;
      let w = 0;

      const mouseDownHandler = function (e: any) {
        x = e.clientX;

        // Cache the computed style to avoid multiple getComputedStyle calls
        const styles = window.getComputedStyle(col);
        w = parseInt(styles.width, 10);

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        resizer.classList.add("resizing");
      };

      const mouseMoveHandler = function (e: any) {
        const dx = e.clientX - x;
        const colID = col.getAttribute("id");
        const colWidth = w + dx;

        // Use requestAnimationFrame to batch DOM updates and avoid forced reflow
        requestAnimationFrame(() => {
          dispatch(tableSizeAction.setTableSize({ pageName, colID, colWidth }));
          dispatch(
            tableSizeAction.setTableSettings({
              pageName,
              colID,
              colWidth,
              isStiky: "ineffective",
              colIdx: idx - 1,
            })
          );
          col.style.width = `${colWidth}px`;
        });
      };

      const mouseUpHandler = function () {
        resizer.classList.remove("resizing");
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      resizer.addEventListener("mousedown", mouseDownHandler);
    };

    createResizableTable(document.getElementById("resizeMe"));
  }, [bodySource]);

  const calculateWidth = (colId: string, index: number): number => {
    const colIdx = tableSettings?.[pageName]
      ?.filter((item: TableSettings) => item?.isStiky === true)
      ?.findIndex((item: TableSettings) => item?.id === colId);

    if (index === 0) {
      return 0;
    } else if (colIdx === 0) {
      return 0;
    } else if (
      tableSettings?.[pageName]?.filter(
        (item: TableSettings) => item?.isStiky === true
      ).length === 1
    ) {
      return 0;
    } else {
      return (
        tableSettings?.[pageName]
          ?.filter((item: TableSettings) => item?.isStiky === true)
          ?.slice(0, colIdx)
          ?.reduce(
            (acc: number, item: TableSettings) => acc + item?.colWidth,
            0
          ) || 0
      );
    }
  };

  const handleSortLogic = ({
    value,
    id,
    search,
    title,
  }: {
    value: string;
    id: string;
    search?: string;
    title?: string;
  }) => {
    startTransition(() => {
      const DeleteFunction = (type: string) => {
        const arr: Array<{
          value: string;
          id: string;
          search?: string;
          title?: string;
        }> = [];
        sortData.forEach(
          (item: {
            value: string;
            id: string;
            search?: string;
            title?: string;
          }) => {
            if (item.value === type) {
              if (item.id !== id) {
                arr.push(item);
              }
            }
          }
        );
        setSortData(arr);
      };

      if (value === "sort") {
        if (search) {
          if (
            sortData.find(
              (item: { value: string; id: string }) =>
                item.value === "sort" && item.id === id
            )
          ) {
            const newSortData = sortData?.map(
              (item: { value: string; id: string; search?: string }) => {
                if (item.value === "sort" && item.id === id) {
                  item.search = search;
                }
                return {
                  ...item,
                };
              }
            );
            setSortData(newSortData);
          } else {
            setSortData([
              ...sortData,
              {
                search,
                value,
                id,
                title,
              },
            ]);
          }
        } else {
          if (
            sortData.find(
              (item: { value: string; id: string }) =>
                item.value === "sort" && item.id === id
            )
          ) {
            DeleteFunction("sort");
          }
        }
      }

      setActiveSort((prev) => !prev);
    });
  };

  useEffect(() => {
    if (pageOrder?.length && defaultFilters.includes("active_menu")) {
      const arr: any = [];
      const getId = (id: any) => {
        if (typeof id === "object") {
          return id.join("");
        } else {
          return id;
        }
      };
      pageOrder.forEach((element: any) => {
        arr.push(
          headColumns?.find(
            (item: TableColumn<T>) => getId(item.id) === element
          ) ?? {}
        );
      });
      setItems(arr);
    } else {
      setItems(headColumns);
    }
  }, [headColumns, pageOrder, defaultFilters]);

  useEffect(() => {
    const data: any = [];
    if (selectedItems.length) {
      setOpenSelect(true);
    }

    if (!defaultFilters.includes("active_menu")) {
      setNewHeadColumns(items);
      return;
    }

    const arr = pageColumns ?? [];
    items?.forEach((el: TableColumn<T>) => {
      let id: any = el.id;
      if (id?.[0] && typeof id === "object") {
        id = id.join("");
      }
      if (arr.includes(id)) data.push(el);
    });

    if (title) setNewHeadColumns(data);
  }, [pageColumns, items, title, selectedItems]);

  const handleDragStart = (index: any) => {
    setDraggingIndex(index);

    handleFilterParams({
      ...filterParams,
      drag: true,
    });
  };

  const handleDrop = (index: any) => {
    startTransition(() => {
      const newItems = newHeadColumns;
      if (draggingIndex !== null) {
        const [movedItem] = newItems.splice(draggingIndex, 1);
        newItems.splice(index, 0, movedItem);
      }

      setTimeout(() => {
        dispatch(
          tableStoreActions.setOrder({
            pageName,
            payload: newItems.map((item: { id: any }) => item.id),
          })
        );
        setItems(newItems);
        setDraggingIndex(null);
        setHoveredIndex(null);
      }, 100);
    });
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const tableActions = (el: T, status: string, evt?: any) => {
    if (disabled) {
      return;
    }
    if (status === "sidefilter") {
      setSideFilter(!sideFilter);
    }
    if (status === "search") {
      setSearchLoop(!searchLoop);
    }
    if (status === "reorder") {
      handleFilterParams({
        ...filterParams,
        edit: !reOrder,
      });
      setReorder((prev) => !prev);
      return;
    }

    if (status === "sellect_more") {
      startTransition(() => {
        if (selectedItems.includes(el.index - 1)) {
          setSelectedItems(
            selectedItems.filter((item: number) => item !== el.index - 1)
          );
        } else {
          setSelectedItems([...selectedItems, el.index - 1]);
        }
      });
    }

    if (status === "multiple") {
      handleCheckbox(el.id);
    }

    if (status === "translation") {
      const newArr: Array<{
        KEYWORD: string;
        RU: string;
        EN: string;
        UZ: string;
        TU: string;
      }> = [];
      newHeadColumns.forEach((element: TableColumn<T>) => {
        const obj = {
          KEYWORD: element.id as string,
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

    if (status === "sellect_more_active") {
      setOpenSelect((prev: boolean) => !prev);
      setSelectedItems([]);
    }

    if (status === "delete_multiple") {
      const selectedElements = bodySource.filter((item: { index: number }) =>
        selectedItems.includes(item.index - 1)
      );
      setSelectedItems(
        selectedItems.filter(
          (item: number) =>
            !selectedElements.some(
              (el: { index: number }) => el.index - 1 === item
            )
        )
      );
      handleActions(selectedElements, status);

      return;
    }

    if (status === "delete" || status === "delete_multiple") {
      handleSortLogic({ value: "clear", id: "", title: "" });
    }

    handleActions(el, status, evt);
  };

  const addAndRemoveFilter = (obj: { id: string; value: string }) => {
    const { id, value } = obj;
    if (value === "add") {
      setSearchedElements({
        ...searchedElements,
        [id]: "",
      });
    }

    if (value === "close") {
      const obj: Record<string, any> = {
        ...searchedElements,
      };
      delete obj[id];
      setSearchedElements(obj);
    }
  };

  const searchDebounce = (search: string, id: string) => {
    startTransition(() => {
      const obj = {
        ...searchedElements,
      };

      if (search) {
        obj[id] = search;
      } else {
        obj[id] = "";
        SetFiltersFn(obj);
      }

      setSearchedElements(obj);
    });
  };

  const handleKeyDown = (e: KeyboardEvent, search: string, id: string) => {
    if (e.key === "Escape") {
      setSelectedItems([]);
      setOpenSelect(false);
      setSelectedItems([]);
    }

    if (e.key === "Enter" && Object.values(searchedElements)?.length) {
      startTransition(() => {
        const obj = {
          ...searchedElements,
        };

        if (search) {
          obj[id] = search;
        } else {
          obj[id] = "";
        }
        SetFiltersFn(obj);
        setSearchedElements(obj);
      });
    }
  };

  const handleSelectAll = () => {
    startTransition(() => {
      const rowIndexes = bodySource.map(
        (item: { index: number }) => item.index - 1
      );
      setSelectedItems(
        toggleRowGroupSelection({ selectedItems, currentGroup: rowIndexes })
      );
    });
  };

  const getBodyCol = (column: TableColumn<T>, item: T): React.ReactNode => {
    if (item[column?.id as keyof T] == 0) {
      return "0";
    }

    return column.render
      ? Array.isArray(column?.id)
        ? column.render(
            column?.id.map((data: string) => item[data as keyof T]),
            item
          )
        : column.render(item[column?.id as keyof T], item)
      : GetCurrentDate({
          date: item[column?.id as keyof T],
          type: "usually",
        });
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setOpenSelect(false);
        setSelectedItems([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const stepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.focus();
    }
  }, []);

  const MemoizedTableRow = React.memo(function MemoizedTableRow({
    item,
    rowIndex,
    newHeadColumns,
    effect,
    clickable,
    checkPermission,
    currentIndex,
    selectedItems,
    openSelect,
    tableActions,
    tableSettings,
    pageName,
    calculateWidth,
    hoveredIndex,
    draggingIndex,
    getBodyCol,
    defaultFilters,
    defaultActions,
    setCurrentIndex,
    sellectedRows = [],
    rightChildren = () => null,
  }: MemoizedTableRowProps<T>) {
    const [currentAnchor, setCurrentAnchor] = useState<any>(null);

    return (
      <TableRow
        key={item.index}
        className={`group ${innerTable ? "innerTable" : ""} ${
          effect.includes(rowIndex) ? "effect" : ""
        } ${
          clickable && !item.empty && checkPermission("view") ? "clickable" : ""
        } ${currentIndex === rowIndex ? "bg-[var(--primary50)]" : ""} ${
          selectedItems.includes(rowIndex) || item?.checked ? "sellected" : ""
        } ${
          sellectedRows.includes(rowIndex + 1)
            ? "bg-blue-200"
            : item?.backgroundColor
        }`}
        onClick={() => {
          if (openSelect) {
            tableActions(item, "sellect_more");
          }
        }}
        tabIndex={0}
      >
        <td
          className={`h-[35px] border-b border-[var(--border)] w-full ${
            openSelect ? "flex" : "hidden"
          } justify-center items-center`}
          style={{ padding: "0px !importaint" }}
        >
          <div
            onClick={() => tableActions(item, "sellect_more")}
            className={`w-[18px] h-[18px] check rounded-[4px] border flex items-center justify-center cursor-pointer ${
              selectedItems.includes(item.index - 1)
                ? "border-[var(--main)]"
                : "border-[var(--gray)]"
            }`}
          >
            {selectedItems.includes(item.index - 1) && (
              <CheckIcon
                style={{
                  color: "var(--main)",
                  width: 14,
                }}
              />
            )}
          </div>
        </td>
        {newHeadColumns.map((column: any, colIndex: number) => (
          <CTableCell
            key={colIndex + column?.id || colIndex}
            className={`overflow-ellipsis`}
            style={{
              minWidth: "max-content",
              padding: "0px",
              position: tableSettings?.[pageName]?.find(
                (item: any) => item?.id === column?.id
              )?.isStiky
                ? "sticky"
                : "relative",
              left: tableSettings?.[pageName]?.find(
                (item: any) => item?.id === column?.id
              )?.isStiky
                ? calculateWidth(column?.id, colIndex)
                : "0",
              backgroundColor: "var(--bg)",
              zIndex: tableSettings?.[pageName]?.find(
                (item: any) => item?.id === column?.id
              )?.isStiky
                ? "1"
                : "",
            }}
          >
            <div
              style={{
                textAlign: column?.textAlign || "left",
              }}
              className={`relative h-full flex items-center ${
                hoveredIndex === colIndex &&
                draggingIndex !== null &&
                hoveredIndex > draggingIndex
                  ? "drag-hovered right"
                  : hoveredIndex === colIndex &&
                    draggingIndex !== null &&
                    hoveredIndex < draggingIndex
                  ? "drag-hovered left"
                  : ""
              }`}
            >
              {column?.id !== "actions" &&
              !item.empty &&
              getBodyCol(column, item) ? (
                <div
                  onDoubleClick={() => {
                    if (
                      column?.click !== "custom" &&
                      column?.id !== "actions"
                    ) {
                      requestAnimationFrame(() => {
                        tableActions(item, "view");
                      });
                    }
                  }}
                  onContextMenu={(e) => {
                    // if (!rightChildren) return;
                    e.preventDefault();
                    // tableActions(item, "view_single_right_click");
                    setCurrentAnchor(e.target);
                  }}
                  onClick={() => {
                    requestAnimationFrame(() => {
                      tableActions(item, "view_single");
                    });
                  }}
                  className="w-full whitespace-nowrap innerCell"
                >
                  {getBodyCol(column, item)}
                </div>
              ) : (
                ""
              )}
              <BasePopup
                id={Boolean(currentAnchor) ? "simple-popup" : undefined}
                open={Boolean(currentAnchor)}
                anchor={currentAnchor}
                style={{
                  padding: 0,
                  zIndex: 99,
                }}
              >
                <div className="bg-[var(--bg)] rounded-[8px] border border-[var(--border)] overflow-hidden">
                  {rightChildren(item)}
                </div>
              </BasePopup>
              {defaultFilters.includes("actions") && colIndex === 0 ? (
                <div className="relative flex items-center">
                  <TabbleActions
                    element={item}
                    rowIndex={rowIndex}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    handleActions={tableActions}
                    actions={defaultActions}
                    checkPermission={checkPermission}
                    selectedItems={selectedItems}
                  />
                  {currentIndex === rowIndex && (
                    <div
                      className="w-[200vw] h-[200vh] fixed left-[-50vw] top-[-50vw] z-[97]"
                      onClick={() => {
                        setCurrentIndex(null);
                      }}
                    ></div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </CTableCell>
        ))}
      </TableRow>
    );
  });

  return (
    <div
      className={`relative cnewtable w-full rounded-t-[12px] border border-[var(--border)] ${
        disablePagination ? "rounded-b-[12px] overflow-hidden" : "border-b-0"
      } ${innerTable ? "text-[11.5px]" : "text-[13px]"}`}
    >
      {/* {isPending && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-t-[12px]">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[var(--primary)] text-sm">Processing...</span>
          </div>
        </div>
      )} */}
      <div className="h-full ">
        {defaultFilters?.length || title ? (
          <HeaderSettings
            title={title}
            filterParams={filterParams}
            tableActions={tableActions}
            pageName={pageName}
            headColumns={items}
            pageColumns={pageColumns}
            bodyColumns={bodySource}
            allColumns={bodyColumns}
            extra={extra}
            sideFilter={sideFilter}
            sortData={sortData}
            defaultFilters={defaultFilters}
            selectedItems={selectedItems}
            disabled={disabled}
            innerTable={innerTable}
            openSelect={openSelect}
            defaultExcelFields={defaultExcelFields}
          />
        ) : (
          ""
        )}
        <div className="flex">
          <SideFilter
            sideFilter={sideFilter}
            handleClick={() => setSideFilter(false)}
            searchedElements={searchedElements}
            handleSortLogic={handleSortLogic}
            searchDebounce={searchDebounce}
            headColumns={newHeadColumns}
            defaultSearch={defaultSearch}
            handleKeyDown={handleKeyDown}
            addAndRemoveFilter={addAndRemoveFilter}
          />

          <div
            id="table"
            className={`flex h-full w-full overflow-scroll designed-scroll`}
            style={{
              height: autoHeight
                ? autoHeight
                : openHeader
                ? "calc(100vh - 140px)"
                : "calc(100vh - 95px)",
            }}
          >
            <div className="w-full">
              {!loading && !bodySource?.length ? (
                <div className="flex justify-center items-center h-full">
                  <img
                    className="w-[100px]"
                    src="/images/no-data.png"
                    alt="no data"
                  />
                </div>
              ) : (
                <CTableWrapper
                  count={meta.pageCount}
                  totalCount={meta.totalCount}
                  currentLimit={filterParams.perPage}
                  loader={loading}
                  height={0}
                  passRouter={passRouter}
                  filterParams={filterParams}
                  disablePagination={disablePagination}
                  dataLength={newBodyColumns?.length}
                >
                  <CTableHead>
                    <CTableRow>
                      <td
                        className={`sticky bg-[var(--bg)] ${
                          innerTable ? "h-[35px]" : "h-[41px]"
                        } ${
                          openSelect ? "flex" : "hidden"
                        } items-center border-b justify-center duration-100 w-[40px]`}
                      >
                        <div
                          onClick={() => handleSelectAll()}
                          className={`w-[18px] h-[18px] rounded-[4px] border border-[var(--main)] flex items-center justify-center cursor-pointer`}
                        >
                          {areAllRowsSelectedOnPage(
                            selectedItems,
                            bodySource
                          ) && (
                            <CheckIcon
                              style={{
                                fill: "var(--main)",
                                width: 14,
                              }}
                            />
                          )}
                        </div>
                      </td>
                      {newHeadColumns?.map((column: any, index: number) => (
                        <CTableHeadCell
                          id={column?.id}
                          key={column?.innerId || column?.id + index}
                          style={{
                            minWidth: tableSize?.[pageName]?.[column?.id]
                              ? tableSize?.[pageName]?.[column?.id]
                              : column?.width
                              ? column.width
                              : "auto",
                            width: tableSize?.[pageName]?.[column?.id]
                              ? tableSize?.[pageName]?.[column?.id]
                              : column?.width
                              ? column.width
                              : "auto",
                            position: tableSettings?.[pageName]?.find(
                              (item: any) => item?.id === column?.id
                            )?.isStiky
                              ? "sticky"
                              : "relative",
                            left: tableSettings?.[pageName]?.find(
                              (item: any) => item?.id === column?.id
                            )?.isStiky
                              ? calculateWidth(column?.id, index)
                              : "0",
                            backgroundColor: "#fff",
                            zIndex: tableSettings?.[pageName]?.find(
                              (item: any) => item?.id === column?.id
                            )?.isStiky
                              ? "1"
                              : "",
                          }}
                        >
                          <div
                            draggable={true}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => {
                              e.preventDefault();
                              handleDragOver(index);
                            }}
                            onDragLeave={handleDragLeave}
                            onDrop={() => handleDrop(index)}
                            className={`w-full group draggable-header flex items-center ${
                              innerTable ? "min-h-[30px]" : "min-h-[40px]"
                            } px-2 flex-nowrap cursor-move hover:bg-[var(--border)] ${
                              column?.id === "index"
                                ? "justify-center"
                                : "justify-between"
                            } ${
                              draggingIndex === index
                                ? "drag-and-drop dragging"
                                : ""
                            } ${
                              hoveredIndex === index &&
                              draggingIndex !== null &&
                              hoveredIndex > draggingIndex
                                ? "drag-hovered right"
                                : hoveredIndex === index &&
                                  draggingIndex !== null &&
                                  hoveredIndex < draggingIndex
                                ? "drag-hovered left"
                                : ""
                            }`}
                            style={{
                              color: sortData?.find(
                                (item: any) => item.id === column.id
                              )
                                ? "var(--primary)"
                                : draggingIndex === index
                                ? "var(--primary)"
                                : "",
                              textAlign: !column?.filter ? "left" : "left",
                              backgroundColor:
                                currentFilter === index
                                  ? "var(--primary50)"
                                  : "",
                            }}
                          >
                            <div
                              className={`w-full ${
                                innerTable ? "min-h-[35px]" : "min-h-[40px]"
                              } flex items-center whitespace-nowrap ${
                                disabled ? "text-[var(--gray)]" : ""
                              }`}
                            >
                              {column.renderHead
                                ? Array.isArray(column.renderHead)
                                  ? column.renderHead(
                                      column.renderHead.map(
                                        (data: any) => column[data]
                                      )
                                    )
                                  : column.renderHead()
                                : column.id === "index"
                                ? "№"
                                : t(column?.title) === ""
                                ? column?.title
                                : t(column?.title)}{" "}
                            </div>
                            {column.id !== "multiple" &&
                            column.id !== "index" &&
                            !column?.id?.includes("actions") ? (
                              <TableFilter
                                colId={column?.id ?? currentFilter}
                                sortData={sortData}
                                searchedElements={searchedElements}
                                handleSortLogic={(val: any) =>
                                  handleSortLogic({
                                    ...val,
                                    title: column?.title,
                                  })
                                }
                                filter={currentFilter === index}
                                searchDebounce={(val: any, val2: any) =>
                                  searchDebounce(val, val2)
                                }
                                disabled={disabled}
                                handleClick={() => setCurrentFilter(index)}
                                closeFilter={() => setCurrentFilter(null)}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </CTableHeadCell>
                      ))}
                    </CTableRow>
                  </CTableHead>

                  <CTableBody
                    loader={false}
                    columnscount={newHeadColumns?.length}
                    rowsCount={filterParams.perPage}
                    dataLength={newBodyColumns?.length}
                  >
                    {bodySource?.length ? (
                      bodySource?.map((item: any, rowIndex: any) => (
                        <MemoizedTableRow
                          key={item.index}
                          item={item}
                          rightChildren={rightChildren}
                          sellectedRows={sellectedRows}
                          rowIndex={rowIndex}
                          newHeadColumns={newHeadColumns}
                          effect={effect}
                          clickable={clickable}
                          checkPermission={checkPermission}
                          currentIndex={currentIndex}
                          selectedItems={selectedItems}
                          openSelect={openSelect}
                          tableActions={tableActions}
                          tableSettings={tableSettings}
                          pageName={pageName}
                          calculateWidth={calculateWidth}
                          hoveredIndex={hoveredIndex}
                          draggingIndex={draggingIndex}
                          getBodyCol={getBodyCol}
                          defaultFilters={defaultFilters}
                          defaultActions={defaultActions}
                          setCurrentIndex={setCurrentIndex}
                        />
                      ))
                    ) : (
                      <tr></tr>
                    )}
                  </CTableBody>
                </CTableWrapper>
              )}
            </div>
          </div>
        </div>
        {!disablePagination ? (
          <CPagination
            filterParams={filterParams}
            count={meta.pageCount}
            totalCount={meta.totalCount}
            limit={filterParams.perPage}
            limitList={limitList}
            passRouter={passRouter}
            handleFilterParams={handleFilterParams}
            dataLength={newBodyColumns?.length}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CNewTable;
