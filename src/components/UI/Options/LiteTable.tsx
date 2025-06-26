import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import CLabel from "../../CElements/CLabel";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { TableUI } from "./LiteTable/TableUI";
import { useFetchType } from "../../../hooks/useFetchRequests/useFetchType";
import { useKeyDownEvent } from "../../../hooks/useKeyDownEvent";
import { PopupUI } from "../PopupUI";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";

interface Column {
  id: string;
  title: string;
  width?: number;
  render?: (value: any, item: any) => React.ReactNode;
}

interface BaseTableItem {
  [key: string]: any;
  id?: string | number;
}

export interface TableItem extends BaseTableItem {
  RECETEASAMAID?: number;
  RECETEGRAFIKID?: string;
  ADI?: string;
}

interface LiteTableOptionsProps<T extends BaseTableItem = TableItem> {
  link?: string;
  handleSelect: (val: any) => void;
  defaultValue?: string | number;
  name: string;
  label?: string;
  required?: boolean;
  headColumns: Column[];
  control: any;
  placeholder?: string;
  readOnly?: boolean;
  focused?: boolean;
  disabled?: boolean;
  position?: string;
  renderValue?: (val: string, obj: T) => string;
  defaultSearch?: string;
  staticSearchID?: string;
  staticOptions?: T[];
  defaultFilters?: string;
  popupUI?: React.ReactNode;
}

// Search Input Component
const SearchInput = memo(
  ({
    control,
    name,
    search,
    setSearch,
    handleSearch,
    placeholder,
    readOnly,
    disabled,
    focused,
    inputRef,
    open,
    setIsFocus,
    setOpen,
    handleEnterKey,
  }: {
    control: any;
    name: string;
    search: string;
    setSearch: (value: string) => void;
    handleSearch: (value: string) => void;
    placeholder: string;
    readOnly: boolean;
    disabled: boolean;
    focused: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    open: boolean;
    setIsFocus: (value: boolean) => void;
    setOpen: (value: boolean) => void;
    handleEnterKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }) => {
    const { t } = useTranslation();
    const debouncedSearch = useMemo(
      () => debounce(handleSearch, 300),
      [handleSearch]
    );

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className={`relative w-full ${open ? "z-[99]" : ""}`}>
            <input
              value={search ?? value ?? ""}
              type="text"
              onBlur={() => {
                setOpen(false);
                setIsFocus(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(search);
                  handleEnterKey(e);
                }
              }}
              onFocus={() => setIsFocus(true)}
              autoFocus={focused}
              className={`border rounded-[8px] pl-8 h-[30px] w-full px-1 bg-transparent ${
                error?.message
                  ? "border-[var(--error)]"
                  : "border-[var(--border)]"
              } ${disabled ? "text-[var(--gray)]" : ""}`}
              placeholder={t(placeholder)}
              onChange={(e) => {
                debouncedSearch(e.target.value);
                onChange(e.target.value);
                setSearch(e.target.value);
              }}
              ref={inputRef}
              readOnly={readOnly || disabled}
            />
          </div>
        )}
      />
    );
  }
);

// Table Popup Component
const TablePopup = memo(
  <T extends BaseTableItem>({
    open,
    anchor,
    options,
    headColumns,
    isLoading,
    searchName,
    handleActions,
    name,
    link,
    currentEl,
    onLoadMore,
  }: {
    open: boolean;
    anchor: HTMLElement | null;
    options: T[];
    headColumns: Column[];
    isLoading: boolean;
    searchName: string;
    handleActions: (el: T, type: string) => void;
    name: string;
    currentEl: T;
    link: string;
    onLoadMore?: () => void;
  }) => {
    return (
      <BasePopup
        id={open ? "simple-popup" : undefined}
        open={open}
        anchor={anchor}
        style={{
          padding: 0,
          zIndex: 99,
        }}
      >
        <div className="bg-white border border-[var(--gray30)] rounded-[8px] shadow-2xl">
          <TableUI
            name={name}
            idTable={currentEl?.[name]}
            handleRowClick={(el: BaseTableItem, type: string) =>
              handleActions(el as T, type)
            }
            link={link}
            headColumns={headColumns}
            bodyColumns={options}
            isLoading={isLoading}
            searchName={searchName}
            onLoadMore={onLoadMore}
          />
        </div>
      </BasePopup>
    );
  }
);

