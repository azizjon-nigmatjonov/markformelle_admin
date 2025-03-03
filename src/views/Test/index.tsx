import { useState } from "react";
import { ViewingModal } from "./ViewingModal/ViewingModal";
import { AllViewTable } from "./AllViewTable/AllViewTable";
import { TanitimModal } from "./InsertModal";
import { TanitimUrun } from "./Urun";

export const TestExampleView = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  return (
    <div>
      <button onClick={() => setOpen(true)}>modal</button>
      <button onClick={() => setModalOpen("insert")} className="ml-10">
        tanitimi
      </button>

      <button onClick={() => setModalOpen("urun")} className="ml-10">
        urun tanitimi
      </button>

      <ViewingModal open={open} onClose={() => setOpen(false)}>
        <AllViewTable />
      </ViewingModal>

      <ViewingModal
        open={modalOpen === "insert"}
        onClose={() => setModalOpen("")}
      >
        <TanitimModal />
      </ViewingModal>

      <ViewingModal
        open={modalOpen === "urun"}
        onClose={() => setModalOpen("")}
        title="Urun Tanitimi"
      >
        <TanitimUrun />
      </ViewingModal>
    </div>
  );
};
