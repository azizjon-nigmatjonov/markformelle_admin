import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { CloseIcon, SearchIcon } from "../../UI/IconGenerator/Svg";
import { useTranslation } from "react-i18next";

interface Props {
  handleChange: (val: any) => void;
  delay?: number;
  classes?: string;
  defaultValue?: string | number;
  title?: string;
  handleSubmit?: (val: any) => void;
}

const CSearchInput = ({
  title,
  handleChange = () => {},
  delay = 0,
  classes = "",
  defaultValue = "",
  handleSubmit = () => {},
}: Props) => {
  const { t } = useTranslation();
  const [value, setValue]: any = useState(null);
  const debounce = useDebounce((search: any) => {
    setValue(search);
    handleChange(search);
  }, delay);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      handleSubmit(value);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-[4px] flex border justify-between items-center h-[25px] desktop:h-[35px] px-3 ${
        value ? " border-[var(--main)]" : "border-[var(--border)]"
      }`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-2">
        <SearchIcon width={20} fill={value ? "var(--main)" : "var(--gray30)"} />
      </div>
      <input
        value={value}
        onChange={(e) => debounce(e.target.value)}
        defaultValue={defaultValue}
        type="text"
        onKeyUp={handleKeyPress}
        placeholder={title ? title : t("search")}
        className={`w-full min-w-[140px] pl-7 pr-1 bg-white h-full outline-none  text-[var(--black)] placeholder-[var(--gray)] rounded-[8px] ${classes}`}
      />
      {value?.length ? (
        <button
          onClick={() => {
            setValue("");
            handleChange("");
          }}
        >
          <CloseIcon />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CSearchInput;
