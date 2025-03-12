import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const OrderUI = ({
  tableActions,
  sortObj,
}: {
  tableActions: (val: any, val2: any) => void;
  sortObj: any;
}) => {
  return (
    <button
      onClick={() => tableActions(sortObj, "reorder")}
      className={`flex w-full h-[40px] text-[12px] items-center space-x-2 p-2 hover:bg-[var(--primary50)] ${
        sortObj?.value === "reorder" ? "bg-[var(--primary50)]" : ""
      }`}
    >
      <DragIndicatorIcon style={{ marginLeft: "-2px", marginRight: "2px" }} />
      <p className="text-[var(--black)]">Изменить порядок</p>
    </button>
  );
};
