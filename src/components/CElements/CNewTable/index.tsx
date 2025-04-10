import { TableRow } from "@mui/material";

import {
  CTableHeadCell,
  CTableCell,
  CTableWrapper,
  CTableHead,
  CTableRow,
  CTableBody,
} from "./Details";
import { HeaderSettings } from "./Details/TableSettings";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TabbleActions from "./Details/Actions";
import { DotsVerticalIcon } from "../../UI/IconGenerator/Svg";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { tableSizeAction } from "../../../store/tableSize/tableSizeSlice";
import { usePermissions } from "../../../hooks/usePermissions";
import CPagination from "./Details/Pagination";
import { TableSettingsData } from "./Logic";
import { tableStoreActions } from "../../../store/table";
import useDebounce from "../../../hooks/useDebounce";
import { SideFilter, TableFilter } from "./Details/Filter";
import CheckIcon from "@mui/icons-material/Check";
import { convertToISO, GetCurrentDate } from "../../../utils/getDate";
import usePageRouter from "../../../hooks/useObjectRouter";
import { translateActions } from "../../../store/translation/translate.slice";
interface Props {
  meta?: {
    totalCount: number;
    pageCount: number;
  };
  title?: string;
  headColumns: any[];
  bodyColumns?: object[] | any;
  clickable?: boolean;
  isLoading?: boolean;
  passRouter?: boolean;
  isResizeble?: boolean;
  disablePagination?: boolean;
  limitList?: number[];
  handleFilterParams: (val: any) => void;
  filterParams: any;
  handleActions?: (val: any, val2?: any) => void;
  idForTable?: string;
  footer?: any;
  removeSearch?: boolean;
  extra?: any;
  autoHeight?: string;
  defaultFilters?: any;
  defaultSearch?: any;
  animation?: boolean;
  defaultActions?: string[];
  defaultExcelFields?: string[];
}

