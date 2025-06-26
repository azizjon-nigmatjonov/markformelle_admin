import { useEffect } from "react";
import { InputMask } from "@react-input/mask";
import CLabel from "../../CElements/CLabel";
import { Controller, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  mask?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  name: string;
  control: Control<any>;
  setValue?: (name: string, value: any) => void;
  defaultValue?: string;
  errors?: Record<string, any>;
  handleChange?: (val?: string) => void;
  type?: string;
  disabled?: boolean;
}

interface MaskInputUIProps {
  value: string;
  mask?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange: (val: string) => void;
  handleChange?: (val: string) => void;
  required?: boolean;
  maskRef?: React.Ref<HTMLInputElement>;
  type?: string;
  error?: boolean;
  disabled?: boolean;
}

export const MaskInputUI = ({
  onChange,
  placeholder = "",
  mask = "",
  value = "",
  required = false,
  defaultValue = "",
  handleChange = () => {},
  maskRef,
  type = "text",
  error = false,
  disabled = false,
}: MaskInputUIProps) => {
  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (value || defaultValue)) {
      const form = (e.target as HTMLElement).closest("form");
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const active = document.activeElement;
        const currentIndex = elements.indexOf(active as HTMLElement);

        const next = elements[currentIndex + 1];
        if (next && typeof next.focus === "function") {
          next.focus();
        }
      }
    }
  };

  return (
    <InputMask
      onChange={(e) => {
        const val = e.target.value;
        onChange(val);
        handleChange(val);
      }}
      onKeyDown={handleKeyDown}
      type={type}
      ref={maskRef}
      mask={mask}
      replacement="_"
      value={value}
      placeholder={placeholder}
      required={required}
      style={{ borderColor: error ? "red" : "" }}
      disabled={disabled}
    />
  );
};

const HFInputMask = ({
  mask = "",
  required = false,
  label = "",
  placeholder = "",
  name,
  control,
  setValue = () => {},
  defaultValue = "",
  type = "text",
  disabled,
  handleChange = () => {},
}: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(name, defaultValue);
    }
  }, [name, setValue, defaultValue]);

  return (
    <div id="hfInputMask" className="relative w-full">
      {label && (
        <CLabel title={label} required={required} disabled={disabled} />
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          required: required ? t("This field is required") : false,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <MaskInputUI
              onChange={onChange}
              mask={mask}
              value={value || ""}
              disabled={disabled}
              placeholder={t(placeholder)}
              handleChange={handleChange}
              defaultValue={defaultValue}
              type={type}
              error={!!error?.message}
            />
          </>
        )}
      />
    </div>
  );
};

export default HFInputMask;
