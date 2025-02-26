import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/UI/Sidebar";
import cls from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CAlert from "../../components/CElements/CAlert";
import { BackButtonRoute, CheckLogin, ColorData } from "./Logic";
import { Toaster } from "react-hot-toast";
import { ResizeIcon } from "../../components/UI/IconGenerator/Svg/Sidebar";
import { sidebarActions } from "../../store/sidebar";
import { useEffect, useRef } from "react";
import { authActions } from "../../store/auth/auth.slice";
import axios from "axios";
import { globalToolActions } from "../../store/globalTools";
import { RollLogic } from "./Logic/Roll";
import { useScreenSize } from "../../hooks/useScreenSize";

const MainLayout = () => {
  const wrapperRef: any = useRef(null);
  const alertData = useSelector((state: any) => state.website.alert);
  const resize = useSelector((state: any) => state.sidebar.resize);
  const ver = useSelector((state: any) => state.auth.version);
  const dispatch = useDispatch();
  const ipodScreen = useScreenSize("ipod");

  const handleResize = () => {
    dispatch(sidebarActions.setCollapsed(resize ? false : true));
    dispatch(sidebarActions.setOpenHeader(resize ? false : true));
    dispatch(sidebarActions.setResize(!resize));
  };

  const setTimeStore = (data: any) => {
    dispatch(globalToolActions.setCurrTime(data));
  };

  const GetTimeGlobal = () => {
    axios
      .get("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FTashkent")
      .then((res) => {
        setTimeStore(res?.data?.dateTime);
      });
  };

  useEffect(() => {
    GetTimeGlobal();

    setInterval(() => {
      GetTimeGlobal();
    }, 60000);
  }, []);

  const VersionUpdater = (ver: any) => {
    const now = new Date();
    const hour = now.getHours();

    if (now.getHours() !== ver) {
      setTimeout(() => {
        dispatch(authActions.setVersion(hour));
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    VersionUpdater(ver);
    setInterval(() => {
      VersionUpdater(ver);
    }, 3600000);
  }, [ver]);

  return (
    <div className={cls.layout} ref={wrapperRef}>
      {!ipodScreen && (
        <div className="border-r border-[var(--border)]">
          <Sidebar />
        </div>
      )}
      <div className={`${cls.content} remove-scroll`}>
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

      <RollLogic />
    </div>
  );
};

export default MainLayout;
