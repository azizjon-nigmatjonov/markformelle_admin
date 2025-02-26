import MachinCardUI from "../../../components/UI/Cards/MahineCard";

interface Props {
  list: any;
}

export const ChniList = ({ list = [] }: Props) => {
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
