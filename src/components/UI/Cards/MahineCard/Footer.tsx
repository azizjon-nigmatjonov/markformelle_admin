import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { Bolt } from "@mui/icons-material";

interface Props {
  data: any;
  count?: number;
}

export const MachineCardFooter = ({ data = {}, count = 6 }: Props) => {
  const { getFontSize } = useDeviceHeight();
  return (
    <div className="flex justify-between items-end absolute bottom-1 w-full right-1.5 font-semibold">
      <p></p>
      <p
        style={{
          fontSize: getFontSize({
            count,
            percent: 8,
            type: "machine",
          }),
        }}
      >
        <Bolt
          style={{
            fontSize: getFontSize({
              count,
              percent: 9,
              type: "machine",
            }),
          }}
        />
        {data.efficiency + "%"}
      </p>
    </div>
  );
};
