import cls from "./style.module.scss";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import { ReactNode } from "react";


interface Props {
  title?: string;
  titleIn?: string;
  children?: any;
  sticky?: boolean;
  user?: boolean;
  extra?: ReactNode;
}

export const Header = ({
  title = "",
  titleIn = "",
  sticky = false,
  children,
  user = true,
  extra,
  ...props
}: Props) => {
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  
  return (
    <div className={`h-[50px] relative z-[98] bg-white w-full ${openHeader ? '' : 'hidden'}`}>
      <div
        className={cls.header}
        {...props}
        style={{ width: `calc(100vw - ${collapsed ? "40px" : "280px"})` }}
      >
        <div className="w-full">{extra}</div>
        <div className="flex items-center">
          {children ? (
            children
          ) : (
            <h3 className="text-2xl font-[600] text-[var(--black)]">
              <span className={`${titleIn && "text-[var(--gray)]"}`}>
                {title}
              </span>
              {titleIn ? "/" + titleIn : ""}
            </h3>
          )}
          <div className="h-[20px] w-[2px] bg-[var(--gray20)] ml-5"></div>
          <div className="ml-5 flex items-center space-x-5">
            {/* <OrderDriver /> */}
            <Notification />
          </div>

          <img
            className="absolute right-0 top-0 z-[1]"
            src="/svg/headerLine.svg"
            alt="line"
          />
        </div>
      </div>
    </div>
  );
};
