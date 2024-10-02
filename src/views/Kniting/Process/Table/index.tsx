import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";

export const ProcessTable = () => {
  return (
    <div>
      <div className="flex p-3 space-x-3" style={{ height: "100vh" }}>
        <div className="w-[50%]">
          <FirstColumn />
        </div>
        <div className="w-[50%]">
          <SecondColumn />
        </div>
        {/* <div className="w-[30%]">
          <ThirdColumn />
        </div> */}
      </div>
    </div>
  );
};
