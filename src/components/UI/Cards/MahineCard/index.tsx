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
          title: machine.machine_number,
          defect_num: machine.defect_num,
          new_rolls: machine.new_rolls,
        }}
        count={6}
      />
      <MachineCardBody
        data={{
          plan: machine.plan ?? "",
          plan_hourly: machine.plan_hourly,
          plan_fact: machine.plan_fact,
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