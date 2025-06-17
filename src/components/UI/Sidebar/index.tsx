import { useCallback, useEffect, useMemo } from "react";
import React from "react";
import cls from "./style.module.scss";
import SidebarSection from "./Section";
import UserInfo from "../Header/UserInfo";
import { FoldButton } from "./FoldButton";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../../store/sidebar";
import usePageRouter from "../../../hooks/useObjectRouter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const SidebarComponent = () => {
  // Memoize selectors to prevent unnecessary re-renders
  const userInfo = useSelector((state: any) => state.auth.user);
  const routes = useSelector((state: any) => state.website.routes);
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const wideSidebar = useSelector((state: any) => state.sidebar.wideSidebar);

  const dispatch = useDispatch();
  const { navigateTo } = usePageRouter();

  // Memoize website data to prevent recalculation on every render
  const websiteData = useMemo(
    () => ({
      userInfo: userInfo ?? {},
      routes: routes ?? [],
    }),
    [userInfo, routes]
  );

  // Memoize sidebar width calculation
  const sidebarWidth = useMemo(() => {
    if (wideSidebar) return "240px";
    if (collapsed) return "45px";
    return "0";
  }, [wideSidebar, collapsed]);

  // Memoize overflow style
  const sidebarOverflow = useMemo(() => {
    if (wideSidebar) return "";
    if (collapsed) return "";
    return "hidden";
  }, [wideSidebar, collapsed]);

  useEffect(() => {
    if (!sessionStorage.getItem("has_route")) {
      sessionStorage.setItem("has_route", "true");
      window.location.reload();
    }
  }, []);

  const handleNavigate = useCallback(
    (obj: any) => {
      console.log("111");

      navigateTo(obj.path);
    },
    [navigateTo]
  );

  const handleWideSidebarToggle = useCallback(() => {
    dispatch(sidebarActions.setWideSidebar(!wideSidebar));
  }, [dispatch, wideSidebar]);

  const handleCollapseToggle = useCallback(() => {
    if (wideSidebar) {
      dispatch(sidebarActions.setWideSidebar(false));
    } else {
      dispatch(sidebarActions.setCollapsed(!collapsed));
    }
  }, [dispatch, wideSidebar, collapsed]);

  useEffect(() => {
    if (!collapsed) {
      dispatch(sidebarActions.setWideSidebar(false));
    }
  }, [collapsed, dispatch]);

  return (
    <div
      className={`${cls.sidebar} duration-300`}
      style={{
        width: sidebarWidth,
        overflow: sidebarOverflow,
      }}
    >
      <div>
        <div
          className={`overflow-y-scroll remove-scroll duration-300 ${
            collapsed ? "" : "pr-[14px]"
          }`}
          style={{ height: "100vh" }}
        >
          <div
            className={`h-[45px] desktop:h-[45px] text-xl flex ${
              wideSidebar ? "" : "justify-center mb-10"
            } w-full items-center border-b border-[var(--border)] px-1`}
          >
            <img
              width={wideSidebar ? 75 : 70}
              src="/images/logo.png"
              alt="logo"
            />
          </div>
          <button
            onClick={handleWideSidebarToggle}
            className={`duration-300 absolute ${
              wideSidebar ? "right-2 top-0" : "right-2 top-12"
            } w-[25px] h-[25px] desktop:w-[30px] desktop:h-[30px] flex justify-center items-center rounded-[8px] bg-[var(--main80)] mx-auto my-2`}
          >
            <div className={wideSidebar ? "" : "ml-1"}>
              {wideSidebar ? (
                <KeyboardArrowLeftIcon style={{ color: "var(--main)" }} />
              ) : (
                <KeyboardArrowRightIcon style={{ color: "var(--main)" }} />
              )}
            </div>
          </button>
          <SidebarSection
            list={websiteData.routes}
            collapsed={collapsed}
            wideSidebar={wideSidebar}
            handleNavigate={handleNavigate}
          />
        </div>

        <div
          className={`absolute bottom-0 h-[40px] border-t border-[var(--border)] flex items-center w-full z-[2] bg-white ${
            collapsed ? "" : "px-16px"
          }`}
        >
          <UserInfo
            userInfo={websiteData.userInfo}
            wideSidebar={wideSidebar}
            collapsed={collapsed}
            handleNavigate={handleNavigate}
          />
        </div>
      </div>

      <FoldButton
        collapsed={collapsed}
        wideSidebar={wideSidebar}
        setCollapsed={handleCollapseToggle}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const Sidebar = React.memo(SidebarComponent);
Sidebar.displayName = "Sidebar";
