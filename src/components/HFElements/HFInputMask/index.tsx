import { useEffect } from "react";
import ReactInputMask from "react-input-mask";
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
}: MaskInputUIProps) => {
  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue, onChange]);

  return (
    <ReactInputMask
      onChange={(e) => {
        const val = e.target.value;
        onChange(val);
        handleChange(val);
      }}
      type={type}
      inputRef={maskRef}
      mask={mask}
      maskChar=""
      value={value}
      placeholder={placeholder}
      required={required}
      style={{ borderColor: error ? "red" : "" }}
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
      {label && <CLabel title={label} required={required} />}
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
