import { Tooltip } from "@mui/material";
import { CloseIcon, SearchIcon } from "../../../../UI/IconGenerator/Svg";

interface Props {
  value: any;
  searchDebounce: (val: any, val2: any) => void;
  colId: any;
  handleKeyDown?: (val: {}) => void;
}

export const SearchField = ({
  value,
  searchDebounce = () => {},
  colId,
  handleKeyDown = () => {},
}: Props) => {
  return (
    <Tooltip
      title="Нажмите «Enter» для поиска"
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -5],
              },
            },
          ],
        },
      }}
    >
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
          onKeyDown={(e: {}) => handleKeyDown(e)}
          value={value}
          className="ml-6 h-full w-full border border-[var(--border)] rounded-[4px] text-[var(--black)] pl-1 pr-3"
          style={{ padding: "0" }}
        />
        <div
          onClick={() => searchDebounce("", colId)}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        >
          <CloseIcon />
        </div>
      </div>
    </Tooltip>
  );
};
