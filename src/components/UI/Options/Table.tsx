import { useState } from "react";
import { CloseIcon, SearchIcon } from "../IconGenerator/Svg";
import CLabel from "../../CElements/CLabel";
import CNewTable from "../../CElements/CNewTable";
import { Controller } from "react-hook-form";

interface Props {
  options: any;
  handleSelect: any;
  defaultValue?: any;
  name: string;
  label?: string;
  required?: boolean;
  headColumns: any;
  filterParams: any;
  control: any;
  placeholder?: string;
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
  setFilterParams = () => {},
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleActions = (el: any, _: string) => {
    setOpen(false);
    handleSelect(el);
  };

  return (
    <div className="relative">
      {label && <CLabel title={label} required={required} />}
      <div className="flex items-center w-full border border-[var(--border)] rounded-[8px] h-[35px] p-2">
        <div className="cursor-pointer" onClick={() => setOpen(true)}>
          <SearchIcon width={16} />
        </div>

        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                value={value}
                type="text"
                className="h-full w-full px-2"
                placeholder={placeholder}
                onChange={(e: any) => onChange(e.target.value)}
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
          <div className="fixed left-0 z-[99] top-0 flex items-center justify-center w-full h-full">
            <div className="bg-white relative z-[99] border border-[var(--border)] p-2 shadow-2xl rounded-[8px] w-[1000px]">
              <div className="pb-2 border-b flex justify-between items-center">
                <h3 className="font-medium">Title</h3>
                <div className="cursor-pointer" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </div>
              </div>
              <CNewTable
                headColumns={headColumns}
                bodyColumns={options}
                filterParams={filterParams}
                handleFilterParams={setFilterParams}
                handleActions={handleActions}
                autoHeight="600px"
                clickable={true}
                idForTable={name + "select"}
                disablePagination={true}
              />
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
