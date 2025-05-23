import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CLabel from "../CLabel";
import { useEffect, useState } from "react";

interface Props {
  all?: boolean;
  id?: string;
  options: any;
  label?: string;
  handlerValue?: (val: any) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  classes?: string;
}

const CSelect = ({
  placeholder = "",
  value = "",
  options = [],
  label = "",
  handlerValue,
  disabled,
  classes = "bg-white",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue]: any = useState("");

  const handleClick = (val: any) => {
    setCurrentValue(val?.value);
    handlerValue!(val);
  };

  useEffect(() => {
    if (value || value == 0) {
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col w-full">
      {label && <CLabel title={label} />}
      <div className="relative">
        <div id="cselect" className={`${classes} `}>
          <div className="relative z-[2]">
            <Select
              open={open}
              value={currentValue}
              disabled={disabled}
              defaultValue={options?.[0]?.value ?? ""}
              inputProps={{
                "aria-label": "Without label",
              }}
              onClick={() => !disabled && setOpen((prev) => !prev)}
            >
              {options.map(
                ({ value, label }: { value: any; label: string }) => (
                  <MenuItem
                    onClick={() => handleClick({ value, label })}
                    key={value}
                    value={value}
                  >
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </div>
          {/* <div
            className={`absolute right-12px top-1/2 -translate-y-1/2 ${
              open ? "rotate-[180deg]" : ""
            }`}
          >
            <ArrowDownOutline width={15} />
          </div> */}
        </div>
        {placeholder &&
        !currentValue &&
        currentValue !== 0 &&
        currentValue !== false ? (
          <p className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray60)]">
            {placeholder}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CSelect;
