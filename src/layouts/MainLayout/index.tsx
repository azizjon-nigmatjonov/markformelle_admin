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

const MainLayout = () => {
  const wrapperRef: any = useRef(null);
  const alertData = useSelector((state: any) => state.website.alert);
  const resize = useSelector((state: any) => state.sidebar.resize);
  const ver = useSelector((state: any) => state.auth.version);
  const dispatch = useDispatch();

  const handleResize = () => {
    dispatch(sidebarActions.setCollapsed(resize ? false : true));
    dispatch(sidebarActions.setOpenHeader(resize ? false : true));
    dispatch(sidebarActions.setResize(!resize));
  };

  const GetTimeGlobal = () => {
    axios
      .get("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FTashkent")
      .then((res) => {
        dispatch(globalToolActions.setCurrTime(res?.data?.dateTime));
      });
  };

  useEffect(() => {
    GetTimeGlobal();

    const refetching = setInterval(() => {
      GetTimeGlobal();
    }, 60000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();

    if (day == ver) {
      return;
    }
    if (now.getHours() === 12) {
      dispatch(authActions.setVersion(day));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [ver]);

  return (
    <div className={cls.layout} ref={wrapperRef}>
      <div className="border-r border-[var(--border)]">
        <Sidebar />
      </div>
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
    </div>
  );
};

export default MainLayout;
