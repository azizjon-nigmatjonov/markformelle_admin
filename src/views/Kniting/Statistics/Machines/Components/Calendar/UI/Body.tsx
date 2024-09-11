// import { ColorConstants } from "../../../../constants/website";
import { useState, useEffect } from "react";
import Lighter from "./Lighter";
import cls from "./style.module.scss";

const DAYS = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const Body = ({ list = [] }: { list?: any; month?: any }) => {
  const [calendarEmptyCell, setCalendarEmptyCell] = useState<any>([]);

  const emtyCell: any = () => {
    const startWeekDay = list[0].day;
    const now = new Date(startWeekDay);
    const day = now.getDay();

    if (calendarEmptyCell.length < day) {
      for (let i = 1; i < day; i++) {
        setCalendarEmptyCell((e: any) => [...e, i]);
      }
    }
  };

  useEffect(() => {
    if (list[0].day) {
      emtyCell();
    }
  }, [list]);

  return (
    <div className={`${cls.calendar}`}>
      <div className={cls.header}>
        <div className="grid grid-cols-7">
          {DAYS?.map((day, i: number) => (
            <div className={cls.cell}>
              <span key={i}>{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cls.body}>
        <div className="grid grid-cols-7">
          {calendarEmptyCell.map((_: unknown, i: number) => (
            <div className={cls.cell} key={i} />
          ))}

          {list?.map((element: any, index: number) => (
            <div className={`${cls.cell} group`} key={index}>
              <span className="font-medium">{index + 1}</span>
              <Lighter
                text={`${element.passenger_count}`}
                icon={"var(--primary)"}
              />
              <Lighter
                text={`${element.driver_count}`}
                icon={"var(--green)"}
              />
              <Lighter
                text={`${element.trip_count}`}
                icon={"red"}
              />
              <Lighter
                text={`${element.bookings_count}`}
                icon={"var(--gray20)"}
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
