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
  handleChange: (val: any) => void;
  delay?: number;
  classes?: string;
  list: any;
  defaultValue?: string | number;
  setList: (val: any) => void;
  handleSubmit?: (val: any) => void;
}

const GlobalSearch = ({
  list = [],
  setList = () => {},
  handleChange = () => {},
  delay = 0,
  classes = "",
  defaultValue = "",
  handleSubmit = () => {},
}: Props) => {
  const { t } = useTranslation();
  const [value, setValue]: any = useState(null);
  const [newData, setNewData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const location = useLocation();
  const dispatch: any = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const clearValue = () => {
    setList(list);
    setValue("");
    setOpen(false);
  };
  const [values, setValues]: any = useState([]);
  const searchableFields = useSelector(
    (state: any) => state.globalTool.searchableFields
  );

  const pageName: any = useMemo(() => {
    const strLen =
      location.pathname.split("/")[2].length +
      location.pathname.split("/")[1].length;

    let result = location.pathname.substring(0, strLen + 2);

    return result;
  }, [location]);

  const searchedValues = useMemo(() => {
    return searchableFields[pageName] ?? [];
  }, [pageName, searchableFields]);
  console.log("searchableFields 123", searchableFields);
  console.log("searchedValues", searchedValues);

  const debounce = useDebounce((search: any) => {
    setValue(search);
    handleChange(search);
  }, delay);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleCheck = (el: any) => {
    const newList = list.filter((item: any) => item.id === el.id);
    setList(newList);
  };

  useEffect(() => {
    if (!list?.length) return;

    const arr: any = [];

    list.forEach((obj: any) => {
      const keys = Object.keys(obj);
      for (let key of keys) {
        const value = typeof obj[key] === "object" ? "" : obj[key] + "";
        const data = { label: key, value, id: obj.id };
        if (value) arr.push(data);
      }
    });

    setNewData(arr);
  }, [list]);

  useEffect(() => {
    if (value) {
      setOpen(true);
      const data = newData.filter((item: any) =>
        item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setSearchedData(data);
    } else {
      setSearchedData(newData);
      clearValue();
    }
  }, [value]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      handleSubmit(value);
      clearValue();
    }
  };

  const handleFilterSave = (val: string) => {
    let arr: any = values?.length ? [...values] : [];
    if (arr?.includes(val)) {
      arr = arr.filter((item: string) => item !== val);
    } else {
      setValues([...values, val]);
    }

    dispatch(
      globalToolActions.setSearchFields({
        pageName,
        payload: arr,
      })
    );
  };
  const menuList = useMemo(() => {
    const obj = list?.[0] ?? {};
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
          if (values.includes(id)) {
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
  }, [list, values?.length]);

  return (
    <div
      className={`w-[240px] relative bg-white rounded-[8px] flex border justify-between items-center h-[25px] desktop:h-[35px] px-9 ${
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

      {open ? (
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
            handleChange("");
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
          handleFilterSave={handleFilterSave}
        />
      )}
      {openMenu && <Closer handleClose={() => setOpenMenu(false)} />}
    </div>
  );
};

export default GlobalSearch;
