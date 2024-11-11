import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";

interface Props {
  data: any;
  count?: number;
}

export const MachineCardHeader = ({ data, count = 6 }: Props) => {
  const { getFontSize } = useDeviceHeight();
  return (
    <div className="flex justify-between items-center px-1.5 font-semibold mb-1">
      <div
        className="flex items-center"
        style={{
          fontSize: getFontSize({
            count,
            percent: 10,
            type: "machine",
          }),
        }}
      >
        <ViewDayOutlinedIcon
          style={{
            fontSize: getFontSize({
              count,
              percent: 10,
              type: "machine",
            }),
          }}
        />
        <span> {data.new_rolls ?? 0}</span>
      </div>
      <p
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          fontSize: getFontSize({
            count,
            percent: 13,
            type: "machine",
          }),
        }}
      >
        {data.title}
      </p>
      <div
        style={{
          fontSize: getFontSize({
            count,
            percent: 10,
            type: "machine",
          }),
        }}
      >
        {data.defect_num ?? 0}
      </div>
    </div>
  );
};
