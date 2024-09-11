import { useTranslation } from "react-i18next";
import "./style.scss";
import emptyImage from "/images/website/no-data.png";

const EmptyDataComponent = ({ title = "no_information", isVisible }: { title?: string; isVisible?: boolean }) => {
  if (!isVisible) return null;
  const {t} = useTranslation()

  return (
    <div className="EmptyDataComponent">
      <div className="block">
        <div className="icon">
          <img src={emptyImage} alt="emptyImage" />
        </div>
        <p className="text text-[var(--black)]">{t(title)}</p>
      </div>
    </div>
  );
};

export default EmptyDataComponent;
