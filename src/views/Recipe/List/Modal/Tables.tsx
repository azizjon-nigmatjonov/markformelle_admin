import { useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import "./style.scss";
import { DragDrop } from "./StepComponents/DragDrop";
export const LabModalTables = ({
  disabled,
  setChanged = () => {},
  changed,
  askAction,
  setAskAction = () => {},
  setOpenMainModal,
}: {
  disabled: boolean;
  changed: string;
  askAction: string;
  setOpenMainModal: (val: boolean) => void;
  setAskAction: (val: string) => void;
  setChanged: (val: string) => void;
}) => {
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [open, setOpen] = useState("");

  const handleActionsDetails = (_: {}, type: string) => {
    if (type === "modal" || type === "view") {
      setOpen("detail");
    }
  };

  return (
    <div className="pb-40 pt-3 border-t border-[var(--border)]">
      <DragDrop
        changed={changed}
        setChanged={setChanged}
        askAction={askAction}
        setAskAction={setAskAction}
        setOpenMainModal={setOpenMainModal}
      />
      {open.length ? (
        <CNewMiniModal
          title={
            open === "material"
              ? "Add material"
              : open === "trial"
              ? "Add trial"
              : "Add details"
          }
          handleActions={() => setOpen("")}
        >
          {open === "material" && <MaterialForm onClose={() => setOpen("")} />}
          {open === "trial" && (
            <TrailForm
              onClose={() => setOpen("")}
              handleActionsDetails={handleActionsDetails}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              disabled={disabled}
              setOpen={setOpen}
            />
          )}
          {open === "detail" && <DetailForm onClose={() => setOpen("")} />}
        </CNewMiniModal>
      ) : (
        ""
      )}
    </div>
  );
};
