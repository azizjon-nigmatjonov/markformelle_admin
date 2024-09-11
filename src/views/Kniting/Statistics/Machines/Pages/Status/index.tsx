import CCard from "../../../../../../components/CElements/CCard";
import { CPeriodPicker } from "../../../../../../components/CElements/CPeriodPicker";
import Calendar from "../../Components/Calendar";
import { AnalyticCard } from "../../Components/Card";
import { MachineList } from "./Logic";
import { StatusPieChart } from "./Components/StatusPieChart";

const cardData = [
  {
    count: 22,
    percent: 90,
    title: "Работает",
  },
  {
    count: 5,
    percent: 60,
    title: "Нет плана",
  },
  {
    count: 3,
    percent: 30,
    title: "Сломан",
  },
  {
    count: 1,
    percent: 10,
    title: "Остановлено",
  },
];

export const MachineStatus = () => {
  return (
    <div className="relative">
      <div className="w-[220px] absolute top-[-55px] right-0">
        <CPeriodPicker placeholder="Выберите время" handleValue={() => {}} />
      </div>
      <div className="grid grid-cols-4 gap-x-5">
        {cardData.map((item) => (
          <AnalyticCard key={item.title} el={item} />
        ))}
      </div>

      <CCard title="В разделе машин" classes="mt-5">
        <div className="text-[14px] text-[var(--gray)] space-x-[30px] font-medium inline-flex justify-end">
          <div className="flex gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-[var(--success)]"></div>
            Работает
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-[var(--primary)]"></div>
            Нет плана
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-[var(--gray)]"></div>
            Сломан
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-[var(--error)]"></div>
            Остановлено
          </div>
        </div>
        <div className="grid grid-cols-11 gap-5">
          {MachineList.map(
            (item: { status: any; name: string }, index: number) => (
              <div key={index}>
                <div className="w-full h-[200px] relative">
                  <StatusPieChart list={item.status} />
                  <h3 className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                    A 0{index + 1}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>
      </CCard>

      <CCard title="По календарю" classes="mt-5">
        <Calendar />
      </CCard>
    </div>
  );
};
