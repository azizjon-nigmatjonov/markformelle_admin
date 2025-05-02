import { useState } from "react";
import { ChniCardModal } from "../../../../views/Chni/Components/Modal";
import { MachineCardBody } from "./Body";
import { MachineCardHeader } from "./Header";
import CNewModal from "../../../CElements/CNewModal";
interface Props {
  machine: any;
}

const MachinCardUI = ({ machine = {} }: Props) => {
  const [open, setOpen]: any = useState(false);

  return (
    <>
      <div
        className={`rounded-[12px] relative w-full pb-4 cursor-pointer bg-white ${machine.new_status.color}`}
        onClick={(e: any) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <MachineCardHeader
          data={{
            title: machine.machine_name,
          }}
          count={6}
        />
        <MachineCardBody
          data={{
            plan: machine.total_socks_plan ?? "",
            plan_hourly: 0,
            fact: machine.total_socks_fact,
          }}
          count={6}
        />
      </div>
      {open && (
        <CNewModal
          title={machine.machine_name}
          handleActions={() => setOpen(false)}
        >
          <div className="min-h-[700px]">
            <ChniCardModal open={open} setOpen={setOpen} element={machine} />
          </div>
        </CNewModal>
      )}
    </>
  );
};

export default MachinCardUI;
