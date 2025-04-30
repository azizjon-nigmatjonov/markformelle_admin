import { useMemo, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { StokeDeteyContantList } from "../../../../constants/stokedetey";
import cls from "./style.module.scss";
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

  console.log("TableList", TableList);

  return (
    <>
      <div className={cls.customTable}>
        <div className="flex space-x-3">
          <div className={cls.cellFirst}>
            <h3>Image</h3>
          </div>
          <div className={cls.cell}>
            <h3>Recete Kodu</h3>
          </div>
          <div className={cls.cell}>
            <h3>Urun Kodu</h3>
          </div>
        </div>
        <div>
          {TableList.map((item: any) => (
            <div key={item.id} className="flex py-2 border-b gap-x-3">
              <div className={cls.cellFirst}>
                <img
                  className="h-[270px] w-[400px]"
                  src={item.image}
                  alt={item.image}
                />
              </div>
              <div className="flex flex-col">
                {item.rows.map((row: any, index: number) => (
                  <div key={index} className="flex">
                    <div className={cls.cell}>{row.URUNBIRIMID}</div>
                    <div className={cls.cell}>{row.RECETEID}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
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
