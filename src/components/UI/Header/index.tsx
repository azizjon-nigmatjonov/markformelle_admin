import cls from "./style.module.scss";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import { LangDropdown } from "./LangDropdown";
import { HeaderFoldButton } from "./FoldButton";
import { sidebarActions } from "../../../store/sidebar";

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
  const dispatch = useDispatch();

  const setCollapsed = (val: boolean) => {
    dispatch(sidebarActions.setOpenHeader(val));
  };

  return (
    <>
      <HeaderFoldButton collapsed={openHeader} setCollapsed={setCollapsed} />
      <div
        className={`h-[50px] relative z-[98] bg-white w-full ${
          openHeader ? "" : "hidden"
        }`}
      >
        <div
          className={cls.header}
          {...props}
          style={{
            width: collapsed ? "calc(100vw - 50px)" : "",
            left: collapsed ? "50px" : "",
          }}
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
            <div className="h-[20px] w-[2px] bg-[var(--gray20)] mx-3"></div>

            <div className="flex items-center space-x-3">
              <LangDropdown />
              {/* <OrderDriver /> */}
              <Notification />
            </div>

            <img
              className="absolute right-[-15px] top-0 z-[1]"
              src="/svg/headerLine.svg"
              alt="line"
            />
          </div>
        </div>
      </div>
    </>
  );
};
