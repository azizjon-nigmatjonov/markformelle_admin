import { ReactNode, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export const CollapseUI = ({
  children,
  title,
  border = true,
  defaultOpen = true,
  disabled = false,
}: {
  children: ReactNode;
  title: string;
  defaultOpen?: boolean;
  border?: boolean;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <div className="pb-5">
      <div className="flex items-center space-x-2 mt-2 pb-1">
        <h3 className="text-[14px] ">{title}</h3>
        {disabled ? (
          ""
        ) : (
          <button
            type="button"
            onClick={() => {
              !disabled ? setOpen((prev) => !prev) : "";
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>
        )}
      </div>
      {border ? (
        <div className="bg-[var(--border)] h-[1px] w-full mb-3"></div>
      ) : (
        ""
      )}
      {open && children}
    </div>
  );
};
