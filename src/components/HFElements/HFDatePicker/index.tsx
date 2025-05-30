import { Controller } from "react-hook-form";
// import BasicDatepicker from "../../CElements/CDatePicker/BasicDatepicker";
import CustomDatepicker from "../../CElements/CDatePicker/CDatepicker";

interface Props {
  name: string;
  control: any;
  label?: string | undefined;
  rules?: any;
  defaultValue?: any;
  required?: boolean;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
}

export const HFDatePicker = ({
  name,
  control,
  label,
  rules = {},
  defaultValue,
  required,
  placeholder,
  format,
  disabled,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "required_field" : false,
        ...rules,
      }}
      render={({ field, fieldState: { error } }) => (
        <CustomDatepicker
          field={field}
          label={label}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          format={format}
          error={error}
          disabled={disabled}
        />
      )}
    ></Controller>
  );
};
