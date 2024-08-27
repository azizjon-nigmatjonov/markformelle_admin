import CCard from "../../../../components/CElements/CCard";

export const AnalyticCard = ({ el = {} }: { el: any }) => {
  return (
    <CCard
      style={{
        minHeight: 0,
      }}
    >
      <div className="flex items-center gap-4 cursor-pointer">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className={`font-semibold text-[28px]`}>{el.count} ta</p>
            <p className="text-base font-semibold">{el.percent}%</p>
          </div>
          <p className={`text-sm font-normal text-[var(--gray)]`}>{el.title}</p>
        </div>
      </div>
    </CCard>
  );
};
