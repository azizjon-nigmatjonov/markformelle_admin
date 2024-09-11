import { useMemo } from "react";
import PStaticsHeader from "./Header";
import RegionsPie from "./Regions";

const StatisticsGender = () => {
  const isLoading = false;
  const data: any = {
    data: [
      {
        name: "A 046",
        working: { value: 49, label: "Работает" },
        no_plan: {
          value: 20,
          label: "Нет плана",
        },
        broken: { value: 5, label: "Сломан" },
        stopped: {
          value: 10,
          label: "Остановлено",
        },
      },
      {
        name: "A 045",
        working: { value: 49, label: "Работает" },
        no_plan: {
          value: 20,
          label: "Нет плана",
        },
        broken: { value: 5, label: "Сломан" },
        stopped: {
          value: 10,
          label: "Остановлено",
        },
      },
      {
        name: "A 044",
        working: { value: 49, label: "Работает" },
        no_plan: {
          value: 20,
          label: "Нет плана",
        },
        broken: { value: 5, label: "Сломан" },
        stopped: {
          value: 10,
          label: "Остановлено",
        },
      },
      {
        name: "A 044",
        working: { value: 49, label: "Работает" },
        no_plan: {
          value: 20,
          label: "Нет плана",
        },
        broken: { value: 5, label: "Сломан" },
        stopped: {
          value: 10,
          label: "Остановлено",
        },
      },
    ],
  };

  const RegionStatics = useMemo(() => {
    if (!data) return;
    const statics = data?.data;
    return statics.map((obj: any) => {
      return {
        ...obj,
        all: obj.male_users + obj.female_users,
        data: [
          {
            value: obj.working.value,
            // label: String(obj.working.label),
          },
          {
            value: obj.no_plan.value,
            // label: String(obj.no_plan.label),
          },
          {
            value: obj.broken.value,
            // label: String(obj.broken.label),
          },
          {
            value: obj.stopped.value,
            // label: String(obj.stopped.label),
          },
        ],
      };
    });
  }, [data]);

  return (
    <div>
      <PStaticsHeader loading={isLoading} />
      <RegionsPie loading={isLoading} data={RegionStatics} />
    </div>
  );
};

export default StatisticsGender;
