import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { Field } from "./Field";
import { SearchField } from "./Search";
import { useEffect, useState } from "react";
import { SelectFilter } from "./Select";
// import { CPeriodPicker } from "../../../CPeriodPicker";
interface Props {
  colId?: any;
  filter: any;
  sortData: any;
  closeFilter: () => void;
  handleClick: () => void;
  handleSortLogic: (val: any) => void;
  searchDebounce: (val: any, val2: any) => void;
  searchedElements: any;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  colId,
  closeFilter = () => {},
  searchDebounce = () => {},
  handleClick = () => {},
  searchedElements = {},
  sortData,
}: Props) => {
  return (
    <>
      <div
        className="w-[20px] h-full items-center justify-center"
        onClick={handleClick}
      >
        <div>
          <ExpandMoreIcon style={{ color: "var(--main)" }} />
        </div>
      </div>

      {filter && (
        <div className="absolute top-[90%] left-0 bg-white rounded-[4px] border border-[var(--border)] z-[99] card-shadow overflow-hidden whitespace-nowrap">
          <TableSortFilter
            colId={colId}
            sortId={
              sortData?.find(
                (item: any) => item.value === "sort" && item.id === colId
              )?.id
            }
            defaultValue={
              sortData?.find(
                (item: any) => item.value === "sort" && item.id === colId
              )?.search
            }
            type={"sort"}
            handleSortLogic={handleSortLogic}
          />

          <SearchField
            searchDebounce={searchDebounce}
            colId={colId}
            value={searchedElements?.[colId] ?? ""}
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
  handleSortLogic,
  searchDebounce = () => {},
  headColumns = [],
  searchedElements = {},
  defaultSearch = {},
}: {
  handleClick: () => void;
  sideFilter: boolean;
  searchDebounce: (val: any, val2: any) => void;
  handleSortLogic: (val: any) => void;
  headColumns: any;
  searchedElements: any;
  defaultSearch: any;
}) => {
  const [newHeadColumns, setNewHeadColumns] = useState<any>([]);
  useEffect(() => {
    const arr: any = [];
    headColumns.forEach((item: any) => {
      if (!(item.id in searchedElements)) {
        arr.push({
          label: item.title,
          value: item.id,
        });
      }
    });
    setNewHeadColumns(arr);
  }, [headColumns, searchedElements]);

  return (
    <div
      className={`bg-white relative duration-200  ${
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
        <div className="w-[260px] border-r border-[var(--border)] h-full overflow-y-scroll remove-scroll">
          <h3 className="font-medium h-[35px]">Фильтр</h3>
          {Object.keys(searchedElements).length ? (
            <button
              className="text-[var(--error)] underline text-sm h-[35px]"
              onClick={() =>
                handleSortLogic({
                  value: "clear",
                })
              }
            >
              Очистить фильтр
            </button>
          ) : (
            ""
          )}
          {/* <div className="bg-[var(--border)] w-full h-[1px] my-1"></div>

          <div className="mt-3 px-2">
            <p className="text-[12px] mb-2">Временной фильтр</p>
            <CPeriodPicker
              handleValue={(val: any) =>
                handleSortLogic({ value: "period", search: val ? val : [] })
              }
            />
          </div> */}

          {Object.keys(searchedElements).length ? (
            <div className="border-t border-[var(--border)] mt-4">
              {Object.entries(searchedElements).map(([key, val]: any) => (
                <div key={key} className="border-b border-[var(--border)] pb-2">
                  <Field
                    obj={{
                      title: key,
                      id: key,
                      value: val,
                      close: !(key in defaultSearch),
                    }}
                    searchDebounce={searchDebounce}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          <div className="sticky bottom-0 h-[50px] bg-white left-0 w-full border-t border-[var(--border)] mt-3">
            <SelectFilter
              handleClick={(val: any) =>
                handleSortLogic({
                  value: "add",
                  id: val.value,
                  title: val.label,
                })
              }
              options={newHeadColumns}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
