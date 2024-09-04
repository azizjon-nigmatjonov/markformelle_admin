import CCard from "../../../../components/CElements/CCard";
import { ArrowDown, ArrowUp } from "../../../../components/UI/IconGenerator/Svg";

export const AnalyticCard = ({ el = {} }: { el: any }) => {
  return (
    <CCard
      style={{
        minHeight: 0,
      }}
    >
      <div className="flex items-center gap-4 cursor-pointer">
      {el.count > 3 ? <ArrowUp fill={true} /> : <ArrowDown fill={true} />}
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className={`font-semibold text-[28px]`}>{el.count}</p>
            <p className="text-base font-semibold">{el.percent}%</p>
          </div>
          <p className={`text-sm font-normal text-[var(--gray)]`}>{el.title}</p>
        </div>
      </div>
    </CCard>
  );
};
