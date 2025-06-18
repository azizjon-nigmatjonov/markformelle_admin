import "./style.scss";
import { DragDrop } from "./StepComponents/DragDrop";
export const LabModalTables = ({
  formId,
  setChanged = () => {},
  changed,
  askAction,
  setAskAction = () => {},
  setOpen,
  open,
  setCurrentSellect,
  tableData,
}: {
  open: string[];
  setOpen: (val: string[]) => void;
  formId: string;
  changed: string;
  askAction: string;
  tableData: any;
  setAskAction: (val: string) => void;
  setChanged: (val: string) => void;
  setCurrentSellect: (val: any) => void;
}) => {
  return (
    <div className="border-t border-[var(--border)]">
      <DragDrop
        open={open}
        formId={formId}
        changed={changed}
        setChanged={setChanged}
        askAction={askAction}
        setAskAction={setAskAction}
        setOpen={setOpen}
        tableData={tableData}
        setCurrentSellect={setCurrentSellect}
      />
    </div>
  );
};
