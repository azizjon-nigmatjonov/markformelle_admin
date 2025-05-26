import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useEffect, useState } from "react";
import { PaintCardModal } from "../Modal";
import { Modal } from "@mui/joy";

interface Props {
  element: any;
}

export const PaintPotCard = ({ element = {} }: Props) => {
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
      className={`w-full h-full rounded-[12px] px-2 py-2 pb-1 desktop:pb-3 overflow-hidden relative ${element.status?.color}`}
      onClick={(e: any) => {
        e.stopPropagation();
        setOpen(true);
      }}
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-between">
          <CircularProgress
            strokeWidth={getFontSize({
              count: 6,
              percent: height > 1200 ? 10 : 5.5,
              type: "machine",
            })}
            strokeColor={
              element?.machine?.time_bigger === 1
                ? "#ff9c27"
                : element?.machine?.time_bigger > 1
                ? "#ff6060"
                : undefined
            }
            value={element?.machine?.worked_minutes ?? 0}
            maxValue={element?.machine?.process_time ?? 100}
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
                {element.machine.worked_date.substring(
                  0,
                  element.machine.worked_date.indexOf(" ")
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
              {element?.machine?.worked_date?.includes(" ")
                ? element.machine.worked_date.substring(
                    element.machine.worked_date.indexOf(" ")
                  )
                : element?.machine?.worked_date || "00:00"}
            </p>
          </CircularProgress>
          <div className="pt-5">
            <p
              className="font-bold whitespace-nowrap"
              style={{
                fontSize: getFontSize({
                  count: 6,
                  percent: height > 1200 ? 14 : 8,
                  type: "machine",
                }),
              }}
            >
              {GetCurrentDate({
                type: "usually",
                date: element.machine?.date_start?.substring(
                  0,
                  element.machine?.date_start.length - 3
                ),
              })}{" "}
              {`${element.machine?.date_start ? " - " : ""}`}
              {GetCurrentDate({
                type: "usually",
                date: element.machine?.date_end?.substring(
                  0,
                  element.machine?.date_start.length - 3
                ),
              })}
            </p>
          </div>
        </div>

        <div className={`footer w-full pl-4`}>
          <ul
            className="w-full whitespace-nowrap"
            style={{
              fontSize: getFontSize({
                count: 6,
                percent: height > 1200 ? 23 : 12,
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
                    percent: height > 1200 ? 24 : 13,
                    type: "machine",
                  }),
                }}
              >
                {element.code_device}
              </p>
            </li>
            <li className={`${height > 1200 ? "pt-3" : "pt-2"}`}>
              <p className="font-semibold whitespace-pre-line">
                {element.machine?.pkol_knit
                  ? element.machine.pkol_knit + " кг"
                  : element.status.text}{" "}
              </p>
            </li>
            <li>
              <p className="font-semibold">
                {element.machine?.nplan
                  ? element.machine.nplan.substring(3)
                  : ""}
              </p>
            </li>

            <li>
              <p className="font-semibold">
                {element.machine?.ReceteId
                  ? element.machine.ReceteId?.substring(
                      element.machine.ReceteId?.indexOf("-") + 1,
                      element.machine.ReceteId.indexOf(".")
                    )
                  : ""}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {element.machine?.pantone && (
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

      {element.machine?.pantone_data?.name && (
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

            backgroundColor: `#${element.machine?.pantone_data?.hex}`,
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
          <PaintCardModal open={open} setOpen={setOpen} element={element} />
        </Modal>
      )}
    </div>
  );
};
