import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableSortFilter } from "../Sort";
import { CloseIcon } from "../../../../UI/IconGenerator/Svg";
import { Field } from "./Field";
import { SearchField } from "./Search";
import { useEffect, useState } from "react";
import { SelectFilter } from "./Select";
interface Props {
  colId?: any;
  filter: any;
  sortData: any;
  closeFilter: () => void;
  handleClick: () => void;
  handleSortLogic: (val: any) => void;
  searchDebounce: (val: any, val2: any) => void;
}

export const TableFilter = ({
  filter,
  handleSortLogic,
  colId,
  closeFilter = () => {},
  searchDebounce = () => {},
  handleClick = () => {},
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
            sortObj={sortData?.find(
              (item: any) =>
                item.value === "search" && item.id === colId && item.search
            )}
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
      if (item.value === "search") {
        if (item.title in obj) {
          obj[item.title].push(item);
        } else {
          obj[item.title] = [item];
        }
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
        <div className="p-2 w-[260px] pr-5 border-r border-[var(--border)] h-full overflow-y-scroll remove-scroll">
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

          <div className="absolute bottom-0 h-[50px] bg-white left-0 w-full border-t border-r border-[var(--border)]">
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
