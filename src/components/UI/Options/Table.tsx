import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../IconGenerator/Svg";
import CLabel from "../../CElements/CLabel";
import CNewTable from "../../CElements/CNewTable";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";
import { useTranslationHook } from "../../../hooks/useTranslation";
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
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`
);

interface Props {
  options: any;
  handleSelect: any;
  defaultValue?: undefined | string | number;
  name: string;
  label?: string;
  required?: boolean;
  headColumns: any;
  filterParams: any;
  control: any;
  placeholder?: string;
  readOnly?: boolean;
  secondName?: string;
  focused?: boolean;
  disabled?: boolean;
  handleSearch?: (val: string) => void;
  setFilterParams: (val: any) => void;
  position?: string;
}

export const SelectOptionsTable = ({
  options = [],
  handleSelect = () => {},
  name = "",
  defaultValue = undefined,
  label = "",
  required = false,
  headColumns = [],
  filterParams = {},
  control,
  placeholder = "",
  readOnly = false,
  secondName = "",
  focused = false,
  disabled = false,
  // position = "left",
  handleSearch = () => {},
  setFilterParams = () => {},
}: Props) => {
  const { t } = useTranslationHook();
  const inputRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData]: any = useState({});
  const [search, setSearch] = useState("");
  const [anchor, setAnchor] = useState(null);

  const handleActions = (el: any, _: string) => {
    setOpen(false);
    handleSelect(el);
  };

  useEffect(() => {
    if (defaultValue) {
      const selectName = secondName ? secondName : name;

      let obj: any = {};
      for (let i = 0; i < options.length; i++) {
        if (options[i][selectName] === defaultData) {
          obj = options[i];
        }
      }

      if (obj?.[selectName]) {
        setDefaultData(obj);
        handleSelect(obj);
      }
    }
  }, [defaultValue, options, open]);

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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={`relative ${open ? "z-[99]" : ""}`}>
              <input
                value={value ? value : defaultData[name] || search}
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
          )}
        ></Controller>

        {open && (
          <BasePopup
            id={open ? "simple-popup" : undefined}
            open={open}
            anchor={anchor}
            style={{
              padding: 0,
              zIndex: 99,
              // transform: "translate(-50%)",
            }}
          >
            <PopupBody>
              <div className="px-1">
                <CNewTable
                  headColumns={headColumns}
                  bodyColumns={options}
                  filterParams={filterParams}
                  handleFilterParams={setFilterParams}
                  handleActions={handleActions}
                  defaultFilters={[]}
                  autoHeight="300px"
                  doubleClick={false}
                  idForTable={name + "select"}
                  disablePagination={true}
                />
                <div className="h-[40px] flex items-center">
                  <button className="flex items-center space-x-1 text-[var(--main)]">
                    <PlusIcon fill="var(--main)" /> <span>{t("create")}</span>
                  </button>
                </div>
              </div>
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
