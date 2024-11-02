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
  // const [size, setSize] = useState<number>(50);
  const cardRef: any = useRef(null);
  // const updateSize = () => {
  //   if (window.screen.width < 1200 && window.screen.width > 940) {
  //     setSize(cardRef?.current?.clientHeight * 0.69);
  //   } else {
  //     setSize(cardRef?.current?.clientHeight * 0.7);
  //   }
  // };

  // useEffect(() => {
  //   updateSize();

  //   window.addEventListener("resize", updateSize);

  //   return () => {
  //     window.removeEventListener("resize", updateSize);
  //   };
  // }, []);

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
              className={`w-full flex justify-center py-1 absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2`}
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
                  percent: 93,
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
                    style={{
                      fontSize: getFontSize({
                        count: 7,
                        percent: 13.5,
                        type: "machine",
                      }),
                    }}
                  >
                    {/* <div className="absolute top-[0px] right-[40px]">
                      <div className="rotate-[90deg]"></div>
                    </div>{" "} */}
                    <div className="flex items-center justify-center font-semibold pl-5">
                      <div
                        className="rotate-[90deg] mt-[-24px]"
                        style={{
                          marginTop: -getFontSize({
                            count: 7,
                            percent: 20,
                            type: "machine",
                          }),
                        }}
                      >
                        <SpeedIcon
                          style={{
                            fontSize: getFontSize({
                              count: 7,
                              percent: 17,
                              type: "machine",
                            }),
                          }}
                        />
                        {/* <svg
                          width={getFontSize({
                            count: 7,
                            percent: 15,
                            type: "machine",
                          })}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#000"
                        >
                          <path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.793 12.793 12.2072 14.2072 16.7072 9.70718 15.293 8.29297Z"></path>
                        </svg> */}
                      </div>
                      <span className="ml-[2px]">{machine.rotation}</span>
                    </div>
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
