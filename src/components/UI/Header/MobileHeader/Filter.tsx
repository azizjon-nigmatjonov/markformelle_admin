import Drawer from "@mui/material/Drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  children?: ReactNode;
}

export const HeaderFilter = ({ open = false, setOpen, children }: Props) => {
  const handleSubmit = () => {
    setOpen(false)
  }
  
  return (
    <div>
      <Drawer
        anchor="top"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="bg-white w-full h-[50vh] rounded-none p-3">
          <div className="flex justify-between items-center">
            <button className="w-5" onClick={() => setOpen(false)}>
              <ArrowBackIosIcon />
            </button>
            <h3 className="font-medium text-xl">Filter</h3>
            <div className="w-5"></div>
          </div>
          <div className="mt-4">{children}</div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 ">
            <button onClick={() => handleSubmit()} className="custom-btn">Применять</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
