import { CloseIcon, SearchIcon } from "../../../../UI/IconGenerator/Svg";

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
      className={`relative w-full h-[40px] flex items-center p-2 text-[12px] rounded-[4px]`}
    >
      <div className="absolute top-1/2 left-2 -translate-y-1/2">
        <SearchIcon fill="var(--main)" width={16} />
      </div>
      <input
        type="text"
        placeholder=""
        onChange={(e: any) => {
          searchDebounce(e.target.value, colId);
        }}
        value={sortObj?.search ?? ""}
        className="ml-6 h-full w-full border border-[var(--border)] rounded-[4px] text-[var(--black)] pl-1 pr-3"
        style={{ padding: "0" }}
      />
      <div
        onClick={() => searchDebounce("", colId)}
        className="absolute top-1/2 right-2 -translate-y-1/2"
      >
        <CloseIcon />
      </div>
    </div>
  );
};
