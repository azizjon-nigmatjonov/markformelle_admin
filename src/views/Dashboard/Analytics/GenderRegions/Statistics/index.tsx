import { PercentCard } from "./PercentCard";
import HealingIcon from "@mui/icons-material/Healing";
import BuildIcon from "@mui/icons-material/Build";

interface IProps {
  data: any
}
const StatisticsCard = ({ data }: IProps) => {
  return (
    <div className="flex items-center divide-x-2 divide-[var(--lineGray)]">
      <PercentCard
        icon={<HealingIcon />}
        text="Работает"
        percent={data.working}
        color="var(--success)"
      />
       <PercentCard
        icon={<BuildIcon />}
        text="Нет плана"
        percent={data.no_plan}
        color="var(--primary70)"
      />
       <PercentCard
        icon={<BuildIcon />}
        text="Сломан"
        percent={data.stopped}
        color="var(--gray)"
      />
      <PercentCard
        icon={<BuildIcon />}
        text="Остановлено"
        percent={data.stopped}
        color="var(--error)"
      />
    </div>
  );
};

export default StatisticsCard;
