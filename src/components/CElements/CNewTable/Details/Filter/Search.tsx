import { SearchIcon } from "../../../../UI/IconGenerator/Svg";

interface Props {
  sortObj: any;
  searchDebounce: (val: any, val2: any) => void;
  colId: any;
}

export const SearchField = ({
  sortObj,
  searchDebounce = () => {},
  colId,
}: Props) => {
  return (
    <div
      className={`relative w-full h-[40px] flex items-center p-2 text-[12px] rounded-[4px] hover:bg-[var(--primary50)] ${
        sortObj?.value === "search" && sortObj?.search
          ? "bg-[var(--primary50)]"
          : ""
      }`}
    >
      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <SearchIcon fill="black" width={16} />
      </div>
      <input
        type="text"
        placeholder=""
        onChange={(e: any) => {
          searchDebounce(e.target.value, colId);
        }}
        value={sortObj?.search ?? ""}
        className="ml-8 h-full w-full border border-[var(--border)] rounded-[4px]"
        style={{ padding: "0" }}
      />
    </div>
  );
};
