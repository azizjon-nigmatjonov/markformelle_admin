import useTimer from "../../../../hooks/useTimer";

export const MiniCard = ({ element = {} }: { element: any }) => {
  const { timerFN } = useTimer();
  return (
    <div className="bg-[#6cce65] rounded-xl flex items-center justify-center text-2xl h-full">
      <div className="flex flex-col items-center font-medium h-full justify-center">
        <h2 className="font-bold">A-031</h2>

        <p className="text-sm">31 рулон</p>

        <p className="text-sm text-red-700">{timerFN()}</p>
      </div>
    </div>
  );
};

export const BigCard = ({ element = {} }: { element: any }) => {
  const { timerFN } = useTimer();
  return (
    <div className={`card relative w-full h-full`}>
      <div className="bg-[#6cce65] rounded-xl h-full px-2">
        <div className="frontofcard flex flex-col items-center font-medium h-full justify-center">
          <h2 className="text-[80px] font-bold">{element.name}</h2>

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
  );
};
