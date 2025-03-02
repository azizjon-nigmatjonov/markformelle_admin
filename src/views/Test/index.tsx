import { useState } from "react";
import { ViewingModal } from "./ViewingModal/ViewingModal";
import { AllViewTable } from "./AllViewTable/AllViewTable";
import { InsertModal } from "./InsertModal";

export const TestExampleView = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  return (
    <div>
      <button onClick={() => setOpen(true)}>modal</button>
      <button onClick={() => setModalOpen("insert")} className="ml-10">
        insert
      </button>

      <ViewingModal open={open} onClose={() => setOpen(false)}>
        <AllViewTable />
      </ViewingModal>

      <ViewingModal
        open={modalOpen === "insert"}
        onClose={() => setModalOpen("")}
      >
        <InsertModal />
      </ViewingModal>
    </div>
  );
};
