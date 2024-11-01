import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  classes?: string;
  children?: ReactNode;
  style?: any;
  title?: string;
  footer?: ReactNode;
  extra?: ReactNode;
  childClasses?: string;
  half?: boolean;
}

const CCard = ({
  classes = "",
  style = {},
  children,
  title = "",
  footer,
  extra,
  half = false,
  childClasses = "",
}: Props) => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);

  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (half) {
      if (openHeader) {
        setHeight("calc(50vh - 40px)");
      } else {
        setHeight("calc(50vh - 15px)");
      }
    } else {
      if (openHeader) {
        setHeight("calc(100vh - 70px)");
      } else {
        setHeight("calc(100vh - 20px)");
      }
    }
  }, [openHeader, half]);

  return (
    <div
      className={`bg-white rounded-[18px] min-h-[200px] border border-[var(--gray20)] common-shadow relative overflow-y-scroll remove-scroll ${classes}`}
      style={{
        ...style,
        height: height,
      }}
    >
      {title ? (
        <div className="px-2 small_desktop:px-3 h-[50px] border-b border-[var(--gray20)] flex justify-between items-center w-full">
          <h2 className="font-50-40 w-full font-semibold text-[var(--gray)] text-center whitespace-nowrap">
            {title}
          </h2>
          <div>{extra}</div>
        </div>
      ) : (
        ""
      )}
      <div className={`p-2 small_desktop:p-3 h-full ${childClasses}`}>
        {children}
      </div>
      {footer ? (
        <div className="p-5 border-t border-[var(--gray20)]">{footer}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CCard;
