import { Tooltip } from "@mui/material";
import { CloseIcon, SearchIcon } from "../../../../UI/IconGenerator/Svg";

interface Props {
  searchDebounce: (val: any, val2: any) => void;
  colId: any;
  currentValue: any;
  setCurrentValue: (val: any) => void;
  handleKeyDown?: (val: any, val2: any, val3: any) => void;
}

export const SearchField = ({
  searchDebounce = () => {},
  colId,
  setCurrentValue,
  currentValue,
  handleKeyDown = () => {},
}: Props) => {
  return (
    <Tooltip title="Нажмите Enter для поиска" placement="right">
      <div
        className={`relative w-full h-[30px] flex items-center text-[14px] rounded-[8px]`}
      >
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
          <SearchIcon fill="var(--gray)" width={16} />
        </div>
        <input
          type="text"
          placeholder="Поиск"
          onChange={(e: any) => {
            setCurrentValue(e.target.value);
            if (!e.target.value) searchDebounce("", colId);
          }}
          value={currentValue}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              setTimeout(() => {
                handleKeyDown(e, currentValue, colId);
              }, 0);
            }
          }}
          // value={value}
          className="h-[30px] w-full border border-[var(--border)] rounded-[8px] text-[var(--black)]"
          style={{ padding: "0 24px" }}
        />
        <div
          onClick={() => {
            searchDebounce("", colId);
            setCurrentValue("");
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        >
          <CloseIcon />
        </div>
      </div>
    </Tooltip>
  );
};
