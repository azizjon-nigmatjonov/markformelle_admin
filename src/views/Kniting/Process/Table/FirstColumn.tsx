import { useState } from "react";
import CCard from "../../../../components/CElements/CCard";
import useTimer from "../../../../hooks/useTimer";
import "./style.scss";

export const FirstColumn = () => {
  const { timerFN } = useTimer();
  const [effect, setEffect] = useState(false);

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-y-3 h-full">
      <CCard classes="h-full">
        <div className="flex flex-col space-y-2 h-full">
          <div className="grid grid-cols-2 gap-2 h-[75%]">
            <div
              onClick={() => setEffect(true)}
              className={`card relative w-full h-full ${
                effect ? "rotated" : ""
              }`}
            >
              <div className="bg-[#6cce65] rounded-xl h-full px-2">
                <div className="frontofcard flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="text-[80px] font-bold">A-046</h2>

                  <p className="text-[36px]">34 рулон</p>

                  <p className="text-[36px] text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl h-full px-2 backofcard">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="text-[80px] font-bold">A-034</h2>

                  <p className="text-[36px]">30 рулон</p>

                  <p className="text-[36px] text-red-700">{timerFN()}</p>
                </div>
              </div>
            </div>

            {/* Mini Cards Row */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2">
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
              <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
                <div className="flex flex-col items-center font-medium h-full justify-center">
                  <h2 className="font-bold">A-031</h2>

                  <p className="text-sm">31 рулон</p>

                  <p className="text-sm text-red-700">{timerFN()}</p>
                </div>
              </div>
            </div>

            {/* Big Card */}
          </div>

          {/* Last Row */}
          <div className="grid grid-cols-6 gap-x-2 h-[25%]">
            <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
              <div className="flex flex-col items-center font-medium h-full justify-center">
                <h2 className="font-bold">A-031</h2>

                <p className="text-sm">31 рулон</p>

                <p className="text-sm text-red-700">{timerFN()}</p>
              </div>
            </div>
            <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
              <div className="flex flex-col items-center font-medium h-full justify-center">
                <h2 className="font-bold">A-031</h2>

                <p className="text-sm">31 рулон</p>

                <p className="text-sm text-red-700">{timerFN()}</p>
              </div>
            </div>
            <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
              <div className="flex flex-col items-center font-medium h-full justify-center">
                <h2 className="font-bold">A-031</h2>

                <p className="text-sm">31 рулон</p>

                <p className="text-sm text-red-700">{timerFN()}</p>
              </div>
            </div>
            <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-auto">
              <div className="flex flex-col items-center font-medium h-full justify-center">
                <h2 className="font-bold">A-031</h2>

                <p className="text-sm">31 рулон</p>

                <p className="text-sm text-red-700">{timerFN()}</p>
              </div>
            </div>
          </div>
        </div>
      </CCard>

      <CCard classes="h-full">
        <div className="grid grid-cols-6 grid-rows-4 gap-2 h-full">
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
          <div className="bg-[#ff9c27] rounded-xl flex items-center justify-center text-2xl">
            <div className="flex flex-col items-center font-medium h-full justify-center">
              <h2 className="font-bold">A-046</h2>

              <p className="text-sm">20 рулон</p>

              <p className="text-sm text-red-700">{timerFN()}</p>
            </div>
          </div>
        </div>
      </CCard>
    </div>
  );
};
