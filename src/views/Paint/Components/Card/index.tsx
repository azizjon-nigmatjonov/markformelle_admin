import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useCalculateTime } from "../../../../hooks/useCalucaleTime";
import { PantoneColors } from "../../../../constants/pantone";

interface Props {
  element: any;
}
export const PaintPotCard = ({ element }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const { GetTime } = useCalculateTime();
  return (
    <div
      className={`w-full h-full rounded-[12px] px-2 desktop:px-4 py-2 desktop:py-4 overflow-hidden relative ${
        element.status === "stopped" ? "red" : "green"
      }`}
    >
      <div className="flex">
        <div className="flex flex-col justify-between">
          <CircularProgress
            strokeWidth={getFontSize({
              count: 6,
              percent: 5.5,
              type: "machine",
            })}
            value={70}
            maxValue={100}
            size={getFontSize({
              count: 6,
              percent: 58,
              type: "machine",
            })}
          >
            <p
              className="font-semibold"
              style={{
                fontSize: getFontSize({
                  count: 6,
                  percent: 14.5,
                  type: "machine",
                }),
              }}
            >
              {GetTime(element.end_time)}
            </p>
          </CircularProgress>
          <div>
            <p
              className="font-bold whitespace-nowrap"
              style={{
                fontSize: getFontSize({
                  count: 6,
                  percent: window.screen.width < 1000 ? 9 : 8.7,
                  type: "machine",
                }),
              }}
            >
              {GetCurrentDate({ type: "time", date: element.time })} -{" "}
              {GetCurrentDate({ type: "time", date: element.end_time })}
            </p>
          </div>

          {/* <div
            className="absolute right-[-16px] desktop:right-[-16px] bottom-0 h-full"
            style={{
              width: getFontSize({
                count: 6,
                percent: window.screen.width < 1000 ? 5 : 5,
                type: "machine",
              }),
              backgroundColor: PaintColors[element.color_id],
            }}
          ></div> */}
        </div>

        <div className="footer w-full pl-4">
          <ul
            className="w-full whitespace-nowrap"
            style={{
              fontSize: getFontSize({
                count: 6,
                percent: 13,
                type: "machine",
              }),
              lineHeight: getFontSize({
                count: 6,
                percent: window.screen.width < 1000 ? 1 : 0.75,
                type: "machine",
              }),
            }}
          >
            <li>
              <p
                className="font-bold leading-5"
                style={{
                  fontSize: getFontSize({
                    count: 6,
                    percent: 14,
                    type: "machine",
                  }),
                }}
              >
                {element.name}
              </p>
            </li>
            <li className="pt-3">
              <p className="font-semibold">24-511</p>
            </li>
            <li>
              <p className="font-semibold">{element.partia_weiht} kg</p>
            </li>
            <li>
              <p className="font-semibold">
                {element.partia_number.substring(
                  element.partia_number.indexOf("-") + 1
                )}
              </p>
            </li>

            {/* <li>
              <p className="font-semibold">24-511</p>
            </li> */}
          </ul>
        </div>
      </div>

      <div
        className="w-[1px] h-[100px] absolute z-[2] right-[-1px] top-0 right-shadow"
        style={{
          height: getFontSize({
            count: 6,
            percent: 63,
            type: "machine",
          }),
          top: getFontSize({
            count: 6,
            percent: 10,
            type: "machine",
          }),
        }}
      ></div>

      {/* <div
        className="z-[2]"
        style={{
          width: 5,
          height: getFontSize({
            count: 6,
            percent: 63,
            type: "machine",
          }),
          right: 100,
          top: getFontSize({
            count: 6,
            percent: 10,
            type: "machine",
          }),
          boxShadow: `inset -4px 0 8px rgba(0, 0, 0, 0.3)`,
          backgroundColor: "var(--gray)",
        }}
      ></div> */}

      <div
        className="absolute rounded-[12px] right-0"
        style={{
          width: getFontSize({
            count: 6,
            percent: 15,
            type: "machine",
          }),
          height: getFontSize({
            count: 6,
            percent: 63,
            type: "machine",
          }),
          right: getFontSize({
            count: 6,
            percent: -5,
            type: "machine",
          }),
          top: getFontSize({
            count: 6,
            percent: 10,
            type: "machine",
          }),
          // boxShadow: `inset -4px 0 8px rgba(0, 0, 0, 0.3)`,
          backgroundColor: `#${PantoneColors?.[element.color_id]?.hex}`,
        }}
      ></div>
    </div>
  );
};
