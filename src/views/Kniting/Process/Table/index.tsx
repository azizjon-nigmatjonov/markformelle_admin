import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import { ThirdColumn } from "./ThirdColumn";

export const ProcessTable = () => {
  return (
    <div>
      <div className="grid grid-cols-3 min-h-[100vh]">
        <FirstColumn />
        <SecondColumn />
        <ThirdColumn />
      </div>
    </div>
  );
};
