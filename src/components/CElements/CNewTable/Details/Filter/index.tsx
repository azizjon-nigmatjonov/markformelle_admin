import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { Field } from "./Field";
import { useEffect, useState } from "react";
import { SelectFilter } from "./Select";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { ArrowLeftIcon } from "@mui/x-date-pickers-pro";
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
  disabled: boolean;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  colId,
  closeFilter = () => {},
  // searchDebounce = () => {},
  handleClick = () => {},
  // searchedElements = {},
  sortData,
  disabled = false,
}: Props) => {
  return (
    <>
      <div
        className="w-[20px] h-full items-center justify-center"
        onClick={handleClick}
      >
        <div>
          <ExpandMoreIcon
            style={{ color: disabled ? "var(--gray)" : "var(--main)" }}
          />
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

          {/* <SearchField
            searchDebounce={searchDebounce}
            colId={colId}
            value={searchedElements?.[colId] ?? ""}
          /> */}
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
  addAndRemoveFilter = () => {},
  searchDebounce = () => {},
  headColumns = [],
  searchedElements = {},
  defaultSearch = {},
  handleKeyDown = () => {},
}: {
  handleClick: () => void;
  sideFilter: boolean;
  searchDebounce: (val: any, val2: any) => void;
  addAndRemoveFilter: (val: any) => void;
  handleSortLogic: (val: any) => void;
  headColumns: any;
  searchedElements: any;
  defaultSearch: any;

  handleKeyDown: (val: any, val2: any, val3: any) => void;
}) => {
  const [newHeadColumns, setNewHeadColumns] = useState<any>([]);
  const { t } = useTranslationHook();

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
  // console.log("searchedElements", searchedElements);

  return (
    <div
      className={`bg-[var(--bg)] relative duration-200  ${
        sideFilter ? "w-[240px]" : "w-0"
      }`}
    >
      {sideFilter && (
        <button
          className="absolute right-2 top-4"
          onClick={() => handleClick()}
        >
          <ArrowLeftIcon style={{ width: "30px" }} />
        </button>
      )}

      {sideFilter ? (
        <div className="w-[240px] border-r border-[var(--border)] h-full overflow-y-scroll remove-scroll py-3">
          <h3 className="font-medium h-[30px] pl-2">Фильтр</h3>
          {Object.keys(searchedElements).length ? (
            <button
              className="text-[var(--error)] underline text-sm h-[30px] pl-2"
              onClick={() =>
                handleSortLogic({
                  value: "clear",
                })
              }
            >
              {t("clear_filter")}
            </button>
          ) : (
            ""
          )}
          {/* <Field
            obj={{
              title: t("test"),
              id: "test",
              value: "",
              close: false,
            }}
            addAndRemoveFilter={addAndRemoveFilter}
            handleKeyDown={handleKeyDown}
            searchDebounce={searchDebounce}
          /> */}
          {Object.keys(searchedElements).length ? (
            <div className="border-t border-[var(--border)] mt-4">
              {Object.entries(searchedElements).map(([key, val]: any) => (
                <div key={key} className="border-b border-[var(--border)] pb-2">
                  <Field
                    obj={{
                      title: t(key),
                      id: key,
                      value: val,
                      close: !(key in defaultSearch),
                    }}
                    addAndRemoveFilter={addAndRemoveFilter}
                    handleKeyDown={handleKeyDown}
                    searchDebounce={searchDebounce}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          <div className="sticky bottom-0 h-[50px] bg-[var(--bg)] left-0 w-full mt-3">
            <SelectFilter
              handleClick={(val: any) =>
                addAndRemoveFilter({
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
