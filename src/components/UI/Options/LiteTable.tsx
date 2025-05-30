import { useEffect, useRef, useState } from "react";
import CLabel from "../../CElements/CLabel";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { TableUI } from "./LiteTable/TableUI";
import { useFetchType } from "../../../hooks/useFetchRequests/useFetchType";
const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${
    theme.palette.mode === "dark" ? "var(--gray30)" : "var(--gray30)"
  };
  background-color: ${theme.palette.mode === "dark" ? "var(--gray30)" : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  z-index: 1;
`
);

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
}

export const LiteOptionsTable = ({
  link = "",
  handleSelect = () => {},
  name = "",
  defaultValue = undefined,
  label = "",
  required = false,
  headColumns = [],
  control,
  placeholder = "",
  readOnly = false,
  focused = false,
  disabled = false,
  renderValue,
  defaultSearch = "",
}: Props) => {
  const { t } = useTranslationHook();
  const inputRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchor, setAnchor] = useState(null);
  const [currentEl, setCurrentEl]: any = useState({});
  const [options, setOptions] = useState([]);
  const { data, setFilterParams, filterParams, isLoading } = useFetchType();

  useEffect(() => {
    setOptions(data?.data ?? []);
  }, [data]);

  const handleActions = (el: any, _: string) => {
    setOpen(false);
    handleSelect(el);
    setCurrentEl(el);
  };

  const handleSearch = (q: string) => {
    setFilterParams({ ...filterParams, q });
  };

  useEffect(() => {
    if (defaultSearch)
      setFilterParams({ ...filterParams, link, q: defaultSearch });
  }, [defaultSearch]);

  // useEffect(() => {
  //   if (defaultValue) {
  //     setFilterParams({ ...filterParams, q: `${name}=${defaultValue}`, link });
  //     console.log("defaultValuedefaultValuedefaultValue", defaultValue);
  //     // const selectName = name;
  //     // let obj: any = {};
  //     // for (let i = 0; i < options.length; i++) {
  //     //   if (options[i][selectName] === defaultData) {
  //     //     obj = options[i];
  //     //   }
  //     // }
  //     // if (obj?.[selectName]) {
  //     //   setDefaultData(obj);
  //     //   handleSelect(obj);
  //     // }
  //   }
  // }, [defaultValue]);

  useEffect(() => {
    if (!options.length && search) {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
  }, [options, search]);

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (!name) return;
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "F8") {
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      {label && <CLabel title={label} required={required} />}
      <div
        className={`w-full relative flex items-center rounded-[8px] border border-[var(--border)] px-2 ${
          disabled ? "bg-[#fafafa]" : ""
        }`}
      >
        <div
          className="cursor-pointer"
          onClick={(event: any) => {
            if (!disabled) {
              setOpen(true);
              setAnchor(event.currentTarget);
              setFilterParams({ ...filterParams, link });
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
              <div className={`relative ${open ? "z-[99]" : ""}`}>
                <input
                  value={
                    renderValue
                      ? renderValue(
                          name,
                          currentEl?.[name]
                            ? currentEl
                            : { [name]: defaultValue }
                        )
                      : value
                      ? value
                      : search || defaultValue
                  }
                  type="text"
                  className={`h-[30px] w-full px-1 bg-transparent ${
                    error?.message
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  } ${disabled ? "text-[var(--gray)]" : ""}`}
                  placeholder={t(placeholder)}
                  onChange={(e: any) => {
                    handleSearch(`${name}=${e.target.value}`);
                    onChange(e.target.value);
                    setSearch(e.target.value);
                  }}
                  ref={inputRef}
                  readOnly={readOnly || disabled}
                  style={{ borderColor: error?.message ? "var(--error)" : "" }}
                />
              </div>
            );
          }}
        ></Controller>

        {open && (
          <BasePopup
            id={open ? "simple-popup" : undefined}
            open={open}
            anchor={anchor}
            style={{
              padding: 0,
              zIndex: 99,
            }}
          >
            <PopupBody>
              <TableUI
                name={name}
                idTable={currentEl?.[name]}
                handleRowClick={handleActions}
                headColumns={headColumns}
                bodyColumns={options}
                isLoading={isLoading}
              />
            </PopupBody>
          </BasePopup>
        )}
      </div>

      {open && (
        <div
          className="fixed top-0 left-0 z-[90] w-full h-full"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};
