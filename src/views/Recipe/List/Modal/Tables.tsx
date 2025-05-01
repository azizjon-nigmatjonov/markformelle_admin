import { useMemo, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { StokeDeteyContantList } from "../../../../constants/stokedetey";
import "./style.scss";
import { TableUI } from "./TableUI";
export const LabModalTables = ({ disabled }: { disabled: boolean }) => {
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });

  const [open, setOpen] = useState("");

  const handleActionsDetails = (_: {}, type: string) => {
    if (type === "modal" || type === "view") {
      setOpen("detail");
    }
  };

  const TableList = useMemo(() => {
    const objects: any = {};
    let lastId = "";
    for (let i = 0; i < StokeDeteyContantList.length; i++) {
      const obj = StokeDeteyContantList[i];
      if (obj.RECETEASAMAID) lastId = "" + obj.RECETEASAMAID;

      if (lastId in objects && !obj.RECETEASAMAID) {
        objects[lastId].rows.push(obj);
      } else {
        objects[obj.RECETEASAMAID] = {
          rows: [obj],
          id: obj.RECETEASAMAID,
          image: "/images/test/test1.png",
        };
      }
    }

    return Object.values(objects);
  }, []);

  return (
    <>
      <TableUI TableList={TableList} />

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
    </>
  );
};
