import { useState, memo } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FormatCalendar } from "../../../../../../../utils/formatTime";
import usePageRouter from "../../../../../../../hooks/useObjectRouter";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Tools = () => {
  const [date, setDate] = useState(new Date()); // June 2023
  const { navigateQuery, getQueries } = usePageRouter();
  const query = getQueries();

  const handleNextMonth = () => {
    const newDate: any = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    if (newDate.getMonth() === 0) {
      newDate.setFullYear(newDate.getFullYear());
    }
    setDate(newDate);
    navigateQuery({ calendar: FormatCalendar(newDate) });
  };

  const handlePrevMonth = () => {
    const newDate: any = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    if (newDate.getMonth() === 11) {
      newDate.setFullYear(newDate.getFullYear());
    }
    setDate(newDate);
    navigateQuery({ calendar: FormatCalendar(newDate) });
  };

  const monthNames: string[] = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  return (
    <div className="calendar">
      <div className="flex items-center gap-[18px]">
        <p className="text-[var(--error)] font-medium">
          1{" "}
          {
            monthNames[
              query?.calendar
                ? new Date(query?.calendar).getMonth()
                : date.getMonth()
            ]
          }
          , {date.getFullYear()} - 31{" "}
          {
            monthNames[
              query?.calendar
                ? new Date(query?.calendar).getMonth()
                : date.getMonth()
            ]
          }
          , {date.getFullYear()}
        </p>
        <div className="flex items-center gap-2 cursor-pointer">
          <div onClick={()=> handlePrevMonth()}>
            <KeyboardArrowLeftIcon />
          </div>
          <div onClick={() => handleNextMonth()}>
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Tools);