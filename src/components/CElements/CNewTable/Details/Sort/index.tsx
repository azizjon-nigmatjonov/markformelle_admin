import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  colId?: any;
  sortId?: any;
  type?: string;
  defaultValue?: string;
  handleSortLogic: (val: any) => void;
}
export const TableSortFilter = ({
  handleSortLogic = () => {},
  colId,
  sortId,
  type,
  defaultValue,
}: Props) => {
  return (
    <button
      className={`w-full h-[40px] flex items-center space-x-2 px-2 text-[12px] rounded-[4px] ${
        type === "sort" && sortId ? "bg-[var(--primary50)]" : ""
      }`}
      onClick={() => {
        handleSortLogic({
          value: "sort",
          id: colId,
          search: defaultValue === "up" ? "down" : "up",
        });
      }}
    >
      {defaultValue !== "down" ? (
        <ArrowDownwardIcon
          style={{
            fontSize: 16,
            color: sortId === colId ? "var(--primary)" : "var(--main)",
          }}
        />
      ) : (
        <ArrowUpwardIcon
          style={{
            fontSize: 16,
            color: sortId === colId ? "var(--primary)" : "var(--main)",
          }}
        />
      )}
      <span
        className={`text-sm ${
          sortId === colId ? "text-[var(--primary)]" : "text-[var(--black)]"
        }`}
      >
        {defaultValue === "down" ? "По возрастанию" : "По убыванию"}
      </span>
    </button>
  );
};
