import { useEffect, useMemo, useState } from "react";
import { Closer } from "../../../../UI/Closer";
import { MenuItem } from "./MenuItems";
// import { DeleteElements } from "./Delete";
import { tableStoreActions } from "../../../../../store/table";
import { useDispatch } from "react-redux";
import { Badge, IconButton } from "@mui/material";
import { ListDotIcon } from "../../../../UI/IconGenerator/Svg/Machines";
import ExcelDownload from "../../../../../hooks/useExcelDownload";
import {
  DeleteIcon,
  FilterIcon,
  PlusIcon,
} from "../../../../UI/IconGenerator/Svg";

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
    <div className="pb-[45px] bg-white border-b border-[var(--border)]">
      <div className="h-[45px] absolute w-full left-0 top-0 flex items-center desktop:px-3 justify-between">
        <div className="flex items-center space-x-4 h-full">
          <h2 className="font-medium">{title}</h2>
          <div className="w-[1px] h-[60%] bg-[var(--border)]"></div>
          <div className="space-x-4">
            <IconButton onClick={() => tableActions({}, "modal")}>
              <div className="w-[30px] h-[30px] items-center justify-center flex">
                <PlusIcon fill="var(--main)" width={20} />
              </div>
              <p className="text-sm pr-2 text-black">Добавить</p>
            </IconButton>
            <IconButton onClick={() => tableActions({}, "sidefilter")}>
              <div className="w-[30px] h-[30px] items-center justify-center flex">
                <DeleteIcon fill="var(--main)" width={18} />
              </div>
              <p className="text-sm pr-2 text-black">Удалить</p>
            </IconButton>
          </div>
        </div>

        <div className="flex items-center space-x-2 h-full">
          <IconButton onClick={() => tableActions({}, "sidefilter")}>
            <div
              className={`h-[30px] w-[30px] flex items-center justify-center`}
            >
              <Badge badgeContent={sortData?.length} color="secondary">
                <FilterIcon
                  fill={sideFilter ? "var(--primary)" : "var(--main)"}
                />
              </Badge>
            </div>
          </IconButton>

          <ExcelDownload
            title={filterParams?.title}
            data={ExcelData}
            allColumns={allColumns}
          />

          <div className="relative">
            <div onClick={() => setOpen(true)} className="relative">
              <IconButton>
                <div
                  className={`w-[30px] h-[30px] rounded-[8px] items-center justify-center flex`}
                >
                  <ListDotIcon fill={open ? "var(--primary)" : "var(--main)"} />
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
