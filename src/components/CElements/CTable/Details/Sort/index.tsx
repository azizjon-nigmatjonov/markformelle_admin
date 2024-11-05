import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";

interface Props {
  type: string;
  colId?: any;
  handleSortLogic: (val: any) => void;
}
export const TableSort = ({
  type = "",
  handleSortLogic = () => {},
  colId,
}: Props) => {
  const [value, setValue] = useState("up");
  const handleClick = (val: string) => {
    setValue(val);
  };

  return (
    <>
      <button
        onClick={() => {
          handleSortLogic({ type, id: colId, value });
          handleClick(value === "up" ? "down" : "up");
        }}
      >
        {value === "down" ? (
          <ArrowDownwardIcon style={{ fontSize: 16 }} />
        ) : (
          <ArrowUpwardIcon style={{ fontSize: 16 }} />
        )}
      </button>
    </>
  );
};
