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
import { DotsIcon } from "../../UI/IconGenerator/Svg";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { tableSizeAction } from "../../../store/tableSize/tableSizeSlice";
import { TableDelete } from "./Details/Actions/EditDelete";
import { PopoverDelete } from "./Details/Actions/EditDelete/PopOver";
import { usePermissions } from "../../../hooks/usePermissions";
import CPagination from "./Details/Pagination";
import { TableSettingsData } from "./Logic";
import { TableSort } from "./Details/Sort";
import { tableStoreActions } from "../../../store/table";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
  meta?: {
    totalCount: number;
    pageCount: number;
  };
  headColumns: any[];
  bodyColumns?: object[] | any;
  clickable?: boolean;
  isLoading?: boolean;
  passRouter?: boolean;
  isResizeble?: boolean;
  tableSetting?: boolean;
  disablePagination?: boolean;
  autoHeight?: boolean;
  limitList?: number[];
  handleFilterParams: (val: any) => void;
  filterParams: any;
  handleActions?: (val: any, val2?: any) => void;
  idForTable?: string;
  footer?: any;
}

const CTable = ({
  meta = {
    totalCount: 1,
    pageCount: 1,
  },
  headColumns = [],
  bodyColumns = [],
  clickable = false,
  isLoading = false,
  passRouter = false,
  isResizeble = true,
  idForTable,
  disablePagination = false,
  autoHeight = false,
  limitList = [10, 50, 100, 500],
  filterParams = { page: 1, perPage: 10 },
  handleFilterParams = () => {},
  handleActions = () => {},
  tableSetting = true,
  footer,
}: Props) => {
  const tableSize = useSelector((state: any) => state.tableSize.tableSize);
  const location = useLocation();
  const tableSettings: Record<string, any> = {};
  const [colProperties, setColProperties]: any = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currDelete, setCurrDelete] = useState<any>({});
  const dispatch = useDispatch();
  const { checkPermission } = usePermissions();
  const tableRef: any = useRef(null);
  const { handleCheckbox } = TableSettingsData({
    filterParams,
    handleFilterParams,
  });
  const storedColumns = useSelector((state: any) => state.table.columns);
  const order = useSelector((state: any) => state.table.order);
  const [active, setActive] = useState(false);
  const [newBodyColumns, setNewBodyColumns] = useState([]);
  const [sortData, setSortData]: any = useState({});
  const [reOrder, setReorder] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex]: any = useState(null);
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

  useEffect(() => {
    const arr = [...bodyColumns];
    let result: any = [];
    const { value, id, search }: any = { ...sortData };

    if (value === "search") {
      arr.forEach((obj: any) => {
        const val = obj[id] + "";

        if (val.includes(search)) {
          result.push(obj);
        } else {
        }
      });
      setNewBodyColumns(result);

      return;
    }

    if (value === "up") {
      result = arr?.sort((a: any, b: any) => {
        const aVal = a[id] + "";
        const bVal = b[id] + "";

        if (isNaN(parseFloat(a[id]))) {
          return bVal.localeCompare(aVal);
        }

        return (
          parseInt(bVal.replace(/\D/g, "")) - parseInt(aVal.replace(/\D/g, ""))
        );
      });
    } else if (value === "down") {
      result = arr?.sort((a: any, b: any) => {
        const aVal = a[id] + "";
        const bVal = b[id] + "";

        if (isNaN(parseFloat(a[id]))) {
          return aVal.localeCompare(bVal);
        }

        return (
          parseInt(aVal.replace(/\D/g, "")) - parseInt(bVal.replace(/\D/g, ""))
        );
      });
    }
    setNewBodyColumns(result.length ? result : arr);
  }, [bodyColumns, sortData?.value, sortData?.search]);

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
    const table = document.getElementById("table");
    if (!table) return;
    const newObj: any = { all: 0 };
    const cols = table.querySelectorAll("th");

    [].forEach.call(cols, function (col: any, idx: number) {
      newObj[idx] = col.offsetWidth;
    });

    newObj.all = table.offsetWidth;

    setColProperties(newObj);

    setTimeout(() => {
      setActive(true);
    }, 900);
  }, [active]);

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

  const handleGetHeightFn = () => {
    if (autoHeight) {
      return;
    }
    let res = 0;
    bodySource?.forEach((item: any) => {
      if (item?.ref) res = res + item.ref.offsetHeight;
    });
  };

  const handleBodycolRef = (item: any, e: any) => {
    if (!e) return;
    item.ref = e;

    if (item?.index === bodySource?.length) {
      handleGetHeightFn();
    }
  };

  const handleSortLogic = ({ type, value, id, search }: any) => {
    setSortData({ type, value, id, search });
  };

  const [items, setItems]: any = useState([]);

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
    }
  }, [headColumns, pageOrder]);

  const newHeadColumns: any = useMemo(() => {
    if (!tableSetting) return items;
    const data: any = [];
    const arr = pageColumns ?? [];

    items?.forEach((el: { id: string }) => {
      let id: any = el.id;
      if (id?.[0] && typeof id === "object") {
        id = id.join("");
      }
      if (arr.includes(id)) data.push(el);
    });

    return data;
  }, [pageColumns, pageName, tableSetting, items, draggingIndex]);

  const handleDragStart = (index: any) => {
    setDraggingIndex(index);
    handleFilterParams({ ...filterParams, drag: true });
  };

  const handleDrop = (index: any) => {
    const newItems = newHeadColumns;
    const [movedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(index, 0, movedItem);

    setTimeout(() => {
      setItems(newItems);
      setDraggingIndex(null);
      setHoveredIndex(null);
    }, 0);
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const tableActions = (el: any, status: string) => {
    if (status === "reorder") {
      if (reOrder) {
        dispatch(
          tableStoreActions.setOrder({
            pageName,
            payload: items.map((item: { id: any }) => {
              if (typeof item.id === "object") {
                return item.id.join("");
              } else {
                return item.id;
              }
            }),
          })
        );
      }
      handleFilterParams({ ...filterParams, edit: !reOrder });
      setReorder((prev) => !prev);
      return;
    }
    if (status === "delete_by") {
      setCurrDelete(el);
      return;
    }

    if (status === "multiple") {
      handleCheckbox(el.id);
    }

    if (!checkPermission(status) || el.empty) return;

    handleActions(el, status);
  };

  const searchDebounce = useDebounce((search: string, id: string) => {
    handleSortLogic({
      value: "search",
      id: id,
      search,
    });
  }, 500);

  return (
    <div className="relative h-full">
      <div className="border border-[var(--border)] designed-scroll rounded-[12px] h-full overflow-scroll">
        {tableSetting ? (
          <HeaderSettings
            totalCount={meta.totalCount}
            filterParams={filterParams}
            tableActions={tableActions}
            pageName={pageName}
            headColumns={items}
            reOrder={reOrder}
            pageColumns={pageColumns}
            bodyColumns={newBodyColumns}
            allColumns={bodyColumns}
          />
        ) : (
          ""
        )}
        <div
          id="table"
          className={` ${
            tableSetting ? "border-t border-[var(--border)]" : ""
          }`}
          ref={tableRef}
        >
          <div className={`${footer ? "pb-[50px] overflow-hidden" : ""}`}>
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
                      key={
                        column?.innerId ? column.innerId : index || column?.id
                      }
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
                        draggable={reOrder}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          handleDragOver(index);
                        }}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(index)}
                        className={`w-full flex items-center min-h-[40px] flex-nowrap ${
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
                        }}
                      >
                        {column?.id !== "index" && !column?.remove_sort ? (
                          <div className="w-[20px]"></div>
                        ) : (
                          ""
                        )}
                        <div
                          className={`uppercase w-full`}
                          style={{
                            textAlign:
                              column?.textAlign ||
                              (!column?.filter && "center"),
                            color:
                              sortData?.id === column?.id && !reOrder
                                ? "var(--primary)"
                                : "",
                          }}
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
                        </div>
                        {column?.id !== "index" && !column?.remove_sort ? (
                          <div className="w-[20px]">
                            {!reOrder ? (
                              <TableSort
                                type={column.filter}
                                handleSortLogic={handleSortLogic}
                                colId={column?.id}
                                sortId={sortData?.id}
                              />
                            ) : (
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
                        ) : (
                          ""
                        )}
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
                <TableRow>
                  {newHeadColumns.map((item: any, colIndex: number) => (
                    <CTableCell
                      key={colIndex + item.title + ""}
                      className="relative"
                    >
                      {item.id !== "index" && !item?.remove_sort ? (
                        <div
                          className={`w-full h-full  ${
                            hoveredIndex === colIndex &&
                            hoveredIndex > draggingIndex
                              ? "drag-hovered right"
                              : hoveredIndex === colIndex &&
                                hoveredIndex < draggingIndex
                              ? "drag-hovered left"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            placeholder=""
                            onChange={(e: any) =>
                              searchDebounce(e.target.value, item.id)
                            }
                            className="w-full input-design h-full text-center"
                            style={{ padding: 0 }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </CTableCell>
                  ))}
                </TableRow>
                {bodySource?.length
                  ? bodySource?.map((item: any, rowIndex: any) => (
                      <TableRow
                        key={rowIndex + ""}
                        ref={(e) => handleBodycolRef(item, e)}
                        className={`${
                          clickable && !item.empty && checkPermission("view")
                            ? "clickable"
                            : ""
                        }`}
                      >
                        {newHeadColumns.map((column: any, colIndex: number) => (
                          <CTableCell
                            key={colIndex + ""}
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
                                textAlign: column?.textAlign || "center",
                              }}
                              className={`w-full h-full  ${
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
                                    )
                                      tableActions(item, "view");
                                  }}
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
                              {column?.id === "actions" && !item.empty ? (
                                <div className="relative">
                                  {column?.actions?.length <= 2 ? (
                                    <div>
                                      <TableDelete
                                        element={item}
                                        tableActions={tableActions}
                                        actions={column.actions}
                                        filterParams={filterParams}
                                        checkPermission={checkPermission}
                                      />
                                      {currDelete.index === item.index ? (
                                        <PopoverDelete
                                          closePopover={(status) => {
                                            setCurrDelete({});
                                            if (status)
                                              tableActions(item, status);
                                          }}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  ) : (
                                    <>
                                      <button
                                        className="p-2"
                                        onClick={() =>
                                          setCurrentIndex(rowIndex)
                                        }
                                      >
                                        <DotsIcon />
                                      </button>
                                      <TabbleActions
                                        element={item}
                                        rowIndex={rowIndex}
                                        currentIndex={currentIndex}
                                        setCurrentIndex={setCurrentIndex}
                                        handleActions={tableActions}
                                        actions={column.actions}
                                        checkPermission={checkPermission}
                                      />
                                    </>
                                  )}
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
            {footer && active ? (
              <div
                className="border-t border-[var(--border)] bg-white px-3 fixed bottom-3 rounded-b-lg right-4 w-full flex overflow-hidden whitespace-nowrap"
                style={{ width: colProperties?.all - 5 }}
              >
                <div
                  style={{ width: colProperties?.[0] }}
                  className="px-3 py-1 border-r border-[var(--border)]"
                >
                  <p className="footer_text flex justify-between pr-8">
                    {footer.title} <span>{newBodyColumns.length}</span>
                  </p>
                </div>
                <div
                  style={{ width: colProperties?.[1] }}
                  className="px-3 py-1 border-r border-[var(--border)]"
                >
                  <p className="footer_text">{footer.month}</p>
                </div>
                <div
                  style={{ width: colProperties?.[2] }}
                  className="px-3 py-1"
                >
                  <p className="footer_text">{footer.day}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

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

export default CTable;
