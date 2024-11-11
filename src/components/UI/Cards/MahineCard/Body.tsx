import CircularProgress from "../../../../components/CElements/CCircularProgress";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import SpeedIcon from "@mui/icons-material/Speed";

interface Props {
  data: any;
  count?: number;
}

export const MachineCardBody = ({ data = {}, count = 6 }: Props) => {
  const { getFontSize } = useDeviceHeight();
  return (
    <div className="w-full flex justify-center h-full">
      <CircularProgress
        strokeWidth={getFontSize({
          count,
          percent: 6,
          type: "machine",
        })}
        value={
          Number(data.fakt_percentage) > 100
            ? 100
            : Number(data.fakt_percentage)
        }
        maxValue={100}
        size={getFontSize({
          count,
          percent: 58,
          type: "machine",
        })}
      >
        <div className="font-semibold">
          <p
            style={{
              fontSize: getFontSize({
                count,
                percent: 9,
                type: "machine",
              }),
            }}
          >
            {data.fkol_knit
              .toString()
              .substring(
                0,
                data.fkol_knit.toString().indexOf(".") !== -1
                  ? data.fkol_knit.toString().indexOf(".") + 2
                  : data.fkol_knit.length
              ) || "0"}
          </p>
          <div className="w-full h-[1px] bg-[var(--black)] mb-[2px]"></div>
          <p
            style={{
              fontSize: getFontSize({
                count,
                percent: 9,
                type: "machine",
              }),
            }}
          >
            {data.pkol_knit
              .toString()
              .substring(
                0,
                data.pkol_knit.toString().indexOf(".") !== -1
                  ? data.pkol_knit.toString().indexOf(".") + 2
                  : data.pkol_knit.length
              ) || "0" + " Kg"}
          </p>
          <div
            style={{
              fontSize: getFontSize({
                count,
                percent: 9,
                type: "machine",
              }),
            }}
          >
            <div className="flex items-center justify-center font-semibold pl-3">
              <div className="rotate-[90deg] mt-[-20px]">
                <SpeedIcon
                  style={{
                    fontSize: getFontSize({
                      count,
                      percent: 10,
                      type: "machine",
                    }),
                  }}
                />
              </div>
              <span className="ml-[2px]">{data.rotation || "0.0"}</span>
            </div>
          </div>
        </div>
      </CircularProgress>
    </div>
  );
};
