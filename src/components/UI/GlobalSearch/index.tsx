import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import {
  CloseIcon,
  DotsVerticalIcon,
  SearchIcon,
} from "../../UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";
import { SettingDropdown } from "../../CElements/CTable/Details/TableSettings";
import { Closer } from "../Closer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { globalToolActions } from "../../../store/globalTools";

interface Props {
  delay?: number;
  classes?: string;
  list: any;
  defaultValue?: string | number;
  setList: (val: any) => void;
}

const GlobalSearch = ({
  list = [],
  setList = () => {},
  delay = 0,
  classes = "",
  defaultValue = "",
}: Props) => {
  const { t } = useTranslation();
  const searchFields = useSelector(
    (state: any) => state.globalTool.searchFields
  );
  const [value, setValue]: any = useState(null);
  const [newData, setNewData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const location = useLocation();
  const dispatch: any = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [allCheck, setAllCheck] = useState(true);

  const clearValue = () => {
    setList(initialList);
    setValue("");
    setOpen(false);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const pageName: any = useMemo(() => {
    const strLen =
      location.pathname.split("/")[2].length +
      location.pathname.split("/")[1].length;

    let result = location.pathname.substring(0, strLen + 2);

    return result;
  }, [location]);

  const initialList = useMemo(() => {
    return (
      list?.map((item: any, index: number) => {
        if (item.id) {
          return item;
        } else {
          return {
            ...item,
            id: index,
          };
        }
      }) ?? []
    );
  }, [list]);

  const searchedValues = useMemo(() => {
    if (!searchFields) return [];
    return searchFields[pageName] ?? [];
  }, [pageName, searchFields]);

  const debounce = useDebounce((search: any) => {
    setValue(search);
    if (search) {
      setOpen(true);
      const data = newData.filter((item: any) =>
        item.value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

      setSearchedData(data);
    } else {
      setSearchedData(newData);
      clearValue();
    }
  }, delay);

  const handleCheck = (el: any) => {
    const newList = initialList.filter((item: any) => item.id === el.id);
    setList(newList);
    setValue(el.value);
  };

  useEffect(() => {
    if (!initialList?.length) return;

    const arr: any = [];
    let keys: any = [];
    initialList.forEach((obj: any) => {
      keys = Object.keys(obj);
      for (let key of keys) {
        const value = typeof obj[key] === "object" ? "" : obj[key] + "";
        const data = { label: key, value, id: obj.id };
        if (value) arr.push(data);
      }
    });
    if (keys.length === searchedValues.length) {
      setAllCheck(true);
    }

    if (!searchedValues.length && allCheck) {
      dispatch(
        globalToolActions.setSearchFields({
          pageName,
          payload: keys,
        })
      );
      setNewData(arr);
    } else {
      setNewData(
        arr.filter((item: any) => searchedValues.includes(item.label))
      );
    }
  }, [initialList, searchedValues, allCheck]);

  const menuList = useMemo(() => {
    const obj = initialList?.[0] ?? {};
    const keys = Object.keys(obj);

    return [
      {
        label: "Элемент поиска",
        id: "columns",
        type: "checkbox",
        data: keys?.map((item: any) => {
          let id: any = item;
          const obj: any = {};
          obj.title = item;
          if (id?.[0] && typeof id === "object") {
            id = "";
          }

          if (searchedValues.includes(id)) {
            obj.checked = true;
          } else {
            obj.checked = false;
          }

          return {
            ...obj,
            id,
          };
        }),
      },
    ];
  }, [initialList, searchedValues?.length]);

  const handleFilterSave = (val: string) => {
    let arr: any = searchedValues?.length ? [...searchedValues] : [];
    const obj = initialList?.[0] ?? {};
    const keys = Object.keys(obj);
    if (val === "all") {
      if (allCheck) {
        arr = [];
        setAllCheck(false);
      } else {
        arr = [...keys];
        setAllCheck(true);
      }
      setOpenMenu(false);
      setTimeout(() => {
        setOpenMenu(true);
      }, 100);
    } else {
      if (arr?.includes(val)) {
        setAllCheck(false);
        arr = arr.filter((item: string) => item !== val);
      } else {
        arr = [...arr, val];
      }
    }
    if (arr.length === keys?.length) {
      setAllCheck(true);
    }
    dispatch(
      globalToolActions.setSearchFields({
        pageName,
        payload: arr,
      })
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      clearValue();
    }
  };

  return (
    <div
      className={`w-[180px] desktop:w-[240px] relative bg-white rounded-[8px] flex border justify-between items-center h-[25px] desktop:h-[35px] px-9 ${
        value ? " border-[var(--primary)]" : "border-[var(--border)]"
      }`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <SearchIcon fill={value ? "var(--primary)" : "var(--gray30)"} />
      </div>
      <input
        value={value}
        onChange={(e) => debounce(e.target.value)}
        defaultValue={defaultValue}
        type="text"
        onKeyUp={handleKeyPress}
        placeholder={t("search")}
        className={`min-w-[140px] bg-transparent h-full outline-none text-[var(--black)] placeholder-[var(--gray)] rounded-[8px] ${classes}`}
      />

      {open && searchedData.length ? (
        <div className="absolute left-0 top-full w-full bg-white border border-[var(--border)] card-shadow rounded-[12px] overflow-scroll max-h-[400px] remove-scroll">
          <ul>
            {searchedData?.map((item: any, index: number) => (
              <li
                key={index}
                onClick={() => {
                  handleCheck(item);
                  setOpen(false);
                }}
                className="hover:bg-[var(--border)] py-2 px-3 border-b barder-[var(--border)] cursor-pointer"
              >
                <p>{item.value}</p>
                {/* <div className="w-full flex justify-between whitespace-nowrap space-x-3">
                  <span>{item.label}:</span>
                  <span className="text-[var(--black)] font-medium">
                    {item.value}
                  </span>
                </div> */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      {value?.length ? (
        <button
          onClick={() => {
            clearValue();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          onClick={() => setOpenMenu(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <DotsVerticalIcon />
        </button>
      )}

      {openMenu && (
        <SettingDropdown
          setOpen={setOpen}
          menuList={menuList}
          allCheck={allCheck}
          handleFilterSave={handleFilterSave}
        />
      )}
      {openMenu && <Closer handleClose={() => setOpenMenu(false)} />}
    </div>
  );
};

export default GlobalSearch;
