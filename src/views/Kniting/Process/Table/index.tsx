import { useSelector } from "react-redux";
import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";

export const ProcessTable = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  return (
    <div>
      <div
        className="flex p-3 space-x-2 small_desktop:space-x-3"
        style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
      >
        <div className="w-[48%]">
          <FirstColumn />
        </div>
        <div className="w-[52%]">
          <SecondColumn />
        </div>
        {/* <div className="w-[30%]">
          <ThirdColumn />
        </div> */}
      </div>
    </div>
  );
};
