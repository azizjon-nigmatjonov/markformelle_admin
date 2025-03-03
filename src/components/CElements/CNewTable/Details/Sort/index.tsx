import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";

interface Props {
  colId?: any;
  sortId?: any;
  handleSortLogic: (val: any) => void;
}
export const TableSortFilter = ({
  handleSortLogic = () => {},
  colId,
  sortId,
}: Props) => {
  const [value, setValue] = useState("up");
  const handleClick = (val: string) => {
    setValue(val);
  };

  return (
    <button
      className="w-full h-[40px] flex items-center space-x-4 px-2 hover:bg-[var(--primary50)]"
      onClick={() => {
        handleSortLogic({ type: "sort", id: colId, value });
        handleClick(value === "up" ? "down" : "up");
      }}
    >
      {value !== "down" ? (
        <ArrowDownwardIcon
          style={{
            fontSize: 16,
            color: sortId === colId ? "var(--primary)" : "var(--gray)",
          }}
        />
      ) : (
        <ArrowUpwardIcon
          style={{
            fontSize: 16,
            color: sortId === colId ? "var(--primary)" : "var(--gray)",
          }}
        />
      )}
      <span
        className={`text-sm ${sortId === colId ? "text-[var(--primary)]" : ""}`}
      >
        {value === "down" ? "По возрастанию" : "По убыванию"}
      </span>
    </button>
  );
};
