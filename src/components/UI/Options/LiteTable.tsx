import { useEffect, useRef, useState } from "react";
import CLabel from "../../CElements/CLabel";
import { Controller } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/material";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { TableUI } from "./LiteTable/TableUI";
import {
  useFetchType,
  useFetchTypeSingle,
} from "../../../hooks/useFetchRequests/useFetchType";
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
  defaultValue = "",
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
  const {
    setFilterParams: setFilterParamSingle,
    filterParams: filterParamsSingle,
    data: singleData,
  } = useFetchTypeSingle();

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
    if (singleData?.[name]) {
      setCurrentEl(singleData);
      handleSelect(singleData);
      setCurrentValue(singleData);
    }
  }, [singleData]);

  useEffect(() => {
    if (defaultValue) setCurrentValue();
  }, [defaultValue]);

  useEffect(() => {
    setOptions(data?.data ?? []);
  }, [data]);

  const handleActions = (el: any, _: string) => {
    setOpen(false);
    handleSelect(el);
    setCurrentEl(el);
    setCurrentValue(el);
  };

  const handleSearch = (q: string) => {
    setFilterParams({ ...filterParams, q });
  };

  useEffect(() => {
    if (defaultSearch)
      setFilterParams({ ...filterParams, link, q: defaultSearch });
  }, [defaultSearch]);

  useEffect(() => {
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !open) {
      setFilterParamSingle({
        ...filterParamsSingle,
        link: link + "/" + search,
      });
    }
  };

  return (
    <div className="w-full">
      {label && <CLabel title={label} required={required} />}
      <div
        className={`w-full relative flex items-center ${
          disabled ? "bg-[#fafafa]" : ""
        }`}
      >
        <div
          className="cursor-pointer absolute z-[99] left-2"
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
          render={({ field: { onChange }, fieldState: { error } }) => {
            return (
              <div className={`relative w-full ${open ? "z-[99]" : ""}`}>
                <input
                  // value={
                  // renderValue
                  //   ? renderValue(
                  //       name,
                  //       currentEl?.[name]
                  //         ? currentEl
                  //         : { [name]: defaultValue }
                  //     )
                  //     : value
                  //     ? value
                  //     : search || defaultValue
                  // }
                  onKeyDown={(e: any) => handleKeyDown(e)}
                  value={search}
                  type="text"
                  className={`border rounded-[8px] pl-8 h-[30px] w-full px-1 bg-transparent ${
                    error?.message
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  } ${disabled ? "text-[var(--gray)]" : ""}`}
                  placeholder={t(placeholder)}
                  onChange={(e: any) => {
                    if (open)
                      setTimeout(() => {
                        handleSearch(
                          e.target.value ? `${name}=${e.target.value}` : ""
                        );
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
