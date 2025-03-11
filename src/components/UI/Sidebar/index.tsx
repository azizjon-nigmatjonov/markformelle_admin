import { useEffect } from "react";
import cls from "./style.module.scss";
import SidebarSection from "./Section";
import UserInfo from "../Header/UserInfo";
import { getWebsiteData } from "./Logic";
import { FoldButton } from "./FoldButton";
import { useDispatch, useSelector } from "react-redux";
import { sidebarActions } from "../../../store/sidebar";
import usePageRouter from "../../../hooks/useObjectRouter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export const Sidebar = () => {
  const { userInfo, routes } = getWebsiteData();
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  const wideSidebar = useSelector((state: any) => state.sidebar.wideSidebar);
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
      className={`${cls.sidebar} duration-300`}
      style={{
        width: wideSidebar ? "240px" : collapsed ? "45px" : "0",
        overflow: wideSidebar ? "" : collapsed ? "" : "hidden",
      }}
    >
      <div className="overflow-y-scroll remove-scroll">
        <div
          className={`overflow-y-scroll remove-scroll overflow-x-hidden duration-300 ${
            collapsed ? "" : "pr-[14px]"
          }`}
          style={{ height: "100vh" }}
        >
          <div
            className={`h-[35px] desktop:h-[45px] text-xl flex ${
              wideSidebar ? "" : "justify-center"
            } w-full items-center border-b border-[var(--border)] px-1`}
          >
            {!wideSidebar ? (
              <img width={120} src="/images/logo_mini.png" alt="logo" />
            ) : (
              <img width={70} src="/images/logo.png" alt="logo" />
            )}
          </div>
          <button
            onClick={() =>
              dispatch(sidebarActions.setWideSidebar(!wideSidebar))
            }
            className={`${
              wideSidebar ? "right-2 top-0 absolute" : ""
            } w-[25px] h-[25px] desktop:w-[30px] desktop:h-[30px] flex justify-center items-center rounded-full bg-[var(--main80)] mx-auto my-2`}
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
            list={routes}
            collapsed={collapsed}
            wideSidebar={wideSidebar}
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
            wideSidebar={wideSidebar}
            collapsed={collapsed}
            handleNavigate={handleNavigate}
          />
        </div>
      </div>

      <FoldButton
        collapsed={collapsed}
        wideSidebar={wideSidebar}
        setCollapsed={() => dispatch(sidebarActions.setCollapsed(!collapsed))}
      />
    </div>
  );
};
