import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import CNewTable from "../CNewTable";

export const CSelectList = ({
  options = [],
  handleSelect = () => {},
  customId = "",
  customLabel = "",
  defaultValue = "",
}: {
  options: any;
  handleSelect: any;
  customId?: string;
  customLabel?: string;
  defaultValue?: any;
}) => {
  const [value, setValue]: any = useState({});
  const [headColumns, setHeadColumns] = useState([]);
  const [open, setOpen] = useState(false);

  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 10,
  });

  const handleActions = (element: any, status: any) => {
    if (status === "view") {
      handleSelect(element);
      setValue({ id: element[customId], label: element[customLabel] });
    }
  };

  useEffect(() => {
    if (defaultValue || defaultValue == 0) {
      setValue(options?.find((item: any) => item.value == defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = options ?? [];

    const obj = { ...arr?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setTimeout(() => {
      setHeadColumns(newColumns);
    }, 0);
  }, [options]);

  return (
    <div className="relative">
      <input
        type="text"
        onFocus={() => setOpen(true)}
        placeholder="Выбирать"
        className="border w-full h-[35px] rounded-[4px] p-2"
        value={value?.label}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      {open && (
        <div className="absolute top-full left-0 w-[200%] bg-white rounded-[4px] shadow-md z-[99] border border-[var(--border)] min-h-[300px]">
          <CNewTable
            headColumns={headColumns}
            bodyColumns={options}
            handleActions={handleActions}
            isLoading={false}
            autoHeight={true}
            filterParams={filterParams}
            disablePagination={true}
            handleFilterParams={setFilterParams}
          />
        </div>
      )}
      {open && (
        <div
          className="fixed left-0 top-0 w-full h-full z-[98]"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};
