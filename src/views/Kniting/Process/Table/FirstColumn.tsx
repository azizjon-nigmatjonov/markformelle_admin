import { useMemo, useState } from "react";
import CCard from "../../../../components/CElements/CCard";
import "./style.scss";
import { Skeleton } from "@mui/material";
import { useCalculateTime } from "../../../../hooks/useCalucaleTime";
import EmptyDataComponent from "../../../../components/UI/EmptyDataComponent";

interface Props {
  data: any;
  isLoading: boolean;
}

export const FirstColumn = ({ data = [], isLoading = true }: Props) => {
  const [effect, setEffect] = useState<string[]>([]);
  const ROTATION_DELAY = 120;

  const { GetTime } = useCalculateTime();

  if (isLoading) {
    return (
      <CCard classes="h-full">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton style={{ height: "250px" }} />
        </div>
      </CCard>
    );
  }

  const newData = useMemo(() => {
    if (!data?.length) return [];
    const arr = data.map((item: any) => {
      return {
        ...item,
        DATE_CONTROL_FOR_TIMER: GetTime(item?.DATE_CONTROL_FOR_TIMER),
      };
    });

    const sortedData = arr.sort((a: any, b: any) => {
      const timeToMinutes = (time: any) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const timeA = timeToMinutes(a.DATE_CONTROL_FOR_TIMER);
      const timeB = timeToMinutes(b.DATE_CONTROL_FOR_TIMER);

      return timeB - timeA;
    });
    return sortedData.map((item: any, index: number) => {
      setTimeout(() => {
        setEffect((prevEffect) => [...prevEffect, item.OBORUD_NUMBER]);
      }, index * ROTATION_DELAY);

      return {
        ...item,
        time: item?.HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL?.substring(0, 4),
      };
    });
  }, [data]);

  if (!newData?.length) {
    return (
      <EmptyDataComponent
        isVisible={true}
        title="Нет готовых клетей для отгрузки!"
      />
    );
  }
  return (
    <div className="h-full">
      <div className="grid flex-col grid-flow-row-dense gap-y-2 h-full grid-rows-4">
        <div className="grid grid-flow-row-dense grid-cols-3 gap-2 row-span-2">
          {/* Big Card */}
          {newData?.slice(0, 1)?.map((item: any) => (
            <div
              key={item.OBORUD_NUMBER}
              className={`card col-span-2 relative h-full ${
                effect.includes(item.OBORUD_NUMBER) ? "rotated" : ""
              }`}
            >
              <div className="frontofcard card bg-[#6cce65] rounded-xl h-full px-2">
                <div className="flex w-full flex-col items-center font-medium h-full justify-center">
                  <h2 className="main-title font-bold title-big">
                    {item.OBORUD_NUMBER}
                  </h2>
                  <p className="text-lg">{item?.ART}</p>
                  <p className="text-2xl">
                    {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                  </p>
                  <p className="text-2xl">{item.COUNT_RECORDS} рулон</p>

                  <p className="text-2xl text-red-700">
                    {item?.DATE_CONTROL_FOR_TIMER}
                  </p>
                </div>
              </div>
              <div className="backofcard card bg-[#6cce65] rounded-xl h-full px-2">
                <div className="flex w-full flex-col items-center font-medium h-full justify-center">
                  <h2 className="main-title font-bold title-big">
                    {item.OBORUD_NUMBER}
                  </h2>
                  <p className="text-2xl">{item?.ART}</p>
                  <p className="text-2xl">
                    {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                  </p>
                  <p className="text-2xl">{item.COUNT_RECORDS} рулон</p>

                  <p className="text-2xl text-red-700">
                    {item?.DATE_CONTROL_FOR_TIMER}
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
                  <div className="flex w-full flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold small_desktop:text-5xl mb-2">
                      {item.OBORUD_NUMBER}
                    </h2>
                    <p className="text-lg">{item?.ART}</p>
                    <p className="text-lg">
                      {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                    </p>
                    <p className="text-lg">{item.COUNT_RECORDS} рулон</p>

                    <p className="text-lg text-red-700">
                      {item?.DATE_CONTROL_FOR_TIMER}
                    </p>
                  </div>
                </div>
                <div className="card backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                  <div className="flex w-full flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold small_desktop:text-5xl mb-2">
                      {item.OBORUD_NUMBER}
                    </h2>
                    <p className="text-lg">{item?.ART}</p>
                    <p className="text-lg">
                      {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                    </p>
                    <p className="text-lg font-semibold">
                      {item.COUNT_RECORDS} рулон
                    </p>
                    <p className="text-lg text-red-700">
                      {item?.DATE_CONTROL_FOR_TIMER}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Row */}
        <div className="grid grid-cols-3 grid-rows-2 gap-2 row-span-2">
          {newData.slice(4, 10).map((item: any) => (
            <div
              key={item.OBORUD_NUMBER}
              className={`h-full card ${
                effect.includes(item.OBORUD_NUMBER) ? "rotated" : ""
              }`}
            >
              <div className="frontofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex flex-col w-full items-center font-medium h-full justify-center">
                  <h2 className="font-bold small_desktop:text-5xl mb-2">
                    {item.OBORUD_NUMBER}
                  </h2>
                  <p className="text-lg">{item?.ART}</p>
                  <p className="text-lg">
                    {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                  </p>
                  <p className="text-lg font-semibold">
                    {item.COUNT_RECORDS} рулон
                  </p>

                  <p className="text-lg text-red-700">
                    {item?.DATE_CONTROL_FOR_TIMER}
                  </p>
                </div>
              </div>
              <div className="backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex w-full flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold small_desktop:text-5xl mb-2">
                    {item.OBORUD_NUMBER}
                  </h2>
                  <p className="text-lg">{item?.ART}</p>
                  <p className="text-lg">
                    {item?.LOT?.substring(0, item?.LOT?.indexOf("(") - 1)}
                  </p>
                  <p className="text-lg font-semibold">
                    {item.COUNT_RECORDS} рулон
                  </p>

                  <p className="text-lg text-red-700">
                    {item?.DATE_CONTROL_FOR_TIMER}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
