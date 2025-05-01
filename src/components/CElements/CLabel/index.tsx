import { useTranslation } from "react-i18next";
import cls from "./style.module.scss";

interface Props {
  title?: string;
  required?: boolean;
  styles?: any;
}

const CLabel = ({ title = "", required, styles = {} }: Props) => {
  const { t } = useTranslation();
  return (
    <p className={cls.label} style={{ ...styles }}>
      {required ? <span className={cls.required}>*</span> : ""}
      {t(title)}
    </p>
  );
};

export default CLabel;
