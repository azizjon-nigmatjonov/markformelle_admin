import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useCalculateTime } from "../../../../hooks/useCalucaleTime";
import { PantoneColors } from "../../../../constants/pantone";
import { useEffect, useState } from "react";
import { PaintCardModal } from "../Modal";
import { Modal } from "@mui/joy";

interface Props {
  element: any;
}
export const PaintPotCard = ({ element }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const { GetTime } = useCalculateTime();
  const [open, setOpen]: any = useState(false);
  const [height, setHeight]: any = useState(0);

  useEffect(() => {
    if (window) {
      setHeight(window?.screen?.height);
    }
  }, []);
  return (
    <div
      className={`w-full h-full rounded-[12px] px-2 desktop:px-4 py-2 desktop:py-4 overflow-hidden relative ${
        element.status === "stopped" ? "red" : "green"
      }`}
      onClick={(e: any) => {
        e.stopPropagation();
        setOpen(true);
      }}
    >
      <div className="flex">
        <div className="flex flex-col justify-between">
          <CircularProgress
            strokeWidth={getFontSize({
              count: 6,
              percent: height > 1200 ? 10 : 5.5,
              type: "machine",
            })}
            value={70}
            maxValue={100}
            size={getFontSize({
              count: 6,
              percent:
                height > 1200 ? 105 : height < 800 && height > 600 ? 60 : 60,
              type: "machine",
            })}
          >
            <p
              className="font-semibold"
              style={{
                fontSize: getFontSize({
                  count: 6,
                  percent: height > 1200 ? 25 : 15,
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
                  percent: height > 1200 ? 16 : 9.5,
                  type: "machine",
                }),
              }}
            >
              {GetCurrentDate({ type: "time", date: element.time })} -{" "}
              {GetCurrentDate({ type: "time", date: element.end_time })}
            </p>
          </div>
        </div>

        <div className={`footer w-full pl-4`}>
          <ul
            className="w-full whitespace-nowrap"
            style={{
              fontSize: getFontSize({
                count: 6,
                percent: height > 1200 ? 24 : 13,
                type: "machine",
              }),
              lineHeight: getFontSize({
                count: 6,
                percent:
                  height > 1200 ? 1 : height < 800 ? 1 : 0.75,
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
                    percent: height > 1200 ? 25 : 14,
                    type: "machine",
                  }),
                }}
              >
                {element.name}
              </p>
            </li>
            <li className={`${height > 1200 ? "pt-4" : "pt-3"}`}>
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

      <div
        className="absolute rounded-[12px] top-1/2 -translate-y-1/2"
        style={{
          width: getFontSize({
            count: 6,
            percent: height > 1200 ? 30 : 15,
            type: "machine",
          }),
          height: getFontSize({
            count: 6,
            percent: height > 1200 ? 90 : 60,
            type: "machine",
          }),
          right: getFontSize({
            count: 6,
            percent: height > 1200 ? -15 : -5,
            type: "machine",
          }),
          // top: getFontSize({
          //   count: 6,
          //   percent: 10,
          //   type: "machine",
          // }),
          backgroundColor: `#${PantoneColors?.[element.color_id]?.hex}`,
        }}
      ></div>

      {open && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={(e: any) => {
            e.stopPropagation();
            setOpen(false);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PaintCardModal open={open} setOpen={setOpen} element={element} />
        </Modal>
      )}
    </div>
  );
};