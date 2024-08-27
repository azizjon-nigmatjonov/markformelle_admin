import { LinearProgress, Skeleton } from "@mui/material";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CCard from "../../../components/CElements/CCard";
import { Header } from "../../../components/UI/Header";
import AnalyticsBarchart from "./BarChart";
import { AnalyticCard } from "./Card";
import { breadCrumbItems } from "./Logic";
import Progress from "../../../components/UI/Progress";
import { CPeriodPicker } from "../../../components/CElements/CPeriodPicker";
import StatisticsGender from "./GenderRegions";

const progressData = [
  { name: "Tikuv moshinasi 1", quantity: 20, percentage: 10 },
  { name: "Tikuv moshinasi 2", quantity: 30, percentage: 90 },
  { name: "Tikuv moshinasi 3", quantity: 50, percentage: 60 },
  { name: "Tikuv moshinasi 4", quantity: 20, percentage: 20 },
  { name: "Tikuv moshinasi 5", quantity: 70, percentage: 30 },
  { name: "Tikuv moshinasi 6", quantity: 50, percentage: 50 },
  { name: "Tikuv moshinasi 7", quantity: 10, percentage: 10 },
  { name: "Tikuv moshinasi 8", quantity: 0, percentage: 0 },
  { name: "Tikuv moshinasi 9", quantity: 10, percentage: 10 },
];

const cardData = [
  {
    count: 1,
    percent: 10,
    title: "Ishlaganlar",
  },
  {
    count: 1,
    percent: 10,
    title: "buzulganlar",
  },
  {
    count: 1,
    percent: 10,
    title: "toxtab turganlar",
  },
];

const progress = [
  {
    name: "1",
    count: 10,
    value: 40,
  },
  {
    name: "2",
    count: 30,
    value: 70,
  },
  {
    name: "3",
    count: 0,
    value: 0,
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

        <CCard style={{ minHeight: 0 }} classes="my-5">
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">To'quv moshinalari</h3>
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

        <CCard>
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">Necha foiz ishladi</h3>
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
                  backgroundColor: "#FFEFE6",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FF7C34",
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

        <CCard classes="mt-5">
          <div className="flex justify-between mb-10">
            <h3 className="mb-5 text-2xl font-medium">
              Mashina raqami bo'yicha statistika
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
      </div>
    </div>
  );
};

export default DashboardAnalytics;
