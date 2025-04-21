import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../IconGenerator/Svg";
import CLabel from "../../CElements/CLabel";
import CNewTable from "../../CElements/CNewTable";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
interface Props {
  options: any;
  handleSelect: any;
  defaultValue?: undefined | string | number;
  name: string;
  label?: string;
  required?: boolean;
  headColumns: any;
  filterParams: any;
  control: any;
  placeholder?: string;
  readOnly?: boolean;
  secondName?: string;
  focused?: boolean;
  disabled?: boolean;
  handleSearch?: (val: string) => void;
  setFilterParams: (val: any) => void;
  position?: string;
}

export const SelectOptionsTable = ({
  options = [],
  handleSelect = () => {},
  name = "",
  defaultValue = undefined,
  label = "",
  required = false,
  headColumns = [],
  filterParams = {},
  control,
  placeholder = "",
  readOnly = false,
  secondName = "",
  focused = false,
  disabled,
  position = "left",
  handleSearch = () => {},
  setFilterParams = () => {},
}: Props) => {
  const inputRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData]: any = useState({});
  const [search, setSearch] = useState("");

  const handleActions = (el: any, _: string) => {
    setOpen(false);
    handleSelect(el);
  };

  useEffect(() => {
    if (defaultValue) {
      const selectName = secondName ? secondName : name;

      let obj: any = {};
      for (let i = 0; i < options.length; i++) {
        if (options[i][selectName] === defaultData) {
          obj = options[i];
        }
      }

      if (obj?.[selectName]) {
        setDefaultData(obj);
        handleSelect(obj);
      }
    }
  }, [defaultValue, options, open]);

  useEffect(() => {
    if (!options.length && search) {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
  }, [options, search]);

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (!name) return;
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "F8") {
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      {label && <CLabel title={label} required={required} />}
      <div className={`w-full relative`}>
        <div
          className="cursor-pointer absolute z-[1] left-2 top-1/2 -translate-y-1/2"
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
        >
          <ManageSearchIcon
            style={{ color: disabled ? "var(--gray)" : "var(--black)" }}
          />
        </div>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={`relative ${open ? "z-[99]" : ""}`}>
              <input
                value={value ? value : defaultData[name] || search}
                type="text"
                className={`h-[35px] w-full pl-8 pr-2 rounded-[8px] border ${
                  error?.message
                    ? "border-[var(--error)]"
                    : "border-[var(--border)]"
                }`}
                placeholder={placeholder}
                onChange={(e: any) => {
                  handleSearch(`${name}=${e.target.value}`);
                  onChange(e.target.value);
                  setSearch(e.target.value);
                }}
                disabled={disabled}
                ref={inputRef}
                readOnly={readOnly}
                style={{ borderColor: error?.message ? "var(--error)" : "" }}
              />
            </div>
          )}
        ></Controller>

        {open ? (
          <div
            className={`absolute top-[36px] z-[97] flex items-center justify-center max-w-[800px] ${
              position === "left" ? "left-0" : "right-0"
            }`}
          >
            <div className="bg-white relative z-[99] border border-[var(--border)] p-2 shadow-2xl rounded-[8px]">
              <CNewTable
                headColumns={headColumns}
                bodyColumns={options}
                filterParams={filterParams}
                handleFilterParams={setFilterParams}
                handleActions={handleActions}
                defaultFilters={[]}
                autoHeight="300px"
                doubleClick={false}
                idForTable={name + "select"}
                disablePagination={true}
              />
              <div className="h-[40px] flex items-center">
                <button className="flex items-center space-x-1 text-[var(--main)]">
                  <PlusIcon fill="var(--main)" /> <span>Создать</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {open && (
        <div
          className="fixed top-0 left-0 z-[90] w-full h-full"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};
