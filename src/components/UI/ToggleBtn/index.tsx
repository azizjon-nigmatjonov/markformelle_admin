import AppsIcon from "@mui/icons-material/Apps";
import ReorderIcon from "@mui/icons-material/Reorder";
import { IconButton } from "@mui/material";

interface Props {
  type: string;
  setType: (val: string) => void;
}

export const ToggleBtn = ({ type = "", setType = () => {} }: Props) => {
  const handleToggle = (type: any) => {
    setType(type);
  };

  return (
    <div
      onClick={() => handleToggle(type === "list" ? "grid" : "list")}
      className="flex justify-between items-center"
    >
      <IconButton>
        <div className="relative flex items-center justify-between border border-[var(--border)] overflow-hidden h-[30px] rounded-[8px]">
          <div className="w-[30px] desktop:w-[40px] h-full flex items-center justify-center z-[2] relative">
            <AppsIcon
              style={{
                color: type === "list" ? "var(--gray)" : "white",
                fontSize: 20,
              }}
            />
          </div>
          <div className="w-[30px] desktop:w-[40px] h-full flex items-center justify-center z-[2] relative">
            <ReorderIcon
              style={{
                color: type === "list" ? "white" : "var(--gray)",
                fontSize: 20,
              }}
            />
          </div>

          <div
            className={`absolute left-0 top-0 w-1/2 h-full bg-[#2E90FA] z-[1] rounded-[8px] ${
              type === "list" ? "right-0 left-auto" : ""
            }`}
          ></div>
        </div>
      </IconButton>
    </div>
  );
};
