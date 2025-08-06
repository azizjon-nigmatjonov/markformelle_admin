import { Controller } from "react-hook-form";
import CLabel from "../../CElements/CLabel";
import "../style.scss";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect, useState, useCallback, useRef } from "react";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  // Check if text is overflowing
  const checkOverflow = useCallback(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      const isOverflow = input.scrollWidth > input.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, []);

  // Check overflow on value change
  useEffect(() => {
    checkOverflow();
  }, [value, checkOverflow]);

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
  console.log("error", error);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (isOverflowing) {
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
    >
      <input
        ref={inputRef}
        className={`input-design ${error?.message ? "error" : ""}`}
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
          setShowTooltip(false);
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

      {/* Tooltip */}
      {showTooltip && isOverflowing && (
        <div
          className="absolute z-[100] bg-[var(--main)] text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap"
          style={{
            top: "30px",
            left: "0",
          }}
        >
          {value || ""}
        </div>
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
