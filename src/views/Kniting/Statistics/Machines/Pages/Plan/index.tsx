import CCard from "../../../../../../components/CElements/CCard";
import { CPeriodPicker } from "../../../../../../components/CElements/CPeriodPicker";
import CSelect from "../../../../../../components/CElements/CSelect";
import AnalyticsBarchart from "../../Components/BarChart";

export const MachinePlans = () => {
  return (
    <>
      <CCard>
        <div className="flex justify-between mb-10 border-b border-[var(--border)] pb-5">
          <h3 className="mb-5 text-2xl font-medium">
            Статистика по номеру плана
          </h3>
          <div className="flex space-x-5 w-[440px]">
            <div className="w-full">
              <CPeriodPicker
                handleValue={() => {}}
                placeholder="Выберите время"
              />
            </div>
            <div className="w-full">
              <CSelect options={[]} />
            </div>
          </div>
        </div>
        <AnalyticsBarchart grapData={[]} loading={false} />
      </CCard>
    </>
  );
};
