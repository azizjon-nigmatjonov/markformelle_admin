import { useEffect, useRef } from "react";
import "../style.scss";
import {
  ArrowDownOutline,
  CloseIcon,
} from "../../../../components/UI/IconGenerator/Svg";
// import { MaskInputUI } from "../../../HFElements/HFInputMask";
import InputMask from "react-input-mask";

interface Props {
  open: boolean;
  defaultValue?: any;
  value: any;
  setValue: (val: any) => void;
  setOpen: (val: boolean) => void;
  handleDropdown: (val?: any) => void;
}

export const PeriodTextField = ({
  open = false,
  value,
  handleDropdown,
  setOpen,
  setValue,
}: Props) => {
  const firstInput: any = useRef(null);
  const secondInput: any = useRef(null);

  const handleChange = (index: number, e: any) => {
    const newValue = [...value];
    newValue[index] = e;

    // if (newValue?.[0]?.length === 10 && index === 0) {
    //   secondInput?.current?.focus();
    // }

    // if (index === 1 && newValue?.[1]?.length === 0) {
    //   firstInput.current.focus();
    // }
    // console.log("newValue", newValue);

    setValue(newValue);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        value?.[0]?.length === 10 &&
        value?.[1]?.length === 10
      ) {
        handleDropdown(value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [value]);

  return (
    <div className="z-20 relative flex items-center h-[30px] border border-[var(--border)] rounded-[8px] w-full px-2">
      <div className="relative h-[30px] space-x-2 flex items-center w-full">
        <InputMask
          mask="99.99.9999"
          value={value[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          placeholder="Start Date"
          className="date-input"
          style={{ width: "80px" }}
        />
        <span> - </span>
        <InputMask
          mask="99.99.9999"
          value={value[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          placeholder="End Date"
          className="date-input"
          style={{ width: "80px" }}
        />
      </div>
      <div className="h-full">
        {value?.[0]?.length === 10 && value?.[1]?.length === 10 ? (
          <div
            className={`flex items-center justify-center cursor-pointer w-[30px] h-full ${
              open ? "rotate-[180deg]" : ""
            }`}
            onClick={() => {
              setValue([]);
              handleDropdown([]);
              firstInput.current.value = "";
              secondInput.current.value = "";
            }}
          >
            <CloseIcon />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center cursor-pointer w-[30px] h-full ${
              open ? "rotate-[180deg]" : ""
            }`}
            onClick={() => setOpen(true)}
          >
            <ArrowDownOutline />
          </div>
        )}
      </div>
    </div>
  );
};
