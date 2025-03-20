import { useEffect, useRef } from "react";
import "../style.scss";
import {
  ArrowDownOutline,
  CloseIcon,
} from "../../../../components/UI/IconGenerator/Svg";

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

  const formatDate = (input: string) => {
    let cleanValue = input.replace(/\D/g, "");
    let formatted = "";

    if (cleanValue.length <= 2) formatted = cleanValue;
    else if (cleanValue.length <= 4)
      formatted = `${cleanValue.slice(0, 2)}.${cleanValue.slice(2)}`;
    else
      formatted = `${cleanValue.slice(0, 2)}.${cleanValue.slice(
        2,
        4
      )}.${cleanValue.slice(4, 8)}`;

    return formatted;
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = [...value];
    newValue[index] = formatDate(e.target.value);

    if (newValue?.[0]?.length === 10 && index === 0) {
      secondInput.current?.focus();
    }

    if (index === 1 && newValue?.[1]?.length === 0) {
      firstInput.current.focus();
    }

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
    <div className="PeriodTextField z-20 relative">
      <div className="relative h-[35px] rounded-[8px] border border-[var(--border)] flex overflow-hidden items-center">
        <input
          type="text"
          className="w-full px-2"
          value={value[0]}
          onChange={(e) => handleChange(0, e)}
          placeholder="DD.MM.YYYY"
          maxLength={10}
          ref={firstInput}
        />
        <span>-</span>
        <input
          type="text"
          className="w-full px-2"
          value={value[1]}
          onChange={(e) => handleChange(1, e)}
          placeholder="DD.MM.YYYY"
          maxLength={10}
          ref={secondInput}
          onClick={() => {
            if (firstInput.current.value.length !== 10) {
              firstInput.current.focus();
            }
          }}
        />
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
    </div>
  );
};
