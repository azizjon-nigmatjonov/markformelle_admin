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
      <div className="w-[20px] h-full items-center justify-center">
        <div className="group-hover:flex hidden">
          <ExpandMoreIcon style={{ color: "var(--gray)" }} />
        </div>
      </div>

      {filter && (
        <div className="absolute w-[200px] top-[90%] left-0 bg-white rounded-[4px] border border-[var(--border)] z-[99] shadow-xl overflow-hidden">
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
            className={`w-full flex h-[35px] items-center space-x-4 p-2 hover:bg-[var(--primary50)]`}
          >
            <FilterAltOffIcon style={{ fontSize: 16, color: "var(--main)" }} />
            <span className="text-[var(--black)]">Очистить фильтр</span>
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
  // const [addFilter, setAddFilter] = useState(false);
  return (
    <div
      className={`bg-white relative duration-200 pt ${
        sideFilter ? "w-[260px] pt-5" : "w-0 -ml-5"
      }`}
    >
      {sideFilter && (
        <button
          className="absolute right-2 top-4"
          onClick={() => handleClick()}
        >
          <CloseIcon width={24} />
        </button>
      )}
      {sideFilter ? (
        <div className="p-2 w-[260px] pr-5 border-r border-[var(--border)] h-full">
          <h3 className="font-medium h-[35px]">Представления</h3>
          <button
            className="link-btn h-[35px]"
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

          {/* <button
            onClick={() => setAddFilter(true)}
            className="w-full h-[35px] flex items-center justify-center text-[var(--main)] font-medium mt-2"
          >
            <PlusIcon fill="var(--main)" />
            <span>Фильтр</span>
          </button>

          <CSelect options={[{ label: "Фильтр", value: "filter" }]} /> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
