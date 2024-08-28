import { useMemo } from "react";
import PStaticsHeader from "./Header";
import RegionsPie from "./Regions";

const StatisticsGender = () => {
  const isLoading = false;
  const data: any = { data: [ { region_name: "Mashina 1" } ] };

  const RegionStatics = useMemo(() => {
    if (!data) return;
    const statics = data?.data;
    return statics.map((val: any) => {
      return {
        ...val,
        all: val.male_users + val.female_users,
        data: [
          { value: val.male_users, label: String(val.male_users) },
          { value: val.female_users, label: String(val.female_users) },
        ],
      };
    });
  }, [data]);

  return (
    <div>
      <PStaticsHeader loading={isLoading} data={RegionStatics} />
      <RegionsPie loading={isLoading} data={RegionStatics} />
    </div>
  );
};

export default StatisticsGender;
