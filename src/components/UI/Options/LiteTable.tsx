import { useEffect, useRef, useState } from "react";
import CLabel from "../../CElements/CLabel";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { TableUI } from "./LiteTable/TableUI";
import { useFetchType } from "../../../hooks/useFetchRequests/useFetchType";
import { useKeyDownEvent } from "../../../hooks/useKeyDownEvent";
import { PopupUI } from "../PopupUI";

interface Props {
  link?: string;
  handleSelect: any;
  defaultValue?: undefined | string | number;
  name: string;
  label?: string;
  required?: boolean;
  headColumns: any;
  control: any;
  placeholder?: string;
  readOnly?: boolean;
  focused?: boolean;
  disabled?: boolean;
  position?: string;
  renderValue?: (val: string, obj: {}) => void;
  defaultSearch?: string;
  staticSearchID?: string;
  staticOptions?: any;
  popupUI?: any;
}

export const LiteOptionsTable = ({
  link = "",
  handleSelect = () => {},
  name = "",
  defaultValue = "",
  label = "",
  required = false,
  headColumns = [],
  control,
  placeholder = "",
  readOnly = false,
  focused = false,
  disabled = false,
  renderValue = () => {},
  defaultSearch = "",
  staticSearchID = "",
  staticOptions = [],
  popupUI = null,
}: Props) => {
  const { t } = useTranslationHook();
  const [searchName, setSearchName] = useState(staticSearchID || name);
  const inputRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchor, setAnchor] = useState(null);
  const [currentEl, setCurrentEl]: any = useState({});
  const [options, setOptions] = useState([]);
  const { data, setFilterParams, filterParams, isLoading } = useFetchType();
  const { isAltPressed, currentKey, pressedKey } = useKeyDownEvent();
  const [isFocus, setIsFocus] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    if (popupUI && open) {
      setOpenPopup(true);
    }
  }, [popupUI, open]);

  useEffect(() => {
    if (isFocus) {
      if (currentKey === "Open") {
        setOpen(true);
        setAnchor(inputRef.current);
        setFilterParams({ ...filterParams, link });
      }
    }

    if (pressedKey === "Escape" && open) {
      setOpen(false);
      setAnchor(null);
      setIsFocus(false);
    }
  }, [isFocus, isAltPressed, currentKey, pressedKey]);

  const setCurrentValue = (el?: any) => {
    let val: any = "";

    if (renderValue) {
      val = renderValue(name, el?.[name] ? el : { [name]: defaultValue });
    } else {
      val = el?.[name] || defaultValue;
    }
    setSearch(val);
  };

  useEffect(() => {
    if (data?.data?.length && defaultSearch) {
      const obj = data.data[0] ?? {};
      setCurrentEl(obj);
      handleSelect(obj);
      setCurrentValue(obj);
    }
  }, [data, defaultSearch]);

  useEffect(() => {
    if (defaultValue) setCurrentValue();
  }, [defaultValue]);

  useEffect(() => {
    if (data?.data) {
      setOptions(data.data);
    } else {
      setOptions(staticOptions);
    }
  }, [data]);

  const findForm = () => {
    const active = inputRef.current;

    if (!active) return;

    const form = active.closest("form");
    if (form) {
      const elements = Array.from(form.elements) as HTMLElement[];
      const currentIndex = elements.indexOf(active);

      const next = elements[currentIndex + 1];
      if (next && typeof next.focus === "function") {
        next.focus();
      }
    }
  };

  const handleActions = (el: any, type: string) => {
    if (type === "active_col") {
      setSearchName(el.id);
    } else {
      handleSelect(el);
      setCurrentEl(el);
      setCurrentValue(el);
      setOpen(false);
      inputRef.current.focus();
      setTimeout(() => {
        findForm();
      }, 0);
    }
  };

  const handleSearch = (value: string) => {
    let fetchName = name;

    if (staticOptions.length && !data?.data?.length) {
      if (staticSearchID) fetchName = staticSearchID;
      const newArr = staticOptions.filter((item: any) =>
        item[fetchName].includes(value)
      );
      setOptions(newArr);
    }

    if (staticSearchID) {
      setOpen(true);
      setAnchor(inputRef.current);
      setFilterParams({
        ...filterParams,
        link,
        q: value ? `${staticSearchID}=${value}` : undefined,
      });
      return;
    }
    const colNames = headColumns.map((i: { id: string }) => i.id);
    if (isNaN(Number(value))) {
      fetchName = colNames.find((i: string) =>
        i.toLocaleLowerCase().includes("adi")
      );
    } else {
      fetchName = colNames.find((i: string) =>
        i.toLocaleLowerCase().includes("id")
      );
    }

    setOpen(true);
    setAnchor(inputRef.current);
    setFilterParams({
      ...filterParams,
      link,
      q: value ? `${fetchName || name}=${value}` : undefined,
    });
    setSearchName(fetchName || name);
    return fetchName;
  };

  useEffect(() => {
    if (defaultSearch)
      setFilterParams({ ...filterParams, link, q: defaultSearch });
  }, [defaultSearch]);

  return (
    <div className="w-full relative">
      {label && <CLabel title={label} required={required} />}
      <div
        className={`w-full relative flex items-center ${
          disabled ? "bg-[#fafafa]" : ""
        }`}
      >
        <div
          className="cursor-pointer absolute z-[99] left-2"
          onClick={() => {
            if (!disabled) {
              if (!open) {
                setAnchor(inputRef.current);
                setFilterParams({ ...filterParams, link });
              }
              setOpen(!open);
            }
          }}
        >
          <ManageSearchIcon
            style={{ color: disabled ? "var(--gray)" : "var(--black)" }}
          />
        </div>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div className={`relative w-full ${open ? "z-[99]" : ""}`}>
                <input
                  value={search || value}
                  type="text"
                  onBlur={() => {
                    setOpen(false);
                    setIsFocus(false);
                  }}
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  autoFocus={focused}
                  className={`border rounded-[8px] pl-8 h-[30px] w-full px-1 bg-transparent ${
                    error?.message
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  } ${disabled ? "text-[var(--gray)]" : ""}`}
                  placeholder={t(placeholder)}
                  onChange={(e: any) => {
                    setTimeout(() => {
                      handleSearch(e.target.value);
                    }, 500);
                    onChange(e.target.value);
                    setSearch(e.target.value);
                  }}
                  ref={inputRef}
                  readOnly={readOnly || disabled}
                />
              </div>
            );
          }}
        ></Controller>

        {open && !disabled && (
          <BasePopup
            id={open ? "simple-popup" : undefined}
            open={open}
            anchor={anchor}
            style={{
              padding: 0,
              zIndex: 99,
            }}
          >
            <div className="bg-white border border-[var(--border)] rounded-[8px] shadow-2xl">
              <TableUI
                name={name}
                idTable={currentEl?.[name]}
                handleRowClick={handleActions}
                headColumns={headColumns}
                bodyColumns={options}
                isLoading={isLoading}
                searchName={searchName}
              />
            </div>
          </BasePopup>
        )}

        {openPopup && (
          <PopupUI open={openPopup} anchor={anchor}>
            <div className="p-2">{popupUI}</div>
          </PopupUI>
        )}
      </div>

      {open && (
        <div
          className="fixed top-0 left-0 z-[90] w-full h-full"
          onClick={() => {
            setOpen(false);
            setAnchor(null);
          }}
        ></div>
      )}
    </div>
  );
};
