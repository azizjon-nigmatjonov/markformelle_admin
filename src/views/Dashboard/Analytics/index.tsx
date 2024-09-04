import { Skeleton } from "@mui/material";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CCard from "../../../components/CElements/CCard";
import { Header } from "../../../components/UI/Header";
import AnalyticsBarchart from "./BarChart";
import { AnalyticCard } from "./Card";
import { breadCrumbItems } from "./Logic";
import Progress from "../../../components/UI/Progress";
import { CPeriodPicker } from "../../../components/CElements/CPeriodPicker";

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
];

const cardData = [
  {
    count: 22,
    percent: 90,
    title: "Ishlaganlar",
  },
  {
    count: 3,
    percent: 30,
    title: "buzulganlar",
  },
  {
    count: 5,
    percent: 60,
    title: "toxtab turganlar",
  },
  {
    count: 1,
    percent: 10,
    title: "yopiq",
  },
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

const DashboardAnalytics = () => {
  const loading = false;
  return (
    <div>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="container">
        <div className="grid grid-cols-4 gap-x-5">
          {cardData.map((item) => (
            <AnalyticCard key={item.title} el={item} />
          ))}
        </div>

        <CCard classes="mt-5">
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">
              Статистика по номеру плана
            </h3>
            <div className="w-[220px]">
              <CPeriodPicker
                handleValue={() => {}}
                placeholder="Выберите время"
              />
            </div>
          </div>
          <AnalyticsBarchart grapData={[]} loading={false} />
        </CCard>

        <CCard style={{ minHeight: 0 }} classes="my-5">
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">План, сделанный на швейных машинах</h3>
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
              <Progress size={70} color="var(--main)" data={progressData} />
            )}
          </div>
        </CCard>

        {/* <CCard>
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">Tikuv mashinalari necha foiz ishlagani</h3>
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

        <CCard classes="mt-5">
          <StatisticsGender />
        </CCard>

        <CCard>
          <LineChart />
        </CCard>

        <CCard classes="mt-5">
          <Calendar />
        </CCard> */}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
