import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Field } from "./Field";
import { SearchField } from "./Search";
import { useEffect, useState } from "react";
import { SelectFilter } from "./Select";
interface Props {
  colId?: any;
  filter: any;
  sortData: any;
  closeFilter: () => void;
  handleSortLogic: (val: any) => void;
  searchDebounce: (val: any, val2: any) => void;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  colId,
  closeFilter = () => {},
  searchDebounce = () => {},
  sortData,
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
            sortObj={sortData?.find(
              (item: any) =>
                item.value === "search" && item.id === colId && item.search
            )}
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
  headColumns = [],
}: {
  sortData: any;
  handleClick: () => void;
  sideFilter: boolean;
  searchDebounce: (val: any, val2: any) => void;
  handleSortLogic: (val: any) => void;
  headColumns: any;
}) => {
  const [activeElements, setActiveElements] = useState<any>([]);
  const [newHeadColumns, setNewHeadColumns] = useState<any>([]);

  useEffect(() => {
    const obj: any = {};
    sortData.forEach((item: any) => {
      if (item.title in obj) {
        obj[item.title].push(item);
      } else {
        obj[item.title] = [item];
      }
    });
    setActiveElements(obj);
  }, [sortData]);

  useEffect(() => {
    const arr: any = [];
    headColumns.forEach((item: any) => {
      if (!sortData.find((item2: any) => item2.id === item.id)) {
        arr.push({
          label: item.title,
          value: item.id,
        });
      }
    });
    setNewHeadColumns(arr);
  }, [headColumns, sortData]);

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
        <div className="p-2 w-[260px] pr-5 border-r border-[var(--border)] h-full max-h-[500px] overflow-y-scroll remove-scroll">
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

          {Object.entries(activeElements).map(([key, arr]: any) => (
            <div key={key} className="border-b border-[var(--border)] pb-2">
              <h2 className="pt-2 text-[12px] font-semibold">{key}</h2>

              {arr.map((item: any) => (
                <Field
                  handleSortLogic={handleSortLogic}
                  obj={{
                    ...item,
                    label:
                      item.value === "search"
                        ? "Поиск"
                        : item.value === "sort"
                        ? "Сортировка элементов"
                        : "Изменить порядок",
                  }}
                  searchDebounce={searchDebounce}
                />
              ))}
            </div>
          ))}

          <SelectFilter
            handleClick={(val: any) =>
              handleSortLogic({
                value: "sidebar_all",
                id: val.value,
                title: val.label,
              })
            }
            options={newHeadColumns}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
