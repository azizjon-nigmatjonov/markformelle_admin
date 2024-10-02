import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import { ThirdColumn } from "./ThirdColumn";

export const ProcessTable = () => {
  return (
    <div>
      <div className="flex min-h-[100vh]">
        <div className="w-[45%]">
          <FirstColumn />
        </div>
        <div className="w-[25%]">
          <SecondColumn />
        </div>
        <div className="w-[30%]">
          <ThirdColumn />
        </div>
      </div>
    </div>
  );
};