export const LiteOptionsTable = memo(
  <T extends BaseTableItem = TableItem>({
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
    renderValue = (val: string) => val,
    defaultSearch = "",
    staticSearchID = "",
    staticOptions = [],
    popupUI = null,
    defaultFilters = "",
  }: LiteTableOptionsProps<T>) => {
    const [searchName, setSearchName] = useState(staticSearchID || name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [currentEl, setCurrentEl] = useState<T>({} as T);
    const [options, setOptions] = useState<T[]>([]);
    const { data, setFilterParams, filterParams, isLoading } = useFetchType();
    const { isAltPressed, currentKey, pressedKey } = useKeyDownEvent();
    const [isFocus, setIsFocus] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    // Infinite scroll handler - increase perPage by 50 when user scrolls to bottom
    const handleLoadMore = useCallback(() => {
      if (isLoading) return;

      setFilterParams((prev) => ({
        ...prev,
        perPage: (prev.perPage || 50) + 50,
      }));
    }, [setFilterParams, isLoading]);

    const handleSearch = useCallback(
      (value: string) => {
        let fetchName = name;

        if (staticOptions.length && !data?.data?.length) {
          if (staticSearchID) fetchName = staticSearchID;
          const newArr = staticOptions.filter((item) =>
            item[fetchName]?.toString().includes(value)
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
            perPage: 50, // Reset to initial limit when searching
          });
          return;
        }

        const colNames = headColumns.map((i) => i.id);
        if (isNaN(Number(value))) {
          fetchName =
            colNames.find((i) => i.toLocaleLowerCase().includes("adi")) || name;
        } else {
          fetchName =
            colNames.find((i) => i.toLocaleLowerCase().includes("id")) || name;
        }

        setOpen(true);
        setAnchor(inputRef.current);
        setFilterParams({
          ...filterParams,
          link,
          q: value ? `${fetchName}=${value}` : undefined,
          perPage: 50, // Reset to initial limit when searching
        });
        setSearchName(fetchName);
      },
      [
        staticOptions,
        staticSearchID,
        headColumns,
        name,
        link,
        filterParams,
        data?.data?.length,
      ]
    );

    const setCurrentValue = useCallback(
      (el?: T) => {
        let val = "";

        if (renderValue) {
          val = renderValue(
            name,
            el?.[name] || el?.[name] == "0"
              ? el
              : ({ [name]: defaultValue } as T)
          );
        } else {
          val = el?.[name] ?? defaultValue;
        }
        setSearch(val);
      },
      [name, defaultValue, renderValue]
    );

    const handleActions = useCallback(
      (el: BaseTableItem, type: string) => {
        if (type === "active_col") {
          setSearchName(el.id ? el.id + "" : "");
        } else {
          handleSelect(el as T);
          setCurrentEl(el as T);
          setCurrentValue(el as T);
          setOpen(false);
          inputRef.current?.focus();
        }
      },
      [handleSelect, setCurrentValue]
    );

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
          setFilterParams({ ...filterParams, link, perPage: 50 }); // Reset to initial limit when opening
        }
      }

      if (pressedKey === "Escape" && open) {
        setOpen(false);
        setAnchor(null);
        setIsFocus(false);
      }
    }, [
      isFocus,
      isAltPressed,
      currentKey,
      pressedKey,
      open,
      filterParams,
      link,
    ]);

    useEffect(() => {
      if (data?.data) {
        setOptions(data.data);
      } else if (staticOptions.length) {
        setOptions(staticOptions);
      }
    }, [data?.data, staticOptions]);

    useEffect(() => {
      if (defaultSearch && !search) {
        setFilterParams((prev) => ({
          ...prev,
          link,
          q: defaultSearch,
          perPage: 50,
        }));
      }
    }, [defaultSearch, link, setFilterParams, search]);

    useEffect(() => {
      if (defaultFilters) {
        setFilterParams((prev) => ({
          ...prev,
          link,
          q: defaultFilters,
          perPage: 50,
        }));
      }
    }, [defaultFilters]);

    useEffect(() => {
      if (defaultValue) {
        setCurrentValue();
      }
    }, [defaultValue, setCurrentValue]);

    useEffect(() => {
      if (data?.data?.length && defaultSearch && !search) {
        const obj = data.data[0] ?? {};
        setCurrentEl(obj);
        handleSelect(obj);
        setCurrentValue(obj);
      }
    }, [data?.data, defaultSearch, handleSelect, setCurrentValue, search]);

    const handleEnterKey = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          // setCurrentValue();
          handleSelect({ [name]: search });
          setTimeout(() => {
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
          }, 0);
        }
      },
      [handleSearch, search]
    );

    return (
      <div className="w-full relative">
        {label && (
          <CLabel title={label} required={required} disabled={disabled} />
        )}
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
                  setFilterParams({ ...filterParams, link, perPage: 50 }); // Reset to initial limit when opening
                }
                setOpen(!open);
              }
            }}
          >
            <ManageSearchIcon
              style={{ color: disabled ? "var(--gray)" : "var(--black)" }}
            />
          </div>

          <SearchInput
            control={control}
            name={name}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            focused={focused}
            inputRef={inputRef}
            open={open}
            setIsFocus={setIsFocus}
            setOpen={setOpen}
            handleEnterKey={handleEnterKey}
          />

          <TablePopup
            open={open}
            anchor={anchor}
            options={options}
            headColumns={headColumns}
            isLoading={isLoading}
            searchName={searchName}
            handleActions={handleActions}
            name={name}
            link={link}
            currentEl={currentEl}
            onLoadMore={handleLoadMore}
          />

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
          />
        )}
      </div>
    );
  }
);

LiteOptionsTable.displayName = "LiteOptionsTable";
