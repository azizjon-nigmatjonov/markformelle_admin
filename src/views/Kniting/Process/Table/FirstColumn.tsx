import { useMemo, useState } from "react";
import CCard from "../../../../components/CElements/CCard";
import useTimer from "../../../../hooks/useTimer";
import "./style.scss";
import { Skeleton } from "@mui/material";

interface Props {
  data: any;
  isLoading: boolean;
}

export const FirstColumn = ({ data = [], isLoading = true }: Props) => {
  const { timerFN } = useTimer();
  const [effect, setEffect] = useState<string[]>([]);
  const ROTATION_DELAY = 120;

  const newData = useMemo(() => {
    if (!data?.length) return [];
    const arr =
      data?.sort((a: any, b: any) => b.COUNT_RECORDS - a.COUNT_RECORDS) ?? [];

    return arr.map((item: any, index: number) => {
      setTimeout(() => {
        setEffect((prevEffect) => [...prevEffect, item.OBORUD_NUMBER]);
      }, index * ROTATION_DELAY);

      return {
        ...item,
        time: item?.HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL?.substring(0, 4),
      };
    });
  }, [data]);

  if (isLoading) {
    return (
      <CCard classes="h-full">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton style={{ height: "150px" }} />
          <Skeleton style={{ height: "150px" }} />
        </div>
      </CCard>
    );
  }

  return (
    <CCard classes="h-full">
      <div className="grid flex-col grid-flow-row-dense gap-y-2 h-full grid-rows-4">
        <div className="grid grid-flow-row-dense grid-cols-3 gap-2 row-span-2">
          {/* Big Card */}
          {newData?.slice(0, 1).map((item: any) => (
            <div
              key={item.OBORUD_NUMBER}
              className={`card col-span-2 relative h-full ${
                effect.includes(item.OBORUD_NUMBER) ? "rotated" : ""
              }`}
            >
              <div className="frontofcard card bg-[#6cce65] rounded-xl h-full px-2">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="main-title font-bold title-big mb-2">
                    {item.OBORUD_NUMBER}
                  </h2>

                  <p className="main-sub-text">{item.COUNT_RECORDS} рулон</p>

                  <p className="main-sub-text text-red-700">{item?.time}</p>
                </div>
              </div>
              <div className="backofcard card bg-[#6cce65] rounded-xl h-full px-2">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="main-title font-bold title-big mb-2">
                    {item.OBORUD_NUMBER}
                  </h2>

                  <p className="main-sub-text">{item.COUNT_RECORDS} рулон</p>

                  <p className="main-sub-text text-red-700">
                    {item?.time || timerFN()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Mini Cards Row */}
          <div className="grid grid-cols-1 grid-rows-2 gap-2">
            {newData.slice(1, 3).map((item: any) => (
              <div
                key={item.OBORUD_NUMBER}
                className={`h-full card ${
                  effect.includes(item.OBORUD_NUMBER) ? "rotated" : ""
                }`}
              >
                <div className="card frontofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                  <div className="flex flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold title mb-2">
                      {item.OBORUD_NUMBER}
                    </h2>

                    <p className="sub-text font-semibold">
                      {item.COUNT_RECORDS} рулон
                    </p>

                    <p className="sub-text text-red-700">
                      {item.time || timerFN()}
                    </p>
                  </div>
                </div>
                <div className="card backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                  <div className="flex flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold small_desktop:text-5xl mb-2">
                      {item.name}
                    </h2>

                    <p className="sub-text font-semibold">
                      {item.COUNT_RECORDS} рулон
                    </p>
                    <p className="sub-text text-red-700">
                      {item.time || timerFN()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Row */}
        <div className="grid grid-cols-3 gap-2 row-span-2">
          {newData.slice(4, 12).map((item: any) => (
            <div
              key={item.name}
              className={`h-full card ${
                effect.includes(item.name) ? "rotated" : ""
              }`}
            >
              <div className="frontofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="sub-title font-bold small_desktop:text-5xl mb-2">
                    {item.name}
                  </h2>

                  <p className="sub-text font-semibold">
                    {item.COUNT_RECORDS} рулон
                  </p>

                  <p className="sub-text text-red-700">
                    {item.time || timerFN()}
                  </p>
                </div>
              </div>
              <div className="backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold small_desktop:text-5xl mb-2">
                    {item.name}
                  </h2>

                  <p className="sub-text font-semibold">
                    {item.COUNT_RECORDS} рулон
                  </p>

                  <p className="sub-text text-red-700">
                    {item.time || timerFN()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CCard>
  );
};
