import { MachineCardBody } from "./Body";
import { MachineCardFooter } from "./Footer";
import { MachineCardHeader } from "./Header";

interface Props {
  machine: any;
}

const MachinCardUI = ({ machine = {} }: Props) => {
  return (
    <div
      className={`rounded-[12px] relative w-full bg-white ${machine.new_status.color}`}
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
    </div>
  );
};

export default MachinCardUI;
