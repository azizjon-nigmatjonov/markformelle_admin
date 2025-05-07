import cls from "./style.module.scss";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import { LangDropdown } from "./LangDropdown";
import { HeaderFoldButton } from "./FoldButton";
import { sidebarActions } from "../../../store/sidebar";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { MobileHeader } from "./MobileHeader";
import { Tooltip } from "@mui/material";
import { TooltipPosition } from "../../../constants/toolPosition";

interface Props {
  open?: boolean;
  title?: string;
  titleIn?: string;
  children?: any;
  sticky?: boolean;
  user?: boolean;
  extra?: ReactNode;
  filters?: any;
}

export const Header = ({
  title = "",
  titleIn = "",
  sticky = false,
  children,
  user = true,
  extra,
  open = false,
  filters,
  ...props
}: Props) => {
  const ipodScreen = useScreenSize("ipod");
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const dispatch = useDispatch();
  const wideSidebar = useSelector((state: any) => state.sidebar.wideSidebar);
  const setCollapsed = (val: boolean) => {
    dispatch(sidebarActions.setOpenHeader(val));
  };

  if (ipodScreen) {
    return <MobileHeader extra={extra} filters={filters} />;
  }

  return (
    <div
      className={`duration-300 ${
        openHeader ? "mb-[45px] desktop:mb-[45px]" : ""
      }`}
    >
      <div className="fixed z-[96]">
        <HeaderFoldButton
          collapsed={open || openHeader}
          setCollapsed={setCollapsed}
        />
        <div
          className={`h-[45px] desktop:h-[45px] relative z-[98] bg-white w-full duration-300 ${
            openHeader || open ? "" : "hidden"
          }`}
        >
          <div
            className={`${cls.header} duration-200`}
            {...props}
            style={{
              width: wideSidebar
                ? "calc(100vw - 240px)"
                : collapsed
                ? "calc(100vw - 45px)"
                : "",
              left: wideSidebar ? "240px" : collapsed ? "45px" : "",
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
              <div className="h-[20px] w-[2px] bg-[var(--gray20)] mx-2"></div>

              <div className="flex items-center space-x-2">
                <Tooltip
                  arrow
                  slotProps={TooltipPosition}
                  placement="right"
                  title={`Изменение язык системы`}
                >
                  <div className="w-[140px]">
                    <LangDropdown />
                  </div>
                </Tooltip>

                <Notification />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
