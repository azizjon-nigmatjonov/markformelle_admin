import { useSelector } from "react-redux";
import "./style.scss";

const CFooter = ({ children }: any) => {
  const collapsed = useSelector((state: any) => state.sidebar.collapsed);
  return (
    <div
      style={{ width: collapsed ? "calc(100% - 45px)" : "100%" }}
      className="cfooter border-t border-[var(--border)] bg-white flex items-center w-full px-5 z-[99]"
    >
      {children}
    </div>
  );
};

export default CFooter;
