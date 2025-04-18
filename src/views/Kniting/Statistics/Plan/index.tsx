import { LinearProgress, Skeleton } from "@mui/material";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";
import CCard from "../../../../components/CElements/CCard";
import { CPeriodPicker } from "../../../../components/CElements/CPeriodPicker";
import CSelect from "../../../../components/CElements/CSelect";
import { Header } from "../../../../components/UI/Header";
import AnalyticsBarchart from "../Machines/Components/BarChart";
import { AnalyticCard } from "../Machines/Components/Card";
import { breadCrumbItems } from "./Logic";
import Progress from "../../../../components/UI/Progress";

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

const progressData = [
  { name: "Название швейной машины 1", quantity: 20, percentage: 10 },
  { name: "Название швейной машины 2", quantity: 30, percentage: 90 },
  { name: "Название швейной машины 3", quantity: 50, percentage: 60 },
  { name: "Название швейной машины 4", quantity: 20, percentage: 20 },
  { name: "Название швейной машины 5", quantity: 70, percentage: 30 },
  { name: "Название швейной машины 6", quantity: 50, percentage: 50 },
  { name: "Название швейной машины 7", quantity: 10, percentage: 10 },
  { name: "Название швейной машины 8", quantity: 0, percentage: 0 },
  { name: "Название швейной машины 9", quantity: 10, percentage: 10 },
  { name: "Название швейной машины 10", quantity: 10, percentage: 10 },
  { name: "Название швейной машины 11", quantity: 1, percentage: 0 },
  { name: "Название швейной машины 12", quantity: 20, percentage: 20 },
  { name: "Название швейной машины 13", quantity: 30, percentage: 30 },
  { name: "Название швейной машины 14", quantity: 0, percentage: 0 },
  { name: "Название швейной машины 15", quantity: 40, percentage: 40 },
  { name: "Название швейной машины 16", quantity: 30, percentage: 30 },
];

const progress = [
  {
    name: "Mashina 1",
    count: 10,
    value: 10,
  },
  {
    name: "Mashina 2",
    count: 80,
    value: 90,
  },
  {
    name: " Mashina 3",
    count: 30,
    value: 30,
  },
  {
    name: " Mashina 4",
    count: 30,
    value: 30,
  },
];

export const AnalyticsPlan = () => {
  const loading = false;
  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="p-2">
        <div className="grid grid-cols-4 gap-x-5">
          {cardData?.map((item) => (
            <AnalyticCard key={item.title} el={item} />
          ))}
        </div>

        <CCard classes="mt-5">
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

        <CCard style={{ minHeight: 0 }} classes="my-5">
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">
              План, сделанный на швейных машинах
            </h3>
            <div className="w-[220px]">
              <CPeriodPicker
                handleValue={() => {}}
                placeholder="Выберите время"
              />
            </div>
          </div>
          <div>
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <Progress size={70} color="var(--primary)" data={progressData} />
            )}
          </div>
        </CCard>

        <CCard>
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">
              Какой процент швейных машин работал
            </h3>
            <div className="w-[220px]">
              <CPeriodPicker
                handleValue={() => {}}
                placeholder="Выберите время"
              />
            </div>
          </div>
          {progress?.map((val: any) => (
            <div className="flex flex-col justify-between  h-full">
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-medium text-[var(--black)]">
                  {val.name ? val.name : "Noma'lum viloyat"}
                </p>
                <p className="text-sm font-semibold text-[var(--black)]">
                  {val.count}
                </p>
              </div>
              <LinearProgress
                variant="determinate"
                sx={{
                  backgroundColor: "var(--main80)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--main)",
                  },
                  marginTop: "3px",
                  borderRadius: 5,
                }}
                value={val?.value}
              />
            </div>
          ))}
        </CCard>
      </div>
    </>
  );
};
