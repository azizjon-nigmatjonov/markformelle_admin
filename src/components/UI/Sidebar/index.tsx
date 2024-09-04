import cls from "./style.module.scss";
import SidebarSection from "./Section";
import UserInfo from "../Header/UserInfo";
import { getWebsiteData } from "./Logic";
import { useEffect } from "react";
import { FoldButton } from "./FoldButton";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../../store/sidebar";
import usePageRouter from "../../../hooks/useObjectRouter";
import { authActions } from "../../../store/auth/auth.slice";

export const Sidebar = ({ openHeader }: { openHeader?: boolean }) => {
  const { userInfo, routes } = getWebsiteData();
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const { navigateTo } = usePageRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("has_route")) {
      sessionStorage.setItem("has_route", "true");
      window.location.reload();
    }
  }, []);

  const handleNavigate = (obj: any) => {
    if (obj?.auth && !token) {
      dispatch(authActions.setLink(obj.path));
    } else {
      navigateTo(obj.path);
    }
  };

  return (
    <div
      className={cls.sidebar}
      style={{
        width: collapsed ? "50px" : "0",
        overflow: collapsed ? "" : "hidden",
      }}
    >
      <div className="overflow-y-scroll remove-scroll">
        <div
          className={`overflow-y-scroll remove-scroll overflow-x-hidden ${
            collapsed ? "" : "pr-[14px]"
          }`}
          style={{ height: `calc(100vh - ${openHeader ? '50px' : '0px'}` }}
        >
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

        {/* <img
          className="absolute w-full left-0 top-1/2 -translate-y-1/2 z-[1]"
          src="/svg/shadow.svg"
          alt="shdow"
        /> */}
      </div>

      <FoldButton
        collapsed={collapsed}
        setCollapsed={() => dispatch(sidebarActions.setCollapsed(!collapsed))}
      />
    </div>
  );
};
