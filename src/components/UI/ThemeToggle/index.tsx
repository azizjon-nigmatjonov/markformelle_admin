import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../store/theme/theme.slice";
import { RootState } from "../../../store/types";
import { Tooltip } from "@mui/material";
import { TooltipPosition } from "../../../constants/toolPosition";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    window.location.reload();
  };

  return (
    <Tooltip
      arrow
      slotProps={TooltipPosition}
      title={isDarkMode ? "Light mode" : "Dark mode"}
      placement="bottom"
    >
      <IconButton
        onClick={handleToggle}
        className="w-[25px] h-[25px] desktop:h-[30px] desktop:w-[30px] bg-[var(--surface)] border border-[var(--border)] rounded-[8px] flex items-center justify-center transition-all duration-300 hover:scale-105"
        sx={{
          color: "var(--gray)",
          "&:hover": {
            backgroundColor: "var(--gray20)",
            transform: "scale(1.05)",
          },
        }}
      >
        {isDarkMode ? (
          <LightMode fontSize="small" />
        ) : (
          <DarkMode fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};
