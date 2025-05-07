import {
  LocalizationProvider,
  StaticDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import "../style.scss";
import dayjs from "dayjs";
dayjs.locale("uz-latn");
import { DateData, DateLabel } from "../Logic";
import { PeriodTextField } from "../PeriodTextField";

interface Props {
  open: boolean;
  position?: any;
  label?: string;
  setValue: (val: any) => void;
  defaultVal: any;
  setOpen: (val: boolean) => void;
  handlerValue?: (e: any) => void;
  handleDropdown: (val?: any) => void;
}

export const PeriodDateDropDown = ({
  open = false,
  handleDropdown = () => {},
  position,
  setOpen,
  setValue,
  defaultVal,
}: Props) => {
  if (!open) return <></>;
  const { value, actionHandler, handleSubmit, formatedValue } = DateData({
    handleDropdown,
  });
  const { shortcutsItems } = DateLabel();

  return (
    <div
      className={`periodPicker card-shadow flex`}
      style={{ left: position.left, top: position.bottom }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uz-latn">
        <StaticDateRangePicker
          onChange={(e: any) => actionHandler(e)}
          value={value}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            actionBar: { actions: [] },
          }}
          calendars={2}
        />
      </LocalizationProvider>
      <div className="periodPickerFooter">
        <div className="w-[240px] pr-3">
          <PeriodTextField
            setValue={setValue}
            setOpen={setOpen}
            open={open}
            handleDropdown={handleDropdown}
            value={formatedValue?.length ? formatedValue : defaultVal}
          />
        </div>
        <div className="flex space-x-2">
          <button className="cancel-btn" onClick={() => setOpen(false)}>
            Отменить
          </button>
          <button
            className="custom-btn"
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            Выбирать
          </button>
        </div>
      </div>
    </div>
  );
};
