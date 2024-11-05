import { ReactNode } from "react";
import { useSelector } from "react-redux";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

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
  const { getHeight } = useDeviceHeight();

  const NewSize = (half: boolean) => {
    if (half) {
      return getHeight({
        count: half ? 2 : 1,
        type: "machine",
        minus:
          window.screen.width < 980
            ? openHeader
              ? 40
              : 15
            : openHeader
            ? 105
            : 80,
      });
    } else {
      return getHeight({
        count: 1,
        type: "machine",
        minus:
          window.screen.width < 980
            ? openHeader
              ? 70
              : 15
            : openHeader
            ? 200
            : 150,
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-[18px] min-h-[200px] border border-[var(--gray20)] common-shadow relative overflow-y-scroll remove-scroll ${classes}`}
      style={{
        ...style,
        height: NewSize(half),
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
