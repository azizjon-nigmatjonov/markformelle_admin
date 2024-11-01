import { useTranslation } from "react-i18next";
import "./style.scss";
import emptyImage from "/images/website/no-data.png";
import CCard from "../../CElements/CCard";

const EmptyDataComponent = ({
  title = "no_information",
  isVisible,
}: {
  title?: string;
  isVisible?: boolean;
}) => {
  if (!isVisible) return null;
  const { t } = useTranslation();

  return (
    <CCard>
      <div className="w-full flex justify-center py-10 text-center">
        <div className="flex flex-col items-center space-y-3">
          <img src={emptyImage} width={120} alt="emptyImage" />
          <p className="text text-[var(--black)]">{t(title)}</p>
        </div>
      </div>
    </CCard>
  );
};

export default EmptyDataComponent;
