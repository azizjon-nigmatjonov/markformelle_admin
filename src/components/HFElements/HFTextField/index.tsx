import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const InputUI = ({
  value,
  name,
  error,
  props,
  defaultValue,
  activatePassword,
  password,
  type,
  onChange,
  readOnly,
  disabled,
  errors = {},
  placeholder,
  setPassword = () => {},
  onKeydown = () => {},
}: {
  value: any;
  name: string;
  error?: any;
  props?: any;
  activatePassword: any;
  password: any;
  type: any;
  disabled: any;
  errors: any;
  readOnly?: boolean;
  defaultValue?: any;
  onChange: any;
  placeholder: string;
  onKeydown?: (val: number) => void;
  setPassword: (val: any) => void;
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        error={Boolean(error)}
        {...props}
        type={
          activatePassword && password
            ? "password"
            : activatePassword && !password
            ? "text"
            : type
        }
        onKeyDown={(e: { keyCode: number }) => onKeydown(e.keyCode)}
        autoComplete="off"
        InputProps={{
          readOnly: readOnly,
        }}
        placeholder={t(placeholder)}
        className={errors[name]?.message ? "border border-red-500" : ""}
        disabled={disabled}
      />
      {activatePassword && (
        <span
          className="visibility"
          onClick={() => setPassword((prev: boolean) => !prev)}
        >
          {!password ? <VisibilityOff /> : <Visibility />}
        </span>
      )}
    </>
  );
};
interface Props {
  control: any;
  name: string;
  required?: boolean;
  rules?: object;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
  setValue?: (val1?: any, val2?: any) => void;
  type?: string;
  placeholder?: string;
  style?: any;
  activatePassword?: boolean;
  errors?: any;
  readOnly?: boolean;
  autoComplete?: string;
  onKeydown?: (val: number) => void;
  handleChange?: (name: string, value: any) => void;
}

const HFTextField = ({
  control,
  name = "",
  required = false,
  rules = {},
  label,
  disabled = false,
  defaultValue = "",
  setValue = () => {},
  activatePassword = false,
  type = "text",
  errors = {},
  readOnly = false,
  placeholder,
  handleChange = () => {},
  onKeydown = () => {},
  ...props
}: Props) => {
  const [password, setPassword] = useState(true);

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div className="HFInput relative">
      {label && <CLabel title={label} required={required} />}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          ...rules,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputUI
            value={value}
            name={name}
            error={error}
            props={props}
            activatePassword={activatePassword}
            password={password}
            type={type}
            onChange={(value: any) => {
              onChange(value);
              handleChange(name, value);
            }}
            onKeydown={onKeydown}
            readOnly={readOnly}
            disabled={disabled}
            errors={errors}
            defaultValue={defaultValue}
            setPassword={setPassword}
            placeholder={placeholder ? placeholder : ""}
          />
        )}
      ></Controller>
    </div>
  );
};

export default HFTextField;
