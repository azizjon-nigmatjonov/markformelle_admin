import { ResponsiveLine } from "@nivo/line";
import { LineChartBackground } from "../../../../components/UI/IconGenerator/Svg";
import LineChartTooltip from "./LineChartTooltip";

const data = [
  {
    id: "japan",
    color: "hsl(344, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 10,
      },
      {
        x: "helicopter",
        y: 69,
      },
      {
        x: "boat",
        y: 197,
      },
      {
        x: "train",
        y: 292,
      },
      {
        x: "subway",
        y: 86,
      },
      {
        x: "bus",
        y: 214,
      },
      {
        x: "car",
        y: 86,
      },
      {
        x: "moto",
        y: 148,
      },
      {
        x: "bicycle",
        y: 143,
      },
      {
        x: "horse",
        y: 284,
      },
      {
        x: "skateboard",
        y: 228,
      },
      {
        x: "others",
        y: 48,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(195, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 69,
      },
      {
        x: "helicopter",
        y: 138,
      },
      {
        x: "boat",
        y: 273,
      },
      {
        x: "train",
        y: 52,
      },
      {
        x: "subway",
        y: 159,
      },
      {
        x: "bus",
        y: 81,
      },
      {
        x: "car",
        y: 83,
      },
      {
        x: "moto",
        y: 249,
      },
      {
        x: "bicycle",
        y: 78,
      },
      {
        x: "horse",
        y: 239,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 225,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(137, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 78,
      },
      {
        x: "helicopter",
        y: 234,
      },
      {
        x: "boat",
        y: 118,
      },
      {
        x: "train",
        y: 81,
      },
      {
        x: "subway",
        y: 278,
      },
      {
        x: "bus",
        y: 196,
      },
      {
        x: "car",
        y: 242,
      },
      {
        x: "moto",
        y: 263,
      },
      {
        x: "bicycle",
        y: 2,
      },
      {
        x: "horse",
        y: 59,
      },
      {
        x: "skateboard",
        y: 174,
      },
      {
        x: "others",
        y: 4,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(168, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 14,
      },
      {
        x: "helicopter",
        y: 15,
      },
      {
        x: "boat",
        y: 35,
      },
      {
        x: "train",
        y: 183,
      },
      {
        x: "subway",
        y: 80,
      },
      {
        x: "bus",
        y: 113,
      },
      {
        x: "car",
        y: 101,
      },
      {
        x: "moto",
        y: 209,
      },
      {
        x: "bicycle",
        y: 38,
      },
      {
        x: "horse",
        y: 53,
      },
      {
        x: "skateboard",
        y: 287,
      },
      {
        x: "others",
        y: 215,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(150, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 51,
      },
      {
        x: "helicopter",
        y: 36,
      },
      {
        x: "boat",
        y: 40,
      },
      {
        x: "train",
        y: 84,
      },
      {
        x: "subway",
        y: 62,
      },
      {
        x: "bus",
        y: 199,
      },
      {
        x: "car",
        y: 206,
      },
      {
        x: "moto",
        y: 219,
      },
      {
        x: "bicycle",
        y: 214,
      },
      {
        x: "horse",
        y: 215,
      },
      {
        x: "skateboard",
        y: 15,
      },
      {
        x: "others",
        y: 173,
      },
    ],
  },
];

const LineChart = () => {
  return (
    <div className="w-full h-[500px] relative">
      <div className="absolute left-0 top-[50px] w-full h-full">
        <LineChartBackground />
      </div>
      <ResponsiveLine
        data={data}
        margin={{ top: 100, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        tooltip={({ point }) => <LineChartTooltip data={point} />}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        enableGridX={false}
        colors={{ scheme: "nivo" }}
        pointSize={2}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderColor={{ from: "color", modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-10}
        areaBaselineValue={140}
        areaOpacity={0.35}
        enableCrosshair={false}
        crosshairType="top-right"
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            justify: false,
            translateX: 34,
            translateY: -300,
            itemsSpacing: 6,
            itemDirection: "left-to-right",
            itemWidth: 75,
            itemHeight: 200,
            itemOpacity: 0.75,
            symbolSize: 8,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChart;
