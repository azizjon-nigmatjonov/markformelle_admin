import { useState } from "react";
import { ChniCardModal } from "../../../../views/Chni/Components/Modal";
import { MachineCardBody } from "./Body";
import { MachineCardFooter } from "./Footer";
import { MachineCardHeader } from "./Header";
import { Modal } from "@mui/joy";
interface Props {
  machine: any;
}

const MachinCardUI = ({ machine = {} }: Props) => {
  const [open, setOpen]: any = useState(false);
  return (
    <div
      className={`rounded-[12px] relative w-full pb-4 bg-white ${machine.new_status.color}`}
      onClick={(e: any) => {
        e.stopPropagation();
        setOpen(true);
      }}
    >
      <MachineCardHeader
        data={{
          title: machine.name,
          defect_num: machine.defect_num,
          new_rolls: machine.new_rolls,
        }}
        count={6}
      />
      <MachineCardBody
        data={{
          fakt_percentage: machine.fakt_percentage,
          fkol_knit: machine.fkol_knit ?? "",
          pkol_knit: machine.pkol_knit ?? "",
          rotation: machine.rotation,
        }}
        count={6}
      />
      <MachineCardFooter data={{ efficiency: machine.efficiency }} count={6} />

      {open && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={(e: any) => {
            e.stopPropagation();
            setOpen(false);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChniCardModal open={open} setOpen={setOpen} element={machine} />
        </Modal>
      )}
    </div>
  );
};

export default MachinCardUI;
