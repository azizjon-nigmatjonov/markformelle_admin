import MenuIcon from "@mui/icons-material/Menu";
import { HeaderDrawer } from "./Drawer";
import { useState } from "react";
import { SearchIcon } from "../../IconGenerator/Svg";
import { HeaderFilter } from "./Filter";

interface Props {
  extra: any;
  filters: any;
}

export const MobileHeader = ({ extra, filters }: Props) => {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="h-[35px] w-full bg-[var(--surface)] z-[98] relative flex items-center justify-between px-3">
        <button onClick={() => setOpen(!open)}>
          <MenuIcon />
        </button>
        <div className="pl-3">{extra}</div>
        <button onClick={() => setFilterOpen(true)}>
          <SearchIcon />
        </button>
      </div>
      <HeaderFilter open={filterOpen} setOpen={setFilterOpen}>
        {filters}
      </HeaderFilter>
      <HeaderDrawer open={open} setOpen={setOpen} />
    </>
  );
};
