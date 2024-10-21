import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/UI/Sidebar";
import cls from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CAlert from "../../components/CElements/CAlert";
import { BackButtonRoute, CheckLogin, ColorData } from "./Logic";
import { Toaster } from "react-hot-toast";
import { ResizeIcon } from "../../components/UI/IconGenerator/Svg/Sidebar";
import { sidebarActions } from "../../store/sidebar";

const MainLayout = () => {
  const alertData = useSelector((state: any) => state.website.alert);
  const resize = useSelector((state: any) => state.sidebar.resize);
  const dispatch = useDispatch();

  const handleResize = () => {
    dispatch(sidebarActions.setCollapsed(resize ? false : true));
    dispatch(sidebarActions.setOpenHeader(resize ? false : true));
    dispatch(sidebarActions.setResize(!resize));
  };

  return (
    <div className={cls.layout}>
      <div className="border-r border-[var(--border)]">
        <Sidebar />
      </div>
      <div className={cls.content}>
        <Outlet />
      </div>

      <BackButtonRoute />
      <Toaster position="top-right" />
      {alertData?.title && <CAlert data={alertData} />}
      <ColorData />
      <CheckLogin />

      <button
        className="fixed right-3 bottom-3 z-[99]"
        onClick={() => handleResize()}
      >
        <ResizeIcon fill={resize ? "black" : "var(--gray)"} />
      </button>
    </div>
  );
};

export default MainLayout;
