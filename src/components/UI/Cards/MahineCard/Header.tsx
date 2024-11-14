import useDeviceHeight from "../../../../hooks/useDeviceHeight";

interface Props {
  data: any;
  count?: number;
}

export const MachineCardHeader = ({ data = {}, count = 6 }: Props) => {
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 1;
  return (
    <div className="flex justify-between items-center px-1.5 font-semibold mb-1">
      {/* <div
        className="flex items-center"
        style={{
          fontSize: getFontSize({
            count,
            percent: height > 1200 ? 15 : 10,
            type: "machine",
          }),
        }}
      >
        <ViewDayOutlinedIcon
          style={{
            fontSize: getFontSize({
              count,
              percent: height > 1200 ? 15 : 10,
              type: "machine",
            }),
          }}
        />
        <span> {data.new_rolls ?? 0}</span>
      </div> */}
      <p
        className="text-center w-full"
        style={{
          fontSize: getFontSize({
            count,
            percent: height > 1200 ? 18 : 13,
            type: "machine",
          }),
        }}
      >
        {data.title}
      </p>
      {/* <div
        style={{
          fontSize: getFontSize({
            count,
            percent: height > 1200 ? 15 : 10,
            type: "machine",
          }),
        }}
      >
        {data.defect_num ?? 0}
      </div> */}
    </div>
  );
};
