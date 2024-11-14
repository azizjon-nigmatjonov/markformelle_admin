import CircularProgress from "../../../../components/CElements/CCircularProgress";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { WatchIcon } from "../../IconGenerator/Svg/Machines";

interface Props {
  data: any;
  count?: number;
}

export const MachineCardBody = ({ data = {}, count = 6 }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;
  return (
    <div className="w-full flex justify-center h-full">
      <CircularProgress
        strokeWidth={getFontSize({
          count,
          percent: height > 1200 ? 8 : 5,
          type: "machine",
        })}
        value={Number(data.plan_fact) > 100 ? 100 : Number(data.plan_fact)}
        maxValue={data.plan}
        size={getFontSize({
          count,
          percent: height > 1200 ? 87 : 52,
          type: "machine",
        })}
      >
        <div
          className="font-semibold"
          style={{
            fontSize: getFontSize({
              count,
              percent: height > 1200 ? 14 : 8,
              type: "machine",
            }),
          }}
        >
          <p>{data.plan}</p>
          <div className="w-full h-[1px] bg-[var(--black)] mb-[2px]"></div>
          <p>{data.plan_fact}</p>

          <div className="flex items-center">
            <div
              className="rotate-[90deg]"
              style={{
                width: getFontSize({
                  count,
                  percent: height > 1200 ? 15 : 9,
                  type: "machine",
                }),
                height: getFontSize({
                  count,
                  percent: height > 1200 ? 15 : 9,
                  type: "machine",
                }),
              }}
            >
              <WatchIcon />
            </div>
            <p>{data.plan_hourly}</p>
          </div>
        </div>
      </CircularProgress>
    </div>
  );
};
