import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Field } from "./Field";
import { SearchField } from "./Search";
import { OrderUI } from "./Order";
interface Props {
  colId?: any;
  filter: any;
  sortData: any;
  closeFilter: () => void;
  handleSortLogic: (val: any) => void;
  searchDebounce: (val: any, val2: any) => void;
  tableActions: (val: any, val2: any) => void;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  colId,
  closeFilter = () => {},
  searchDebounce = () => {},
  sortData,
  tableActions,
}: Props) => {
  return (
    <>
      <div className="group-hover:flex hidden absolute right-5">
        <ExpandMoreIcon style={{ color: "var(--gray)" }} />
      </div>

      {filter && (
        <div className="absolute w-[300px] top-[90%] right-5 bg-white rounded-[4px] border border-[var(--border)] z-[99] shadow-xl overflow-hidden">
          <TableSortFilter
            colId={colId}
            sortId={sortData?.find((item: any) => item.value === "sort")?.id}
            type={"sort"}
            handleSortLogic={handleSortLogic}
          />

          <SearchField
            searchDebounce={searchDebounce}
            colId={colId}
            sortObj={sortData?.find((item: any) => item.value === "search")}
          />

          <OrderUI
            tableActions={tableActions}
            sortObj={sortData?.find((item: any) => item.value === "reorder")}
          />

          <button
            onClick={() => {
              handleSortLogic({
                value: "",
              });
              closeFilter();
            }}
            className={`w-full flex h-[40px] items-center space-x-4 p-2 hover:bg-[var(--primary50)]`}
          >
            <FilterAltOffIcon style={{ fontSize: 16, color: "var(--error)" }} />
            <span className="text-[var(--error)]">Очистить фильтр</span>
          </button>
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
  sortData = [],
  handleSortLogic,
  searchDebounce = () => {},
  tableActions,
}: {
  sortData: any;
  handleClick: () => void;
  sideFilter: boolean;
  searchDebounce: (val: any, val2: any) => void;
  handleSortLogic: (val: any) => void;
  tableActions: (val: any, val2: string) => void;
}) => {
  return (
    <div
      className={`bg-white relative duration-200 ${
        sideFilter ? "w-[260px]" : "w-0 -ml-5"
      }`}
    >
      <button className="absolute right-2 top-2" onClick={() => handleClick()}>
        <CloseIcon width={24} />
      </button>
      {sideFilter ? (
        <div className="p-2">
          <h3 className="font-medium h-[40px]">Представления</h3>
          <button
            className="link-btn h-[40px]"
            onClick={() =>
              handleSortLogic({
                value: "",
              })
            }
          >
            Все
          </button>
          <div className="bg-[var(--border)] w-full h-[1px] my-1"></div>

          {sortData.find((item: any) => item.value === "search") && (
            <Field
              handleSortLogic={handleSortLogic}
              title="Поиск"
              sortData={sortData}
              type="search"
              searchDebounce={searchDebounce}
            />
          )}

          {sortData.find((item: any) => item.value === "sort") && (
            <Field
              handleSortLogic={handleSortLogic}
              title="Сортировка элементов"
              sortData={sortData}
              type="sort"
            />
          )}

          {sortData.find((item: any) => item.value === "reorder") && (
            <Field
              handleSortLogic={handleSortLogic}
              title="Изменить порядок"
              sortData={sortData}
              searchDebounce={searchDebounce}
              type="reorder"
              tableActions={tableActions}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
