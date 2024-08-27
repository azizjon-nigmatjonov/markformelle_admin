import { axisClasses, BarChart } from "@mui/x-charts";
import { Skeleton } from "@mui/material";
// import { axisClasses } from "@mui/x-charts";
const valueFormatter = (value: number | null) => `${value}mm`;
const chartSetting = {
  yAxis: [
    {
      label: "Soni foizda",
    },
  ],
  series: [{ dataKey: "seoul", label: "No'mer", valueFormatter,  color: "var(--main)", }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "777",
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
              dataKey: "month",
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
