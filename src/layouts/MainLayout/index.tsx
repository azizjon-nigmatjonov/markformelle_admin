import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/UI/Sidebar";
import cls from "./style.module.scss";
import { useSelector } from "react-redux";
import CAlert from "../../components/CElements/CAlert";
import { BackButtonRoute, CheckLogin, ColorData } from "./Logic";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const alertData = useSelector((state: any) => state.website.alert);
  
  return (
    <div className={cls.layout}>
      <div>
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
    </div>
  );
};

export default MainLayout;
