import { useEffect, useMemo, useState } from "react";
import { Closer } from "../../../../UI/Closer";
import { MenuItem } from "./MenuItems";
import { DeleteElements } from "./Delete";
import { tableStoreActions } from "../../../../../store/table";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { ListDotIcon } from "../../../../UI/IconGenerator/Svg/Machines";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
const SettingDropdown = ({
  menuList = [],
  handleFilterSave,
}: {
  menuList: any;
  setOpen: (val: boolean) => void;
  handleFilterSave: (val: any) => void;
}) => {
  return (
    <div className="absolute right-4 top-[33px] bg-white border border-[var(--gray20)] card-shadow rounded-[12px] z-[92] min-w-[150px] whitespace-nowrap px-2 py-2">
      <ul className="grid gap-y-5 max-h-[400px] overflow-y-scroll remove-scroll designed-scroll">
        {menuList.map((item: {}, index: number) => (
          <MenuItem
            key={index}
            element={item}
            handleFilterSave={handleFilterSave}
          />
        ))}
      </ul>
    </div>
  );
};

export const HeaderSettings = ({
  len = 0,
  filterParams,
  tableActions,
  pageName,
  reOrder,
  pageColumns = [],
  headColumns = [],
}: {
  filterParams: any;
  totalCount: number | undefined;
  len: number;
  pageName: string;
  headColumns: any;
  pageColumns: any;
  reOrder: boolean;
  tableActions: (el: any, status: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilterSave = (id: any) => {
    let arr: any = pageColumns;

    if (id?.[0] && typeof id === "object") {
      id = id.join("");
    }

    if (arr.includes(id)) {
      arr = arr.filter((item: string) => item !== id);
    } else {
      arr = [...arr, id];
    }

    dispatch(tableStoreActions.setColumns({ pageName, payload: arr }));
  };

  useEffect(() => {
    if (!pageColumns?.length && headColumns?.length) {
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
  }, [pageColumns, headColumns]);

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
  }, [headColumns, pageColumns]);

  return (
    <div className="pb-[40px]">
      <div className="h-[40px] absolute w-full left-0 top-0 flex items-center px-1 desktop:px-3 justify-between">
        <div>
          <h2 className="font-bold">
            Общий
            <span> {len}</span>
          </h2>
        </div>
        <div className="flex items-center space-x-1 h-full pr-2">
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

          <DeleteElements
            filterParams={filterParams}
            tableActions={tableActions}
          />

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
            {open && (
              <SettingDropdown
                setOpen={setOpen}
                menuList={menuList}
                handleFilterSave={handleFilterSave}
              />
            )}
          </div>
        </div>
        {open && <Closer handleClose={() => setOpen(false)} classes="z-[91]" />}
      </div>
    </div>
  );
};
