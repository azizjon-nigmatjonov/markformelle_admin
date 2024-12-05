import useDeviceHeight from "../../../hooks/useDeviceHeight";
import CircularProgress from "../../../components/CElements/CCircularProgress";
import { useEffect, useState } from "react";
// import { PaintCardModal } from "../Modal";
import { Modal } from "@mui/joy";
import { DryModal } from "./Modal";

interface Props {
  element: any;
}

export const DryCard = ({ element = {} }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const [open, setOpen]: any = useState(false);
  const [height, setHeight]: any = useState(0);

  useEffect(() => {
    if (window) {
      setHeight(window?.screen?.height);
    }
  }, []);

  return (
    <div
      className={`w-full h-full rounded-[12px] px-2 desktop:px-4 py-2 desktop:py-4 pb-1 desktop:pb-3 overflow-hidden relative ${element?.color}`}
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
            strokeColor={
              element?.time_bigger === 1
                ? "#ff9c27"
                : element?.time_bigger > 1
                ? "#ff6060"
                : undefined
            }
            value={element?.worked_minutes ?? 0}
            maxValue={element?.process_time ?? 100}
            size={getFontSize({
              count: 6,
              percent:
                height > 1200 ? 105 : height < 800 && height > 600 ? 60 : 60,
              type: "machine",
            })}
          >
            {element?.machine?.worked_date?.includes(" ") && (
              <p
                className="font-semibold absolute top-3"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: height > 1200 ? 25 : 15,
                    type: "machine",
                  }),
                }}
              >
                {element.worked_date.substring(
                  0,
                  element.worked_date.indexOf(" ")
                )}
              </p>
            )}

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
              {element?.worked_date?.includes(" ")
                ? element.worked_date.substring(
                    element.worked_date.indexOf(" ")
                  )
                : element?.worked_date || "00:00"}
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
              {element?.date_start} {`${element?.date_start ? " - " : ""}`}
              {element?.date_end}
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
                percent: height > 1200 ? 1 : height < 800 ? 1 : 0.75,
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
                {element.code_device}
              </p>
            </li>
            <li className={`${height > 1200 ? "pt-4" : "pt-3"}`}>
              <p className="font-semibold whitespace-pre-line">
                {element.pkol_knit
                  ? element.pkol_knit + " кг"
                  : element.status.text}{" "}
              </p>
            </li>
            <li>
              <p className="font-semibold">
                {element?.nplan ? element.nplan : ""}
              </p>
            </li>

            <li>
              <p className="font-semibold">
                {element?.ReceteId
                  ? element.ReceteId?.substring(
                      element.ReceteId?.indexOf("-") + 1,
                      element.ReceteId.indexOf(".")
                    )
                  : ""}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {element?.pantone && (
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
      )}

      {element?.pantone_data?.name && (
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

            backgroundColor: `#${element?.pantone_data?.hex}`,
          }}
        ></div>
      )}

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
          <DryModal />
          {/* <PaintCardModal open={open} setOpen={setOpen} element={element} /> */}
        </Modal>
      )}
    </div>
  );
};
