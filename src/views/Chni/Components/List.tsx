// import { useSelector } from "react-redux";
import MachinCardUI from "../../../components/UI/Cards/MahineCard";
// import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface Props {
  list: any;
}

export const ChniList = ({ list = [] }: Props) => {
  // const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  // const { getHeight } = useDeviceHeight();
  return (
    <div
      className="p-2"
      style={{
        minWidth:
          window?.screen?.width < 940 ? "1600px" : window?.screen?.width - 200,
      }}
    >
      <div className="grid grid-cols-10 grid-rows-6 h-full gap-1.5">
        {list.sort((a: any, b: any) => a.DeviceNo - b.DeviceNo).map((item: any, index: number) => (
          <MachinCardUI key={index} machine={item} />
        ))}
      </div>
    </div>
  );
};
