import { useEffect, useState } from "react";
import CCard from "../../../../components/CElements/CCard";
import useTimer from "../../../../hooks/useTimer";
import "./style.scss";
import { MachineConstantList } from "../../../../constants/machines";

export const FirstColumn = () => {
  const { timerFN } = useTimer();
  const [effect, setEffect] = useState<string[]>([]);
  const [newList, setNewList] = useState<any[]>([]);

  // Delay time between each card rotation
  const ROTATION_DELAY = 120;

  useEffect(() => {
    let arr: any = [];

    MachineConstantList.forEach((item: any, index: number) => {
      if (index < 40 && index > 29) {
        arr.push({
          ...item,
          roll_count: index,
        });
      }
    });

    const reversedList = arr.reverse();
    setNewList(reversedList);
  }, []);

  // Sequential card rotation logic
  useEffect(() => {
    if (newList.length > 0) {
      rotateCardsSequentially();
    }
  }, [newList]);

  const rotateCardsSequentially = () => {
    newList.forEach((item, index) => {
      setTimeout(() => {
        setEffect((prevEffect) => [...prevEffect, item.name]);
      }, index * ROTATION_DELAY); // Delay each card rotation by 4 seconds
    });
  };

  return (
    <CCard classes="h-full">
      <div className="grid flex-col grid-flow-row-dense gap-y-2 h-full grid-rows-4">
        <div className="grid grid-flow-row-dense grid-cols-3 gap-2 row-span-2">
          {/* Big Card */}
          {newList?.slice(0, 1).map((item) => (
            <div
              key={item.name}
              className={`card col-span-2 relative h-full ${
                effect.includes(item.name) ? "rotated" : ""
              }`}
            >
              <div className="bg-[#6cce65] rounded-xl h-full px-2">
                <div className="frontofcard flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="text-6xl small_desktop:text-[120px] font-bold title-big mb-2">
                    {item.name}
                  </h2>

                  <p className="text-5xl small_desktop:text-[60px]">
                    {item.roll_count} рулон
                  </p>

                  <p className="text-5xl small_desktop:text-[60px] text-red-700">
                    {timerFN()}
                  </p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl h-full px-2 backofcard">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="text-6xl small_desktop:text-[120px] font-bold title-big mb-2">
                    {item.name}
                  </h2>

                  <p className="text-5xl small_desktop:text-[60px]">
                    {item.roll_count} рулон
                  </p>

                  <p className="text-5xl small_desktop:text-[60px] text-red-700">
                    {timerFN()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Mini Cards Row */}
          <div className="grid grid-cols-1 grid-rows-2 gap-2">
            {newList.slice(1, 3).map((item) => (
              <div
                key={item.name}
                className={`h-full card ${
                  effect.includes(item.name) ? "rotated" : ""
                }`}
              >
                <div className="frontofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                  <div className="flex flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold small_desktop:text-5xl mb-2">
                      {item.name}
                    </h2>

                    <p className="text-sm small_desktop:text-3xl font-semibold">
                      {item.roll_count} рулон
                    </p>

                    <p className="text-sm small_desktop:text-3xl text-red-700">
                      {timerFN()}
                    </p>
                  </div>
                </div>
                <div className="backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                  <div className="flex flex-col items-center font-medium h-full justify-center">
                    <h2 className="font-bold small_desktop:text-5xl mb-2">
                      {item.name}
                    </h2>

                    <p className="text-sm small_desktop:text-3xl font-semibold">
                      {item.roll_count} рулон
                    </p>

                    <p className="text-sm small_desktop:text-3xl text-red-700">
                      {timerFN()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Row */}
        <div className="grid grid-cols-3 gap-2 row-span-2">
          {newList.slice(4, 12).map((item) => (
            <div
              key={item.name}
              className={`h-full card ${
                effect.includes(item.name) ? "rotated" : ""
              }`}
            >
              <div className="frontofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold small_desktop:text-5xl mb-2">
                    {item.name}
                  </h2>

                  <p className="text-sm small_desktop:text-3xl font-semibold">
                    {item.roll_count} рулон
                  </p>

                  <p className="text-sm small_desktop:text-3xl text-red-700">
                    {timerFN()}
                  </p>
                </div>
              </div>
              <div className="backofcard bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold small_desktop:text-5xl mb-2">
                    {item.name}
                  </h2>

                  <p className="text-sm small_desktop:text-3xl font-semibold">
                    {item.roll_count} рулон
                  </p>

                  <p className="text-sm small_desktop:text-3xl text-red-700">
                    {timerFN()}
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
