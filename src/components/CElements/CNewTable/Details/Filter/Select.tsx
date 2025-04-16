import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import "./style.scss";
import { PlusIcon } from "../../../../UI/IconGenerator/Svg";
import { useTranslationHook } from "../../../../../hooks/useTranslation";

interface Props {
  handleClick: (val: any) => void;
  options: any;
}

export const SelectFilter = ({
  handleClick = () => {},
  options = [],
}: Props) => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue]: any = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div id="selectFilter" className="relative">
      <Select
        open={open}
        value={currentValue}
        disabled={false}
        inputProps={{
          "aria-label": "Without label",
        }}
        onChange={handleChange}
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.map(({ value, label }: { value: any; label: string }) => (
          <MenuItem
            onClick={() => handleClick({ value, label })}
            key={value}
            value={value}
          >
            {t(label)}
          </MenuItem>
        ))}
      </Select>

      <p
        onClick={() => setOpen(true)}
        className="text-[12px] text-[var(--main)] absolute left-0 top-0 flex items-center justify-center text-sm z-[1] cursor-pointer bg-white h-full w-full"
      >
        <PlusIcon fill="var(--main)" />
        Фильтр
      </p>
    </div>
  );
};
