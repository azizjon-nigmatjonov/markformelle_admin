import { PercentCard } from "./PercentCard";
import { useEffect, useState } from "react";
import HealingIcon from '@mui/icons-material/Healing';
import BuildIcon from '@mui/icons-material/Build';

interface IProps {
  data: {
    men: number;
    women: number;
  };
}
const StatisticsCard = ({ data }: IProps) => {
  const setDates = useState<any>([])[1];


  useEffect(() => {
    setDates([{ label: "Haftalik", value: "weekly" }]);
  }, []);
  // let total: number = data?.men + data?.women;

  return (
    <div className="flex items-center divide-x-2 divide-[var(--lineGray)]">
      <PercentCard
        icon={<HealingIcon />}
        text="Ishlagan"
        percent={Number(data?.men)}
      />
      <PercentCard
        icon={<BuildIcon />}
        text="Toxtab qolgan"
        percent={Number(data?.women)}
        color="red"
      />
    </div>
  )
};

export default StatisticsCard;
