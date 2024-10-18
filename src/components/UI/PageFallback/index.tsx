import { CircularProgress } from "@mui/material";
import cls from "./style.module.scss";

const PageFallback = () => {
  return (
    <div className={cls.fallbackPage}>
      <CircularProgress size={120} />
    </div>
  );
};

export default PageFallback;

export const PageFallbackInner = () => {
  return (
    <div className={cls.fallbackPage}>
      <CircularProgress size={120} />
    </div>
  );
};
