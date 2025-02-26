import { useEffect } from "react";
import cls from "./style.module.scss";
import SidebarSection from "./Section";
import UserInfo from "../Header/UserInfo";
import { getWebsiteData } from "./Logic";
import { FoldButton } from "./FoldButton";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../../store/sidebar";
import usePageRouter from "../../../hooks/useObjectRouter";

export const Sidebar = () => {
  const { userInfo, routes } = getWebsiteData();
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const dispatch = useDispatch();
  const { navigateTo } = usePageRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("has_route")) {
      sessionStorage.setItem("has_route", "true");
      window.location.reload();
    }
  }, []);

  const handleNavigate = (obj: any) => {
    navigateTo(obj.path);
  };

  return (
    <div
      className={cls.sidebar}
      style={{
        width: collapsed ? "45px" : "0",
        overflow: collapsed ? "" : "hidden",
      }}
    >
      <div className="overflow-y-scroll remove-scroll">
        <div
          className={`overflow-y-scroll remove-scroll overflow-x-hidden ${
            collapsed ? "" : "pr-[14px]"
          }`}
          style={{ height: "100vh" }}
        >
          <div className="h-[35px] desktop:h-[45px] text-xl flex justify-center w-full items-center border-b border-[var(--border)] px-1">
            <img src="/images/logo_mini.png" alt="logo" />
          </div>
          <SidebarSection
            list={routes}
            collapsed={collapsed}
            handleNavigate={handleNavigate}
          />
        </div>

        <div
          className={`absolute bottom-0 h-[70px] flex items-center w-full z-[2] bg-white ${
            collapsed ? "" : "px-16px"
          }`}
        >
          <UserInfo
            userInfo={userInfo}
            collapsed={collapsed}
            handleNavigate={handleNavigate}
          />
        </div>
      </div>

      <FoldButton
        collapsed={collapsed}
        setCollapsed={() => dispatch(sidebarActions.setCollapsed(!collapsed))}
      />
    </div>
  );
};
