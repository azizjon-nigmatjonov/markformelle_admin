import { useEffect, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormatCalendar } from "../../../utils/formatTime";
import dayjs from "dayjs";
import "./style.scss";

interface Props {
  value?: any;
  disabled?: boolean;
  field?: any;
  defaultValue?: any;
  format?: string;
}

const DatePickerDetail = ({
  disabled,
  field,
  defaultValue,
  format = "DD.MM.YYYY hh:mm",
}: Props) => {
  const datePickerRef = useRef<any>();
  const [value, setValue] = useState<any>("");

  const handleChange = (e: any) => {
    setValue(e);
    if (field) field.onChange(FormatCalendar(e?.$d));
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(dayjs(defaultValue));
      if (field) field.onChange(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <DatePicker
        ref={datePickerRef}
        value={value}
        readOnly={disabled}
        defaultValue={defaultValue ? dayjs(defaultValue) : ""}
        onChange={(evt) => handleChange(evt)}
        onClose={() => {
          document.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              datePickerRef.current.closeCalendar();
            }
          });
        }}
        views={["day", "month", "year"]}
        className="datePicker"
        format={format}
      />
    </div>
  );
};

export default DatePickerDetail;
