import { useEffect, useMemo, useState } from "react";
import { Closer } from "../../../../UI/Closer";
import { MenuItem } from "./MenuItems";
// import { DeleteElements } from "./Delete";
import { tableStoreActions } from "../../../../../store/table";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { ListDotIcon } from "../../../../UI/IconGenerator/Svg/Machines";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ExcelDownload from "../../../../../hooks/useExcelDownload";

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
    <div className="absolute right-0 top-[33px] bg-white border border-[var(--gray20)] card-shadow rounded-[12px] z-[92] min-w-[150px] whitespace-nowrap px-2 py-2">
      <ul className="grid gap-y-5 max-h-[400px] overflow-y-scroll designed-scroll">
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
  filterParams,
  tableActions,
  pageName,
  reOrder,
  bodyColumns = [],
  pageColumns = [],
  headColumns = [],
  allColumns = [],
  extra,
}: {
  filterParams: any;
  totalCount: number | undefined;
  pageName: string;
  headColumns: any;
  pageColumns: any;
  reOrder: boolean;
  bodyColumns: any;
  allColumns: any;
  extra?: any;
  tableActions: (el: any, status: string) => void;
}) => {
  const [open, setOpen] = useState(false);
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
        label: "Активные столбцы",
        id: "columns",
        type: "checkbox",
        data: headColumns?.map((item: { id: string; checked: boolean }) => {
          let id: any = item.id;
          if (id?.[0] && typeof id === "object") {
            id = id.join("");
          }

          if (pageColumns.includes(id)) {
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item;
        }),
      },
    ];
  }, [headColumns, pageColumns?.length]);

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

  return (
    <div className="pb-[40px]">
      <div className="h-[40px] absolute w-full left-0 top-0 flex items-center desktop:px-1 justify-between">
        <div>
          <h2 className="font-bold">
            Общий
            <span> {bodyColumns?.length}</span>
          </h2>
        </div>
        <div className="flex items-center space-x-2 h-full pr-2">
          <ExcelDownload
            title={filterParams?.title}
            data={ExcelData}
            allColumns={allColumns}
          />
          <IconButton onClick={() => tableActions({}, "reorder")}>
            <div
              className={`border h-[30px] w-[30px] rounded-[8px] flex items-center justify-center ${
                reOrder ? "border-[var(--primary)]" : "border-[var(--border)]"
              }`}
            >
              {reOrder ? (
                <SaveIcon style={{ color: "var(--primary)" }} />
              ) : (
                <EditIcon
                  style={{
                    color: "var(--gray)",
                  }}
                />
              )}
            </div>
          </IconButton>

          {/* <DeleteElements
            filterParams={filterParams}
            tableActions={tableActions}
          /> */}

          <div className="relative">
            <div onClick={() => setOpen(true)} className="relative">
              <IconButton>
                <div
                  className={`w-[30px] h-[30px] border rounded-[8px] items-center justify-center flex ${
                    open ? "border-[var(--primary)]" : "border-[var(--border)]"
                  }`}
                >
                  <ListDotIcon fill={open ? "var(--primary)" : "var(--gray)"} />
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
          {extra}
        </div>
        {open && <Closer handleClose={() => setOpen(false)} classes="z-[91]" />}
      </div>
    </div>
  );
};
