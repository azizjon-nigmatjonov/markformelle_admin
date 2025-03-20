import { useGetQueries } from "../../../../hooks/useGetQueries";
import { useEffect, useState } from "react";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { Dayjs } from "dayjs";
import dayjs from "../../../../utils/deyjsSetUp";
import { DateRange } from "@mui/x-date-pickers-pro/models";

export const DateData = ({
  handleDropdown,
}: {
  handleDropdown: (val?: any) => void;
}) => {
  const { navigateQuery } = usePageRouter();
  const { start, end } = useGetQueries();
  const today = dayjs();
  const [value, setValue]: any = useState([today, today]);
  const [formatedValue, setFormatedValue] = useState([]);

  useEffect(() => {
    if (start && end) {
      const defaultStartDate = dayjs(start);
      const defaultEndDate = dayjs(end);
      setValue([defaultStartDate, defaultEndDate]);
    }
  }, [start, end]);

  const actionHandler = (e: any) => {
    const arr = e?.map((dateObj: any) => {
      const dayjsDate = dayjs(dateObj.$d);
      return dayjsDate.format("DD.MM.YYYY");
    });

    setValue(e);
    setFormatedValue(arr);
  };

  const handleSubmit = () => {
    if (start && end) {
      navigateQuery({
        start: formatedValue[0] ?? "",
        end: formatedValue[1] ?? "",
      });
    }
    handleDropdown(formatedValue);
  };

  return { value, actionHandler, handleSubmit, formatedValue };
};

export const DateLabel = () => {
  const today = dayjs();
  const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
    {
      label: "Вчера",
      getValue: () => {
        return [
          today.startOf("day").subtract(1, "day"),
          today.startOf("day").subtract(1, "day"),
        ];
      },
    },
    {
      label: "На этой неделе",
      getValue: () => {
        return [today.startOf("week"), today.endOf("week")];
      },
    },
    {
      label: "Предыдущая неделя",
      getValue: () => {
        const prevWeek = today.subtract(7, "day");
        return [prevWeek.startOf("week"), prevWeek.endOf("week")];
      },
    },
    {
      label: "Последние 7 дней",
      getValue: () => {
        return [today.subtract(7, "day"), today];
      },
    },
    {
      label: "В этом месяце",
      getValue: () => {
        return [today.startOf("month"), today.endOf("month")];
      },
    },
    {
      label: "Предыдущий месяц",
      getValue: () => {
        const prevMonth = today.startOf("month").subtract(1, "month");
        return [prevMonth, prevMonth.endOf("month")];
      },
    },
    {
      label: "В этом году",
      getValue: () => {
        return [today.startOf("year"), today.endOf("year")];
      },
    },
    {
      label: "Предыдущий год",
      getValue: () => {
        const startOfNextYear = today.startOf("year").subtract(1, "year");
        return [startOfNextYear, startOfNextYear.endOf("year")];
      },
    },
    { label: "Очистить", getValue: () => [null, null] },
  ];

  return { shortcutsItems };
};
