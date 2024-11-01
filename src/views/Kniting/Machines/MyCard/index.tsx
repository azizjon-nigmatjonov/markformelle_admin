import { useEffect, useRef, useState } from "react";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import "./style.scss";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import { Bolt, WifiOff } from "@mui/icons-material";
import { Modal } from "@mui/joy";
import ModalCard from "../Card/ModalCard";
import SpeedIcon from "@mui/icons-material/Speed";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
interface Props {
  machine: any;
  zoomPoint: number;
}

export const MyCard = ({ machine }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const [size, setSize] = useState<number>(50);
  const cardRef: any = useRef(null);
  const updateSize = () => {
    if (window.screen.width < 1200 && window.screen.width > 940) {
      setSize(cardRef?.current?.clientHeight * 0.69);
    } else {
      setSize(cardRef?.current?.clientHeight * 0.7);
    }
  };

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const [cardColor, setCardColor] = useState<string>("");
  const [open, setOpen] = useState(false);

  const getCardColor = (): string => {
    if (
      machine.yarn_replacement == "true" &&
      machine.pkol_knit - machine.fkol_knit < 40 &&
      machine.pkol_knit - machine.fkol_knit > 0 &&
      machine.rotation > 0
    ) {
      return "orange";
    } else {
      return machine.new_status.color;
    }
  };

  useEffect(() => {
    setCardColor(getCardColor());
  }, [machine]);

  return (
    <>
      <div
        ref={cardRef}
        onClick={(e: any) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`h-full w-full wrapper relative mycard ${cardColor} ${
          Number(machine.stop_mins) >= 30 &&
          machine.not_broken == "true" &&
          machine.machine_is_on == "true" &&
          machine.rotation == 0 &&
          machine.no_connnection === "false" &&
          machine.pkol_knit !== 0 &&
          (machine.reason?.includes("Ожидание причины останова") ||
            !machine.reason)
            ? "animate-breath"
            : ""
        }`}
        style={{
          zoom:
            window.screen.width < 940
              ? 0.8
              : window.screen.width > 1920
              ? 1
              : 0.6,
        }}
      >
        {machine.no_connnection == "true" ? (
          <div className="flex flex-col items-center">
            <p className="title">{machine.name}</p>
            <div className="flex flex-col items-center justify-center absolute top-[60%] -translate-y-1/2">
              <div className="image">
                <WifiOff />
              </div>
              <p
                className="sub-title font-semibold"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 16,
                    type: "machine",
                  }),
                }}
              >
                Нет соединения
              </p>
              <p
                className="text-error"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 16,
                    type: "machine",
                  }),
                }}
              >
                {machine.ip_address}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {machine.no_connnection !== "true" && (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center">
              <div
                className="sub-title"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 15,
                    type: "machine",
                  }),
                }}
              >
                <ViewDayOutlinedIcon />
                <span> {machine.new_rolls}</span>
              </div>
              <p
                className="title absolute left-1/2 -translate-x-1/2"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 19,
                    type: "machine",
                  }),
                }}
              >
                {machine.name}
              </p>
              <div
                className="sub-title"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 15,
                    type: "machine",
                  }),
                }}
              >
                {machine.defect_num}
              </div>
            </div>
            <div
              className={`w-full flex justify-center py-1 absolute top-[57%] desktop:top-[60%] bigDesktop:top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              <CircularProgress
                strokeWidth={getFontSize({
                  count: 7,
                  percent: 8,
                  type: "machine",
                })}
                value={
                  Number(machine.fakt_percentage) > 100
                    ? 100
                    : Number(machine.fakt_percentage)
                }
                maxValue={100}
                size={getFontSize({
                  count: 7,
                  percent: 100,
                  type: "machine",
                })}
              >
                <div>
                  <p
                    className="text inner"
                    style={{
                      fontSize: getFontSize({
                        count: 7,
                        percent: 13.5,
                        type: "machine",
                      }),
                    }}
                  >
                    {machine.fkol_knit
                      .toString()
                      .substring(
                        0,
                        machine.fkol_knit.toString().indexOf(".") !== -1
                          ? machine.fkol_knit.toString().indexOf(".") + 2
                          : machine.fkol_knit.length
                      )}
                  </p>
                  <div className="w-full h-[1px] bg-[var(--black)] mb-[4px]"></div>
                  <p
                    className="text inner"
                    style={{
                      fontSize: getFontSize({
                        count: 7,
                        percent: 13.5,
                        type: "card",
                      }),
                    }}
                  >
                    {machine.pkol_knit
                      .toString()
                      .substring(
                        0,
                        machine.pkol_knit.toString().indexOf(".") !== -1
                          ? machine.pkol_knit.toString().indexOf(".") + 2
                          : machine.pkol_knit.length
                      ) + " Kg"}
                  </p>
                  <div
                    className="inline-flex justify-center relative text inner ml-[15px]"
                    style={{
                      fontSize: getFontSize({
                        count: 7,
                        percent: 13.5,
                        type: "machine",
                      }),
                    }}
                  >
                    <div className="absolute left-[0px] rotate-[90deg]">
                      <SpeedIcon />
                    </div>{" "}
                    <span>{machine.rotation}</span>
                  </div>
                </div>
              </CircularProgress>
            </div>
            <div className="flex justify-between items-end">
              <p></p>
              <p
                className="sub-title"
                style={{
                  fontSize: getFontSize({
                    count: 7,
                    percent: 13,
                    type: "machine",
                  }),
                }}
              >
                <Bolt />
                {machine.efficiency + "%"}
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalCard machine={machine} setOpen={setOpen} />
      </Modal>
    </>
  );
};
