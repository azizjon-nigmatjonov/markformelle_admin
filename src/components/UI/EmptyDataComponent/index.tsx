import { useTranslation } from "react-i18next";
import "./style.scss";
import emptyImage from "/images/website/no-data.png";
import CCard from "../../CElements/CCard";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

const EmptyDataComponent = ({
  title = "no_information",
  isVisible,
}: {
  title?: string;
  isVisible?: boolean;
}) => {
  if (!isVisible) return null;
  const { t } = useTranslation();
  const { getFontSize } = useDeviceHeight();

  return (
    <CCard>
      <div className="w-full flex justify-center py-10 text-center">
        <div className="flex flex-col items-center space-y-3">
          <img
            src={emptyImage}
            width={getFontSize({ percent: 30, type: "machine", count: 1 })}
            alt="emptyImage"
          />
          <p
            className="text text-[var(--black)]"
            style={{
              fontSize: getFontSize({ percent: 5, type: "machine", count: 1 }),
            }}
          >
            {t(title)}
          </p>
        </div>
      </div>
    </CCard>
  );
};

export default EmptyDataComponent;
