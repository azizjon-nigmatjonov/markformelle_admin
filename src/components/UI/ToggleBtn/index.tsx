import AppsIcon from "@mui/icons-material/Apps";
import ReorderIcon from "@mui/icons-material/Reorder";
import { IconButton } from "@mui/material";

interface Props {
  type: string;
  setType: (val: string) => void;
}

export const ToggleBtn = ({ type = "", setType = () => {} }: Props) => {
  // const location = useLocation();
  // const dispatch = useDispatch();
  // const listType = useSelector((state: any) => state.sidebar.listType);

  // const pageName: any = useMemo(() => {
  //   const strLen =
  //     location.pathname.split("/")[2].length +
  //     location.pathname.split("/")[1].length;

  //   let result = location.pathname.substring(0, strLen + 2);

  //   return result;
  // }, [location]);

  const handleToggle = (type: any) => {
    setType(type);
    // dispatch(sidebarActions.setListType({ pageName, payload: 123 }));
  };

  // const type = listType?.[pageName];

  return (
    <div
      onClick={() => handleToggle(type === "list" ? "grid" : "list")}
      className="flex justify-between items-center"
    >
      <IconButton>
        <div className="relative flex items-center justify-between border border-[var(--border)] overflow-hidden h-[25px] desktop:h-[35px] rounded-[12px]">
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
            className={`absolute left-0 top-0 w-1/2 h-full bg-[var(--primary)] z-[-1] rounded-[12px] ${
              type === "list" ? "right-0 left-auto" : ""
            }`}
          ></div>
        </div>
      </IconButton>
    </div>
  );
};
