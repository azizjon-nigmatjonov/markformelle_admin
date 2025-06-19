import "./style.scss";
import { DragDrop } from "./StepComponents/DragDrop";
export const LabModalTables = ({
  setChanged = () => {},
  changed,
  askAction,
  setAskAction = () => {},
  setOpen,
  open,
  setCurrentSellect,
  tableData,
  refetchTable,
}: {
  open: string[];
  setOpen: (val: string[]) => void;
  changed: string;
  askAction: string;
  tableData: any;
  setAskAction: (val: string) => void;
  setChanged: (val: string) => void;
  setCurrentSellect: (val: any) => void;
  refetchTable: () => void;
}) => {
  return (
    <div className="border-t border-[var(--border)]">
      <DragDrop
        open={open}
        changed={changed}
        setChanged={setChanged}
        askAction={askAction}
        setAskAction={setAskAction}
        setOpen={setOpen}
        tableData={tableData}
        setCurrentSellect={setCurrentSellect}
        refetchTable={refetchTable}
      />
    </div>
  );
};
