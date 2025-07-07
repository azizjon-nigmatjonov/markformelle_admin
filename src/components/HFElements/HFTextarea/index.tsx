import { Controller } from "react-hook-form";
// import { CgFormatBold } from "react-icons/cg";
// import { GoItalic } from "react-icons/go";
// import { FiUnderline } from "react-icons/fi";
// import { ImageFrameIcon } from "../../../components/UI/IconGenerator/Svg";
import { TextareaAutosize } from "@mui/material";
import CLabel from "../../../components/CElements/CLabel";
import { useEffect } from "react";

export const FieldUI = ({
  value,
  defaultValue,
  onChange = () => {},
  props,
  error,
  minRows = 3,
}: {
  value?: any;
  defaultValue?: string;
  onChange?: (val: any) => void;
  props?: any;
  error?: any;
  minRows?: number;
}) => {
  const handleChange = (val: any) => {
    onChange(val);
  };

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="HFTextarea">
      <TextareaAutosize
        // size="small"
        defaultValue={value ? undefined : defaultValue}
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
        name={name}
        minRows={minRows}
        {...props}
      />
      {error?.message && (
        <p className="text-sm text-[var(--error)] absolute left-1 -bottom-5 whitespace-nowrap">
          {error.message}
        </p>
      )}
    </div>
  );
};
interface Props {
  control?: any;
  name: string;
  defaultValue?: any;
  rules?: any;
  type?: string;
  activePassword?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  minRows?: number;
}

const HFTextarea = ({
  control,
  name,
  defaultValue,
  rules,
  type = "text",
  label = "",
  required = false,
  activePassword = false,
  minRows = 3,
  ...props
}: Props) => {
  return (
    <div>
      {label && <CLabel title={label} required={required} />}
      <div className="border border-[var(--lineGray)] rounded-[8px]">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{ ...rules }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="p-2 relative">
              <FieldUI
                onChange={onChange}
                value={value}
                error={error}
                defaultValue={defaultValue}
                props={props}
                minRows={minRows}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default HFTextarea;
