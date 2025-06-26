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
  isLoading,
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
  isLoading: boolean;
}) => {
  return (
    <div className="w-full">
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
        isLoading={isLoading}
      />
    </div>
  );
};
