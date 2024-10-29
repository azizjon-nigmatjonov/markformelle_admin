import { ReactNode } from "react";

interface Props {
  classes?: string;
  children?: ReactNode;
  style?: any;
  title?: string;
  footer?: ReactNode;
  extra?: ReactNode;
  childClasses?: string;
}

const CCard = ({
  classes = "",
  style,
  children,
  title = "",
  footer,
  extra,
  childClasses = "",
}: Props) => {
  return (
    <div
      className={`bg-white rounded-[18px] min-h-[200px] border border-[var(--gray20)] common-shadow relative ${classes}`}
      style={style}
    >
      {title ? (
        <div className="px-5 h-[50px] border-b border-[var(--gray20)] flex justify-between items-center w-full">
          <h2 className="text-sm small_desktop:text-lg font-medium">{title}</h2>
          <div>{extra}</div>
        </div>
      ) : (
        ""
      )}
      <div className={`p-3 ${childClasses}`}>{children}</div>
      {footer ? (
        <div className="p-5 border-t border-[var(--gray20)]">{footer}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CCard;
