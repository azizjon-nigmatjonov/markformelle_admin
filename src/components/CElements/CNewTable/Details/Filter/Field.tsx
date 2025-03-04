import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { TableSortFilter } from "../Sort";
import { OrderUI } from "./Order";
import { SearchField } from "./Search";

interface Props {
  title: string;
  sortData?: any;
  type?: string;
  handleSortLogic: (val: any) => void;
  searchDebounce?: (val: any, val2: any) => void;
  tableActions?: (val: any, val2: any) => void;
}

const Closer = ({ handleSortLogic, title }: Props) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <p className="text-[12px]">{title}</p>
      <button
        onClick={() =>
          handleSortLogic({
            value: "",
          })
        }
      >
        <CloseIcon width={16} />
      </button>
    </div>
  );
};

export const Field = ({
  handleSortLogic,
  title,
  sortData,
  type,
  tableActions = () => {},
  searchDebounce = () => {},
}: Props) => {
  const obj = sortData.find((item: any) => item.value === type);
  return (
    <div>
      <Closer handleSortLogic={handleSortLogic} title={title} />
      {obj?.value === "sort" && (
        <TableSortFilter
          colId={obj?.id}
          sortId={obj?.id}
          handleSortLogic={handleSortLogic}
        />
      )}
      {obj?.value === "search" && (
        <SearchField
          searchDebounce={searchDebounce}
          colId={obj?.id}
          sortObj={obj}
        />
      )}
      {obj?.value === "reorder" && (
        <OrderUI tableActions={tableActions} sortObj={obj} />
      )}
    </div>
  );
};
