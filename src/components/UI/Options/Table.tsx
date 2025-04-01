import { useEffect, useRef, useState } from "react";
import { PlusIcon, SearchIcon } from "../IconGenerator/Svg";
import CLabel from "../../CElements/CLabel";
import CNewTable from "../../CElements/CNewTable";
import { Controller } from "react-hook-form";

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
  handleSearch?: (val: string) => void;
  setFilterParams: (val: any) => void;
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

      const obj =
        options?.find(
          (item: Partial<any>) => item[selectName] === defaultValue
        ) ?? {};

      if (obj?.[selectName]) {
        setDefaultData(obj);
        handleSelect(obj);
      }
    }
  }, [defaultValue, options]);

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

  return (
    <div className="relative">
      {label && <CLabel title={label} required={required} />}
      <div className="flex items-center w-full border border-[var(--border)] relative rounded-[8px] h-[35px] p-2">
        <div className="cursor-pointer" onClick={() => setOpen(true)}>
          <SearchIcon width={16} />
        </div>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={`relative ${open ? "z-[91]" : ""}`}>
              <input
                value={value ? value : defaultData[name] || search}
                type="text"
                className="h-full w-full px-2"
                placeholder={placeholder}
                onChange={(e: any) => {
                  handleSearch(`${name}=${e.target.value}`);
                  onChange(e.target.value);
                  setSearch(e.target.value);
                }}
                ref={inputRef}
                readOnly={readOnly}
                onClick={() => setOpen(true)}
              />
              {error?.message ? (
                <p className="text-[var(--error)]">{error.message}</p>
              ) : (
                ""
              )}
            </div>
          )}
        ></Controller>

        {open ? (
          <div className="absolute left-0 top-full z-[99] flex items-center justify-center max-w-[800px]">
            <div className="bg-white relative z-[99] border border-[var(--border)] p-2 shadow-2xl rounded-[8px]">
              <CNewTable
                headColumns={headColumns}
                bodyColumns={options}
                filterParams={filterParams}
                handleFilterParams={setFilterParams}
                handleActions={handleActions}
                autoHeight="300px"
                clickable={true}
                idForTable={name + "select"}
                disablePagination={true}
              />
              <div>
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
