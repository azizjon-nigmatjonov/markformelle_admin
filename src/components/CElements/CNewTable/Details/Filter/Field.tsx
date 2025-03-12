import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { TableSortFilter } from "../Sort";
import { SearchField } from "./Search";

interface Props {
  sortData?: any;
  obj?: any;
  handleSortLogic: (val?: any) => void;
  searchDebounce?: (val: any, val2: any) => void;
  title?: string;
  id?: string;
}

const Closer = ({ handleSortLogic, title }: Props) => {
  return (
    <div className="flex items-center mb-1 mt-3 space-x-1">
      <button onClick={() => handleSortLogic()}>
        <CloseIcon width={18} />
      </button>
      <p className="text-[12px]">{title}</p>
    </div>
  );
};

export const Field = ({
  handleSortLogic,
  obj = {},
  searchDebounce = () => {},
}: Props) => {
  return (
    <div>
      {obj?.value === "sort" || obj.value === "sidebar_all" ? (
        <>
          <Closer
            handleSortLogic={() => {
              handleSortLogic({
                value: obj.value,
                id: obj?.id,
              });
            }}
            title={obj.label}
            id={obj?.id}
          />
          <TableSortFilter
            colId={obj?.id}
            sortId={obj?.id}
            defaultValue={obj?.search}
            handleSortLogic={handleSortLogic}
          />
        </>
      ) : (
        ""
      )}
      {obj?.value === "search" || obj.value === "sidebar_all" ? (
        <>
          <Closer
            handleSortLogic={() => {
              handleSortLogic({
                value: obj.value,
                id: obj?.id,
              });
            }}
            title={obj.label}
            id={obj?.id}
          />
          <SearchField
            searchDebounce={searchDebounce}
            colId={obj?.id}
            sortObj={obj}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};
