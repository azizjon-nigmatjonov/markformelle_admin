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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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
  autoHeight?: boolean;
}

const CNewTable = ({
  meta = {
    totalCount: 0,
    pageCount: 0,
  },
  title = "",
  extra,
  headColumns = [],
  bodyColumns = [],
  clickable = true,
  isLoading = false,
  passRouter = false,
  isResizeble = true,
  idForTable,
  disablePagination = false,
  limitList = [10, 20, 30],
  autoHeight = false,
  filterParams = { page: 1, perPage: 10 },
  handleFilterParams = () => {},
  handleActions = () => {},
}: Props) => {
  const tableSize = useSelector((state: any) => state.tableSize.tableSize);
  const location = useLocation();
  const tableSettings: Record<string, any> = {};
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeSort, setActiveSort] = useState(false);
  const dispatch = useDispatch();
  const { checkPermission } = usePermissions();
  const tableRef: any = useRef(null);
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

  useEffect(() => {
    if (!bodyColumns?.length) return;
    const arr = [...bodyColumns];
    let result: any = [];

    sortData?.forEach((sortObj: any) => {
      const { value, id, search }: any = { ...sortObj };
      if (value === "search") {
        arr.forEach((obj: any) => {
          let val = "";
          if (typeof id === "object") {
            for (let key of id) {
              val += obj[key];
            }
          } else {
            val = obj[id] + "";
          }

          val = val.toLocaleLowerCase();

          if (val.includes(search.toLocaleLowerCase())) {
            result.push(obj);
          }
        });
      }

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
  }, [bodyColumns, activeSort, sortData]);

  const bodySource = useMemo(() => {
    if (!newBodyColumns?.length) return [];

    let list = newBodyColumns;

    const checks = (status: any) => {
      if (status === undefined) return true;
      return status;
    };

    return (
      list.map((item: any, index?: any) => ({
        ...item,
        is_freez: checks(item?.freez),
        is_delete: checks(item?.delete),
        is_edit: checks(item?.edit),
        is_view: checks(item?.view),
        is_sellect_more: checks(item?.sellect_more),
        index:
          filterParams?.page > 1
            ? filterParams?.page * filterParams.perPage -
              filterParams.perPage +
              (index + 1)
            : index + 1,
      })) ?? []
    );
  }, [newBodyColumns, filterParams.perPage, filterParams.page, headColumns]);

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

  const handleSortLogic = ({ value, id, search }: any) => {
    setTimeout(() => {
      setActiveSort((prev) => !prev);
    }, 0);

    if (!value) {
      setSortData([]);
      return;
    }

    if (value === "reorder") {
      if (sortData.find((item: any) => item.value === "reorder")) {
        setSortData(sortData?.filter((item: any) => item.value !== "reorder"));
      } else {
        setSortData([...sortData, { value, id }]);
      }
    } else if (value === "search") {
      if (sortData.find((item: any) => item.value === "search")) {
        if (search) {
          const newSortData = sortData?.map((item: any) => {
            if (item.value === "search" && value === "search") {
              item.search = search;
            }
            return { ...item, id };
          });

          setSortData(newSortData);
        } else {
          setSortData(sortData?.filter((item: any) => item.value !== "search"));
        }
      } else {
        if (search) {
          setSortData([...sortData, { search, value, id }]);
        }
      }
    } else if (value === "sort") {
      if (sortData.find((item: any) => item.value === "sort")) {
        const newSortData = sortData?.map((item: any) => {
          if (item.value === "sort") {
            item.search = search;
          }

          return { ...item, id };
        });
        setSortData(newSortData);
      } else {
        setSortData([...sortData, { search, value, id }]);
      }
    }
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
      // const newItems = headColumns.filter((item: any) => item?.id !== "index");
      // newItems.unshift({ id: "index", title: "№" });
      setItems(headColumns);
      setNewHeadColumns(headColumns);
    }
  }, [headColumns, pageOrder]);

  useEffect(() => {
    const data: any = [];
    const arr = pageColumns ?? [];
    items?.forEach((el: { id: string }) => {
      let id: any = el.id;
      if (id?.[0] && typeof id === "object") {
        id = id.join("");
      }
      if (arr.includes(id)) data.push(el);
    });
    if (title) setNewHeadColumns(data);
  }, [pageColumns, items, title]);

  const handleDragStart = (index: any) => {
    setDraggingIndex(index);

    handleFilterParams({ ...filterParams, drag: true });
  };

  // useEffect(() => {
  //   setNewHeadColumns(headColumns);
  // }, [headColumns]);

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
      handleSortLogic({ value: "reorder" });
      return;
    }
    if (status === "delete_by") {
      return;
    }

    if (status === "multiple") {
      handleCheckbox(el.id);
    }

    if (!checkPermission(status) || el.empty) return;

    handleActions(el, status);
  };

  const searchDebounce = useDebounce((search: string, id: any) => {
    handleSortLogic({
      value: "search",
      id: id,
      search,
    });
  }, 0);

  return (
    <div className="relative cnewtable w-full h-full">
      <div className={`rounded-[4px] h-full`}>
        {title && (
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
          />
        )}
        <div
          id="table"
          className={`border-t border-[var(--border)] flex space-x-8 h-full ${
            title ? "pl-[10px]" : ""
          }`}
          style={{ minHeight: autoHeight ? "300px" : "500px" }}
          ref={tableRef}
        >
          <SideFilter
            sideFilter={sideFilter}
            handleClick={() => setSideFilter(false)}
            sortData={sortData}
            handleSortLogic={handleSortLogic}
            searchDebounce={searchDebounce}
            tableActions={tableActions}
          />
          <div
            className={`w-full overflow-x-scroll designed-scroll ${
              title ? "pt-5" : ""
            }`}
          >
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
                      key={column?.innerId || column?.id || index}
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
                          color:
                            draggingIndex === index ? "var(--primary)" : "",
                          textAlign: !column?.filter ? "left" : "left",
                          backgroundColor:
                            currentFilter === index ? "var(--primary50)" : "",
                        }}
                      >
                        <div
                          className={`w-full min-h-[40px] flex items-center whitespace-nowrap`}
                          onClick={() => setCurrentFilter(index)}
                          style={{ textTransform: "lowercase" }}
                        >
                          {column.renderHead
                            ? Array.isArray(column.renderHead)
                              ? column.renderHead(
                                  column.renderHead.map(
                                    (data: any) => column[data]
                                  )
                                )
                              : column.renderHead()
                            : column?.id === "index"
                            ? "№"
                            : t(column?.title)}
                          <div className="ml-2">
                            {reOrder && (
                              <DragIndicatorIcon
                                style={{
                                  color:
                                    draggingIndex === index
                                      ? "var(--primary)"
                                      : "var(--gray)",
                                  marginRight: 5,
                                }}
                              />
                            )}
                          </div>
                        </div>

                        <TableFilter
                          colId={column?.id ?? currentFilter}
                          sortData={sortData}
                          handleSortLogic={handleSortLogic}
                          filter={currentFilter === index}
                          searchDebounce={searchDebounce}
                          tableActions={tableActions}
                          closeFilter={() => setCurrentFilter(null)}
                        />
                      </div>
                    </CTableHeadCell>
                  ))}
                </CTableRow>
              </CTableHead>

              <CTableBody
                loader={isLoading}
                columnscount={newHeadColumns?.length}
                rowsCount={filterParams.perPage}
                dataLength={bodySource?.length}
              >
                {bodySource?.length
                  ? bodySource?.map((item: any, rowIndex: any) => (
                      <TableRow
                        key={bodySource.length + rowIndex}
                        className={`group ${
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
                            key={colIndex + column?.id || 12}
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
                              {column?.id !== "actions" && !item.empty ? (
                                <div
                                  onClick={() => {
                                    if (
                                      clickable &&
                                      column?.click !== "custom" &&
                                      column?.id !== "actions"
                                    ) {
                                      tableActions(item, "view");
                                    }
                                  }}
                                  className="w-full"
                                >
                                  {column?.permission ? (
                                    <>
                                      {checkPermission(column.permission) && (
                                        <>
                                          {column.render
                                            ? Array.isArray(column?.id)
                                              ? column.render(
                                                  column?.id.map(
                                                    (data: any) => item[data]
                                                  )
                                                )
                                              : column.render(
                                                  item[column?.id],
                                                  item
                                                )
                                            : item[column?.id]}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {column.render
                                        ? Array.isArray(column?.id)
                                          ? column.render(
                                              column?.id.map(
                                                (data: any) => item[data]
                                              )
                                            )
                                          : column.render(
                                              item[column?.id],
                                              item
                                            )
                                        : item[column?.id]}
                                    </>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              {colIndex === 0 ? (
                                <>
                                  <button
                                    className={`w-[20px] h-full items-center justify-center ml-2`}
                                    onClick={() => setCurrentIndex(rowIndex)}
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
                                    actions={[
                                      "view",
                                      "edit",
                                      "delete",
                                      "is_sellect_more",
                                    ]}
                                    checkPermission={checkPermission}
                                  />
                                </>
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
        {!bodyColumns?.length ? (
          <img
            className="w-[120px] mx-auto"
            src="/images/no-data.png"
            alt="empty"
          />
        ) : (
          ""
        )}
        {newBodyColumns?.length && !isLoading && !disablePagination ? (
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
