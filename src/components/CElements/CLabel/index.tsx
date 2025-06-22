import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";

interface Props {
  title?: string;
  required?: boolean;
  styles?: any;
  disabled?: boolean;
}

const CLabel = ({
  title = "",
  required,
  styles = {},
  disabled = false,
}: Props) => {
  const { t } = useTranslation();
  return (
    <p
      className={`${cls.label} ${disabled ? cls.disabled : ""}`}
      style={{ ...styles }}
    >
      {required ? <span className={cls.required}>*</span> : ""}
      {t(title)}
    </p>
  );
};

export default CLabel;
