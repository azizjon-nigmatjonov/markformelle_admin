import AppsIcon from "@mui/icons-material/Apps";
import ReorderIcon from "@mui/icons-material/Reorder";

interface Props {
  type: string;
  setType: (val: string) => void;
}

export const ToggleBtn = ({ type = "list", setType = () => {} }: Props) => {
  return (
    <div
      onClick={() => setType(type === "list" ? "grid" : "list")}
      className="flex justify-between items-center"
    >
      <button className="relative flex items-center justify-between border border-[var(--border)] overflow-hidden h-[25px] desktop:h-[35px] rounded-[12px]">
        <div className="w-[30px] desktop:w-[40px] h-full flex items-center justify-center">
          <AppsIcon
            style={{
              color: type === "list" ? "var(--gray)" : "white",
              fontSize: 20,
            }}
          />
        </div>
        <div className="w-[30px] desktop:w-[40px] h-full flex items-center justify-center">
          <ReorderIcon
            style={{
              color: type === "list" ? "white" : "var(--gray)",
              fontSize: 20,
            }}
          />
        </div>

        <div
          className={`absolute left-0 top-0 w-1/2 h-full bg-[var(--primary)] z-[-1] rounded-[12px] duration-200 ${
            type === "list" ? "right-0 left-auto" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};
