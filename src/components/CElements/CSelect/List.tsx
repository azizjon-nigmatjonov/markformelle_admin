import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export const CSelectList = ({
  headColumns = [],
  options = [],
  handleSelect = () => {},
  customId = "",
  customLabel = "",
  defaultValue = "",
}: {
  headColumns: any;
  options: any;
  handleSelect: any;
  customId?: string;
  customLabel?: string;
  defaultValue?: any;
}) => {
  const [value, setValue]: any = useState({});
  const [open, setOpen] = useState(false);

  const handleActions = (element: any, status: any) => {
    if (status === "view") {
      handleSelect(element);
      setValue({ id: element[customId], label: element[customLabel] });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (defaultValue || defaultValue == 0) {
      const obj =
        options?.find((item: any) => item[customId] == defaultValue) ?? {};
      setValue({ id: obj[customId], label: obj[customLabel] });
    }
  }, [defaultValue]);

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          onFocus={() => setOpen(true)}
          placeholder="Выбирать"
          className="border w-full h-[35px] rounded-[4px] p-2"
          value={value?.label}
        />
      </div>
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      {open && (
        <div className="absolute top-full left-0 min-w-[100%] bg-white rounded-[4px] shadow-md z-[99] border border-[var(--border)] min-h-[250px] max-h-[250px] overflow-y-auto designed-scroll">
          {options?.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex items-center border-b border-[var(--border)] cursor-pointer h-[30px] text-sm w-full hover:bg-[var(--primary50)] ${
                value?.id === item?.[customId] ? "bg-[var(--primary50)]" : ""
              }`}
            >
              {headColumns?.map((head: any) => (
                <div
                  key={head.id}
                  className={`w-full px-2 h-full flex items-center`}
                  onClick={() => handleActions(item, "view")}
                >
                  <p>{item[head.id]}</p>
                </div>
              ))}
            </div>
          ))}
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
