import { CircularProgress } from "@mui/material";

export const LoadingComponent = () => {
  return (
    <div className="fixed left-0 top-0 flex items-center justify-center w-full h-[100vh]">
      <CircularProgress size={80} />
    </div>
  );
};
