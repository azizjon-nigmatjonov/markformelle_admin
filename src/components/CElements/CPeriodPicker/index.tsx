import { useCallback, useRef, useState } from "react";
import CLabel from "../CLabel";
import { PeriodTextField } from "./PeriodTextField";
import { PeriodDateDropDown } from "./PeriodDateDropDown";
import { Closer } from "../../../components/UI/Closer";

interface Props {
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  handleValue: (val: any) => void;
}

export const CPeriodPicker = ({
  label = "",
  handleValue = () => {},
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue]: any = useState([]);

  const handleDropdown = useCallback((val?: any) => {
    setValue(val ?? []);
    handleValue(val ?? []);
  }, []);
  const datePickerRef = useRef<any>();

  return (
    <div className="flex flex-col relative w-full" ref={datePickerRef}>
      {label && <CLabel title={label} />}
      <PeriodTextField
        value={value}
        open={open}
        handleDropdown={handleDropdown}
        setOpen={setOpen}
        setValue={setValue}
      />
      <PeriodDateDropDown
        open={open}
        handleDropdown={handleDropdown}
        label={label}
        setOpen={setOpen}
        defaultVal={value}
        setValue={setValue}
        position={datePickerRef?.current?.getBoundingClientRect()}
      />
      {open && <Closer handleClose={() => setOpen(false)} />}
    </div>
  );
};
