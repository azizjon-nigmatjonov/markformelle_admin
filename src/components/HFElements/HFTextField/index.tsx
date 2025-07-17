import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const InputUI = ({
  value = "",
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
  focused = false,
  setPassword = () => {},
  onKeydown = () => {},
  onBlur = () => {},
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
  focused: boolean;
  placeholder: string;
  onKeydown?: (val: number) => void;
  setPassword: (val: any) => void;
  onBlur?: (name: string, value: any) => void;
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && (value || defaultValue)) {
      const form = (e.target as HTMLElement).closest("form");
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const active = document.activeElement;
        const currentIndex = elements.indexOf(active as HTMLElement);

        const next = elements[currentIndex + 1];
        if (next && typeof next.focus === "function") {
          requestAnimationFrame(() => {
            next.focus();
          });
        }
      }
    }
  };

  return (
    <div>
      <input
        className={`input-design ${
          errors[name]?.message || error ? "error" : ""
        }`}
        style={{ width: "100%" }}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={focused}
        placeholder={t(placeholder)}
        disabled={disabled}
        onKeyDown={(e: any) => {
          onKeydown(e.keyCode);
          handleKeyDown(e);
        }}
        onBlur={(e) => {
          onBlur(name, e.target.value);
        }}
        readOnly={readOnly}
        type={
          activatePassword && password
            ? "password"
            : activatePassword && !password
            ? "text"
            : type
        }
        {...props}
      />

      {activatePassword && (
        <span
          className="visibility"
          onClick={() => setPassword((prev: boolean) => !prev)}
        >
          {!password ? <VisibilityOff /> : <Visibility />}
        </span>
      )}
    </div>
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
  focused?: boolean;
  onKeydown?: (val: number) => void;
  handleChange?: (name: string, value: any) => void;
  onFocus?: () => void;
  onBlur?: (name: string, value: any) => void;
}

const HFTextField = ({
  control,
  name = "",
  required = false,
  focused = false,
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
  onBlur = () => {},
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
      {label && (
        <CLabel title={label} required={required} disabled={disabled} />
      )}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          ...rules,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputUI
            value={value || ""}
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
            focused={focused}
            onKeydown={onKeydown}
            onBlur={onBlur}
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
