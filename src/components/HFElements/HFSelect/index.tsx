import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import IconGenerator from "../IconPicker/IconGenerator";

interface Props {
  control: any;
  name: any;
  label?: string;
  width?: string;
  options?: object[];
  disabledHelperText?: any;
  placeholder?: any;
  required?: boolean;
  onChange?: (val?: any) => void;
  handleClick?: (val: any) => void;
  optionType?: any;
  defaultValue?: any;
  rules?: any;
  id?: string;
  disabled?: boolean;
  clear?: boolean;
  setValue?: (val1?: any, val2?: any) => void;
}

const SelectUI = ({
  value,
  defaultValue,
  placeholder,
  disabled,
  onChange,
  onFormChange,
  optionType,
  options,
  props,
  handleClick,
  error,
}: {
  value: any;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  onChange: (val: any) => void;
  onFormChange: (val: any) => void;
  optionType?: string;
  options: any;
  props: any;
  error?: any;
  handleClick: (val: any) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Select
      value={value || defaultValue}
      size="small"
      inputProps={{ placeholder }}
      fullWidth
      displayEmpty
      disabled={disabled}
      id="1"
      error={error}
      renderValue={
        value !== ""
          ? undefined
          : () => <span style={{ color: "var(--gray)" }}>{placeholder}</span>
      }
      onChange={(e) => {
        onChange(e.target.value);
        onFormChange(e.target.value);
      }}
      {...props}
    >
      {optionType === "GROUP"
        ? options?.map((group?: any) => [
            <MenuItem style={{ fontWeight: 600, color: "#000", fontSize: 12 }}>
              {group.label}
            </MenuItem>,
            group.options?.map((option?: any) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={{ paddingLeft: 30 }}
              >
                <div className="flex align-center gap-2">
                  {typeof option.label === "string"
                    ? t(option.label)
                    : option.label}
                </div>
              </MenuItem>
            )),
          ])
        : options?.map((option?: any) => (
            <MenuItem
              key={option.value}
              onClick={() => handleClick(option)}
              value={option.value}
            >
              {typeof option.label === "string"
                ? t(option.label)
                : option.label}
            </MenuItem>
          ))}
    </Select>
  );
};

const HFSelect = ({
  control,
  name,
  label,
  width = "100%",
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  onChange = () => {},
  optionType,
  defaultValue = "",
  rules = {},
  id = "cselect",
  handleClick = () => {},
  setValue = () => {},
  disabled = false,
  clear = false,
  ...props
}: Props) => {
  useEffect(() => {
    if (defaultValue || defaultValue == 0) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div id="cselect">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          required: required ? "This is required field" : false,
          ...rules,
        }}
        render={({
          field: { onChange: onFormChange, value },
          fieldState: { error },
        }) => (
          <FormControl style={{ width }}>
            {label && <CLabel title={label} required={required} />}

            <FormHelperText
              style={{ color: "var(--error)", margin: "0" }}
              error
            >
              <div className="relative">
                <SelectUI
                  options={options}
                  optionType={optionType}
                  onChange={onChange}
                  placeholder={placeholder}
                  onFormChange={onFormChange}
                  value={value}
                  handleClick={handleClick}
                  defaultValue={defaultValue}
                  disabled={disabled}
                  props={props}
                  error={error}
                />
                {/* {options.length ? (
                  <SelectUI
                    options={options}
                    optionType={optionType}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFormChange={onFormChange}
                    value={value}
                    handleClick={handleClick}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    props={props}
                  />
                ) : (
                  <input
                    className="h-[30px] text-[14px] text-[var(--black)] rounded-[8px] px-2 w-full border border-[var(--border)]"
                    value={value}
                    readOnly
                  ></input>
                )}
                {value && clear ? (
                  <button
                    onClick={() => onFormChange("")}
                    className="absolute right-4 z-[9] top-1/2 -translate-y-1/2"
                  >
                    <CloseIcon />
                  </button>
                ) : (
                  ""
                )} */}
              </div>
            </FormHelperText>
          </FormControl>
        )}
      ></Controller>
    </div>
  );
};

export default HFSelect;
