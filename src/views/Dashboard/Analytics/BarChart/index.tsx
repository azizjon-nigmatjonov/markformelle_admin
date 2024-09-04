import { axisClasses, BarChart } from "@mui/x-charts";
import { Skeleton } from "@mui/material";
// import { axisClasses } from "@mui/x-charts";
const valueFormatter = (value: number | null) => `${value}mm`;
const chartSetting = {
  yAxis: [
    {
      label: "План",
    },
  ],
  series: [
    {
      dataKey: "plan",
      // label: "Plan nomer 1",
      valueFormatter,
      color: "var(--primary60)",
    },
  ],
  height: 500,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const dataset = [
  {
    plan: 21,
    number: "План нo 1",
  },
  {
    plan: 51,
    number: "План нo 2",
  },
  {
    plan: 40,
    number: "План нo 3",
  },
  {
    plan: 70,
    number: "План нo 4",
  },
  {
    plan: 50,
    number: "План нo 5",
  },
  {
    plan: 77,
    number: "План нo 6",
  },
  {
    plan: 98,
    number: "План нo 7",
  },
  {
    plan: 8,
    number: "План нo 8",
  },
  {
    plan: 48,
    number: "План нo 9",
  },
  {
    plan: 38,
    number: "План нo 10",
  },
  {
    plan: 58,
    number: "План нo 11",
  },
  {
    plan: 48,
    number: "План нo 12",
  },
  {
    plan: 98,
    number: "План нo 13",
  },
  {
    plan: 158,
    number: "План нo 14",
  },
  {
    plan: 38,
    number: "План нo 15",
  },
  {
    plan: 28,
    number: "План нo 16",
  },
  {
    plan: 28,
    number: "План нo 17",
  },
  {
    plan: 38,
    number: "План нo 18",
  },
  {
    plan: 48,
    number: "План нo 19",
  },
  {
    plan: 8,
    number: "План нo 20",
  },
];

const AnalyticsBarchart = ({
  grapData: data,
  loading,
}: {
  grapData: any;
  loading?: any;
}) => {
  console.log(data);

  return (
    <div>
      {loading ? (
        <Skeleton height={300} />
      ) : (
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "number",
              tickPlacement: "middle",
              tickLabelPlacement: "middle",
            },
          ]}

          {...chartSetting}
        />
      )}
    </div>
  );
};

export default AnalyticsBarchart;