const CNewTable = ({
  meta = {
    totalCount: 0,
    pageCount: 0,
  },
  animation = true,
  title = "",
  extra,
  autoHeight = "",
  headColumns = [],
  bodyColumns = [],
  clickable = false,
  isLoading = false,
  passRouter = false,
  isResizeble = true,
  idForTable,
  disablePagination = false,
  limitList = [50, 100, 200],
  filterParams = { page: 1, perPage: 50 },
  handleFilterParams = () => {},
  handleActions = () => {},
  defaultExcelFields = [],
  defaultActions = ["view", "edit", "delete", "is_sellect_more"],
  defaultFilters = [
    "add",
    "delete",
    "excel_download",
    "excel_upload",
    "filter",
    "active_menu",
    "actions",
  ],
  defaultSearch = {},
}: Props) => {
  const { navigateTo } = usePageRouter();
  const tableSize = useSelector((state: any) => state.tableSize.tableSize);
  const location = useLocation();
  const tableSettings: Record<string, any> = {};
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeSort, setActiveSort] = useState(false);
  const dispatch = useDispatch();
  const [effect, setEffect] = useState<string[]>([]);
  const { checkPermission } = usePermissions();
  const tableRef: any = useRef(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchedElements, setSearchedElements] = useState({
    ...defaultSearch,
  });
  const { handleCheckbox } = TableSettingsData({
    filterParams,
    handleFilterParams,
  });
  const storedColumns = useSelector((state: any) => state.table.columns);
  const order = useSelector((state: any) => state.table.order);
  const [newBodyColumns, setNewBodyColumns] = useState([]);
  const [sortData, setSortData]: any = useState([]);
  const [reOrder, setReorder] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex]: any = useState(null);
  const [searchLoop, setSearchLoop] = useState(false);
  const [sideFilter, setSideFilter] = useState(false);
  const pageName: any = useMemo(() => {
    const strLen =
      location.pathname.split("/")[2].length +
      location.pathname.split("/")[1].length;

    let result = location.pathname.substring(0, strLen + 2);

    if (idForTable) result = result + "/" + idForTable;
    return result;
  }, [location, idForTable]);
  const pageColumns = storedColumns[pageName];
  const pageOrder = order[pageName] ?? [];
  const [newHeadColumns, setNewHeadColumns]: any = useState([...headColumns]);
  const [items, setItems]: any = useState([...headColumns]);
  const [currentFilter, setCurrentFilter]: any = useState(null);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const [height, setHeight] = useState(0);

  const SetFiltersFn = (obj: any) => {
    const newObj: any = JSON.parse(JSON.stringify(obj));
    let str = "";

    for (let key in newObj) {
      if (newObj[key]) {
        str.length
          ? (str += "&" + key + "=" + newObj[key])
          : (str += key + "=" + newObj[key]);
      }
    }

    handleFilterParams({ ...filterParams, q: str });
  };

  useEffect(() => {
    if (defaultFilters.includes("sidebar_filter")) {
      setSideFilter(true);
    }
  }, [defaultFilters]);

  useEffect(() => {
    if (!bodyColumns?.length) return;
    const arr = bodyColumns;
    let result: any = [];

    if (!sortData.length) {
      setNewBodyColumns(bodyColumns);
      return;
    }

    sortData?.forEach((sortObj: any) => {
      const { value, id, search }: any = { ...sortObj };

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
  }, [bodyColumns, activeSort, sortData.length]);

  const [bodySource, setBodySource]: any = useState([]);

  useEffect(() => {
    if (!newBodyColumns?.length) {
      return;
    }
    if (isLoading) {
      setBodySource([]);
      setEffect([]);
    }

    const checks = (status: any) => {
      if (status === undefined) return true;
      return status;
    };

    const list =
      newBodyColumns.map((item: any, index?: any) => {
        setTimeout(() => {
          setEffect((prevEffect) => [...prevEffect, index]);
        }, index * 30);
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
              : index + filterParams.perPage * (filterParams.page - 1),
        };
      }) ?? [];
    setBodySource(list);
  }, [
    newBodyColumns,
    filterParams.perPage,
    filterParams.page,
    headColumns,
    isLoading,
  ]);

  useEffect(() => {
    if (!isResizeble) return;

    const createResizableTable = function (table: any) {
      if (!table) return;
      const cols = table.querySelectorAll("th");

      [].forEach.call(cols, function (col: any, idx: number) {
        // Add a resizer element to the column
        const resizer = document.createElement("span");
        resizer.classList.add("resizer");
        // Set the height
        resizer.style.height = `${table.offsetHeight}px`;

        col.appendChild(resizer);
        // setHeadColHeight(col.offset);

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

  const calculateWidth = (colId: any, index: number) => {
    const colIdx = tableSettings?.[pageName]
      ?.filter((item: any) => item?.isStiky === true)
      ?.findIndex((item: any) => item?.id === colId);

    if (index === 0) {
      return 0;
    } else if (colIdx === 0) {
      return 0;
    } else if (
      tableSettings?.[pageName]?.filter((item: any) => item?.isStiky === true)
        .length === 1
    ) {
      return 0;
    } else {
      return tableSettings?.[pageName]
        ?.filter((item: any) => item?.isStiky === true)
        ?.slice(0, colIdx)
        ?.reduce((acc: any, item: any) => acc + item?.colWidth, 0);
    }
  };

  const handleSortLogic = ({ value, id, search, title }: any) => {
    const DeleteFunction = (type: string) => {
      const arr: any = [];
      sortData.forEach((item: any) => {
        if (item.value === type) {
          if (item.id !== id) {
            arr.push(item);
          }
        }
      });
      setSortData(arr);
    };

    if (value === "sort") {
      if (search) {
        if (
          sortData.find((item: any) => item.value === "sort" && item.id === id)
        ) {
          const newSortData = sortData?.map((item: any) => {
            if (item.value === "sort" && item.id === id) {
              item.search = search;
            }

            return { ...item };
          });
          setSortData(newSortData);
        } else {
          setSortData([...sortData, { search, value, id, title }]);
        }
      } else {
        if (
          sortData.find((item: any) => item.value === "sort" && item.id === id)
        ) {
          DeleteFunction("sort");
        }
      }
    }

    if (value === "add") {
      setSearchedElements({ ...searchedElements, [id]: "" });
    }

    if (value === "period") {
      if (search?.length > 1) {
        handleFilterParams({
          ...filterParams,
          DATE_FROM: convertToISO(search[0]),
          DATE_TO: convertToISO(search[1]),
        });
      } else {
        handleFilterParams({
          ...filterParams,
          DATE_FROM: "",
          DATE_TO: "",
        });
      }
    }

    if (value === "clear") {
      setSearchedElements(defaultSearch);
      SetFiltersFn(defaultSearch);
    }

    setActiveSort((prev) => !prev);
  };

  useEffect(() => {
    if (pageOrder?.length) {
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
            (item: { id: string }) => getId(item.id) === element
          ) ?? {}
        );
      });
      setItems(arr);
    } else {
      setItems(headColumns);
      // setNewHeadColumns(headColumns);
    }
  }, [headColumns, pageOrder]);

  useEffect(() => {
    const data: any = [];
    if (selectedItems.length) {
      data.unshift({ id: "multiple", width: 50 });
    }
    const arr = pageColumns ?? [];
    items?.forEach((el: { id: string }) => {
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

    handleFilterParams({ ...filterParams, drag: true });
  };

  const handleDrop = (index: any) => {
    const newItems = newHeadColumns;
    const [movedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);

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
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const tableActions = (el: any, status: string) => {
    if (status === "sidefilter") {
      setSideFilter(!sideFilter);
    }
    if (status === "search") {
      setSearchLoop(!searchLoop);
    }
    if (status === "reorder") {
      handleFilterParams({ ...filterParams, edit: !reOrder });
      setReorder((prev) => !prev);
      return;
    }
    if (status === "delete_by") {
      // return;
    }

    if (status === "sellect_more") {
      if (selectedItems.includes(el.index - 1)) {
        setSelectedItems(
          selectedItems.filter((item: any) => item !== el.index - 1)
        );
      } else {
        setSelectedItems([...selectedItems, el.index - 1]);
      }
    }

    if (status === "multiple") {
      handleCheckbox(el.id);
    }

    if (status === "translation") {
      const newArr: object[] = [];
      newHeadColumns.forEach((element: { id: string }) => {
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

    if (!checkPermission(status) || el.empty) return;

    handleActions(el, status);
  };

  const searchDebounce = useDebounce((search: string, id: any) => {
    const obj: any = { ...searchedElements };
    if (search) {
      obj[id] = search;
    } else {
      if (id in defaultSearch) {
        obj[id] = "";
      } else {
        delete obj[id];
      }
    }

    if (search === "close" || !search) {
      SetFiltersFn(obj);
    }

    setSearchedElements(obj);
  }, 0);

  useEffect(() => {
    const height = window.innerHeight;
    setHeight(height);
  }, [openHeader]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItems([]);
      }

      if (e.key === "Enter") {
        SetFiltersFn(searchedElements);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchedElements]);

  // useEffect(() => {
  //   if (selectedItems.length) {
  //     setNewHeadColumns([{ id: "multiple" }, ...newHeadColumns]);
  //     setBodySource(
  //       bodySource.map((item: any) => {
  //         return {
  //           multiple: "1",
  //           ...item,
  //         };
  //       })
  //     );
  //   }
  // }, [selectedItems.length]);

  return (
    <div className="relative cnewtable w-full rounded-t-[8px]">
      <div className="h-full">
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
            defaultExcelFields={defaultExcelFields}
          />
        ) : (
          ""
        )}
        <div
          id="table"
          className={`flex space-x-4 h-full ${title ? "pl-[10px]" : ""}`}
          ref={tableRef}
          style={{
            height: autoHeight
              ? autoHeight
              : openHeader
              ? height - 140
              : height - 100,
          }}
        >
          <SideFilter
            sideFilter={sideFilter}
            handleClick={() => setSideFilter(false)}
            searchedElements={searchedElements}
            handleSortLogic={handleSortLogic}
            searchDebounce={searchDebounce}
            headColumns={newHeadColumns}
            defaultSearch={defaultSearch}
          />
          <div className={`w-full overflow-x-scroll designed-scroll`}>
            <CTableWrapper
              count={meta.pageCount}
              totalCount={meta.totalCount}
              currentLimit={filterParams.perPage}
              loader={isLoading}
              height={0}
              passRouter={passRouter}
              filterParams={filterParams}
              disablePagination={disablePagination}
              dataLength={newBodyColumns?.length}
            >
              <CTableHead>
                <CTableRow className="">
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
                        className={`w-full group flex items-center min-h-[40px] px-2 flex-nowrap cursor-pointer hover:bg-[var(--primary50)] ${
                          column?.id === "index"
                            ? "justify-center"
                            : "justify-between"
                        } ${draggingIndex === index ? "drag-and-drop" : ""} ${
                          hoveredIndex === index && hoveredIndex > draggingIndex
                            ? "drag-hovered right"
                            : hoveredIndex === index &&
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
                            currentFilter === index ? "var(--primary50)" : "",
                        }}
                      >
                        <div
                          className={`w-full min-h-[40px] flex items-center whitespace-nowrap cursor-move`}
                        >
                          {column.renderHead ? (
                            Array.isArray(column.renderHead) ? (
                              column.renderHead(
                                column.renderHead.map(
                                  (data: any) => column[data]
                                )
                              )
                            ) : (
                              column.renderHead()
                            )
                          ) : column.id === "index" ? (
                            "№"
                          ) : column.id === "multiple" ? (
                            <div></div>
                          ) : t(column?.title) === "" ? (
                            column?.title
                          ) : (
                            t(column?.title)
                          )}
                        </div>

                        {column.id !== "multiple" &&
                        !column.id.includes("actions") ? (
                          <TableFilter
                            colId={column?.id ?? currentFilter}
                            sortData={sortData}
                            searchedElements={searchedElements}
                            handleSortLogic={(val: any) =>
                              handleSortLogic({ ...val, title: column?.title })
                            }
                            filter={currentFilter === index}
                            searchDebounce={(val: any, val2: any) =>
                              searchDebounce(val, val2, column?.title)
                            }
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
                {bodySource?.length
                  ? bodySource?.map((item: any, rowIndex: any) => (
                      <TableRow
                        key={item.index}
                        className={`group ${
                          effect.includes(rowIndex) && animation
                            ? "effect"
                            : !animation
                            ? "without_animation"
                            : ""
                        } ${
                          clickable && !item.empty && checkPermission("view")
                            ? "clickable"
                            : ""
                        } ${
                          currentIndex === rowIndex
                            ? "bg-[var(--primary50)]"
                            : ""
                        }`}
                      >
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
                              backgroundColor: "#fff",
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
                                minWidth:
                                  colIndex === 0 && title ? "160px" : "auto",
                              }}
                              className={`relative h-full flex items-center text-[13px] ${
                                hoveredIndex === colIndex &&
                                hoveredIndex > draggingIndex
                                  ? "drag-hovered right"
                                  : hoveredIndex === colIndex &&
                                    hoveredIndex < draggingIndex
                                  ? "drag-hovered left"
                                  : ""
                              }`}
                            >
                              {selectedItems.length && colIndex === 0 ? (
                                <div
                                  className="mr-2"
                                  onClick={() =>
                                    tableActions(item, "sellect_more")
                                  }
                                >
                                  <div
                                    className={`w-[20px] h-[20px] rounded-full border border-[var(--primary70)] flex items-center justify-center ${
                                      selectedItems.includes(item.index - 1)
                                        ? "bg-[var(--primary70)]"
                                        : ""
                                    }`}
                                  >
                                    <CheckIcon
                                      style={{ color: "white", width: 14 }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {column?.id !== "actions" && !item.empty ? (
                                <div
                                  onDoubleClick={() => {
                                    if (
                                      column?.click !== "custom" &&
                                      column?.id !== "actions"
                                    ) {
                                      tableActions(item, "view");
                                    }
                                  }}
                                  onClick={() => {
                                    if (clickable) {
                                      tableActions(item, "view");
                                    }
                                  }}
                                  className="w-full whitespace-nowrap"
                                >
                                  <>
                                    {column.render
                                      ? Array.isArray(column?.id)
                                        ? column.render(
                                            column?.id.map(
                                              (data: any) => item[data]
                                            )
                                          )
                                        : column.render(item[column?.id], item)
                                      : GetCurrentDate({
                                          date: item[column?.id],
                                          type: "usually",
                                        })}
                                  </>
                                </div>
                              ) : (
                                ""
                              )}
                              {colIndex === 0 &&
                              defaultFilters.includes("actions") ? (
                                <div className="relative flex items-center">
                                  <button
                                    className={`w-[20px] h-full items-center justify-center ml-2`}
                                    onClick={() => setCurrentIndex(rowIndex)}
                                    type="button"
                                  >
                                    <div
                                      className={`group-hover:flex ${
                                        rowIndex === currentIndex
                                          ? "bg-[var(--gray20)] flex"
                                          : "hidden"
                                      }`}
                                    >
                                      <DotsVerticalIcon fill="black" />
                                    </div>
                                  </button>

                                  <TabbleActions
                                    element={item}
                                    rowIndex={rowIndex}
                                    currentIndex={currentIndex}
                                    setCurrentIndex={setCurrentIndex}
                                    handleActions={tableActions}
                                    actions={defaultActions}
                                    checkPermission={checkPermission}
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </CTableCell>
                        ))}
                      </TableRow>
                    ))
                  : ""}
              </CTableBody>
            </CTableWrapper>
          </div>
        </div>
        {/* {!bodyColumns?.length ? (
          <img
            className="w-[120px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            src="/images/no-data.png"
            alt="empty"
          />
        ) : (
          ""
        )} */}
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
