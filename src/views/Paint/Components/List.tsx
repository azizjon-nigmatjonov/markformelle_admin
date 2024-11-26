import { useCalculateTime } from "../../../hooks/useCalucaleTime";
import { PaintPotCard } from "./Card";
// import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface Props {
  data: any;
}

export const PaintList = ({ data = [] }: Props) => {
  const { GetTime } = useCalculateTime();

  return (
    <div className="p-2">
      <div
        className="grid grid-cols-6 grid-rows-6 gap-2"
        style={{
          minWidth:
            window?.screen?.width < 940
              ? "1600px"
              : window?.screen?.width - 200,
          // height: getHeight({
          //   count: 1,
          //   type: "machine",
          //   minus:
          //     window?.screen?.width < 1000
          //       ? openHeader
          //         ? 50
          //         : 18
          //       : openHeader
          //       ? 185
          //       : 140,
          // }),
        }}
      >
        {data?.map((item: any, index: number) => (
          <PaintPotCard key={index} element={item ?? {}} GetTime={GetTime} />
        ))}
      </div>
    </div>
  );
};
