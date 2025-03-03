import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";

interface Props {
  colId?: any;
  sortId?: any;
  filter: any;
  closeFilter: () => void;
  handleSortLogic: (val: any) => void;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  sortId,
  colId,
  closeFilter = () => {},
}: Props) => {
  return (
    <>
      <div className="group-hover:flex hidden absolute right-10">
        <ExpandMoreIcon style={{ color: "var(--gray)" }} />
      </div>

      {filter && (
        <div className="absolute w-[300px] top-[90%] right-10 bg-white rounded-[4px] border border-[var(--border)] z-[99] shadow-xl overflow-hidden">
          <TableSortFilter
            colId={colId}
            sortId={sortId}
            handleSortLogic={handleSortLogic}
          />
        </div>
      )}
      {filter && (
        <div
          className="w-full h-full fixed left-0 top-0 z-[98] cursor-text"
          onClick={() => closeFilter()}
        ></div>
      )}
    </>
  );
};

export const SideFilter = ({
  handleClick,
  sideFilter,
}: {
  handleClick: () => void;
  sideFilter: boolean;
}) => {
  return (
    <div
      className={`bg-white rounded-[4px] relative duration-200 ${
        sideFilter ? "w-[240px]" : "w-0 -ml-2"
      }`}
    >
      <button className="absolute right-2 top-2" onClick={() => handleClick()}>
        <CloseIcon />
      </button>
    </div>
  );
};
