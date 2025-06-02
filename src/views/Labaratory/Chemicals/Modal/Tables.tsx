import { useEffect, useMemo, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { TwoRowTable } from "./TableUI/TwoRowTable";
import { TableUI } from "./TableUI/TableUI";
import {
  DetailTableLogic,
  TableHeadersLogic,
  TablesLogic,
  TrailTableLogic,
} from "./Logic";
import { MaterialFormLogic } from "./MaterialForm/Logic";
import { TrailFormLogic } from "./TrailForm/Logic";
import { DetailFormLogic } from "./DetailForm/Logic";

export const LabModalTables = ({
  disabled,
  formId,
  formData = {},
  setUniqueID,
}: {
  disabled: boolean;
  formId: number;
  formData: any;
  setUniqueID: (val: string) => void;
}) => {
  const { tableData, refetch: refetchMaterial } = TablesLogic({
    formId: formData?.LABRECETEID,
  });
  const [idTable, setIdTable]: any = useState(null);
  const [idMaterial, setIdMaterial]: any = useState(null);
  const [idTrail, setIdTrail]: any = useState(null);
  const [idTrailForm, setIdTrailForm]: any = useState(null);
  const [idDetailForm, setIdDetailForm]: any = useState(null);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [open, setOpen] = useState("");
  const { headColumns, trailHeadColumns, detailHeadColumns } =
    TableHeadersLogic();
  const { trailData, refetch: refetchTrailTable } = TrailTableLogic({
    id: formId,
    idTable: idTable,
  });
  const { detailData, refetch: refetchDetailTable } = DetailTableLogic({
    id: formId,
    idTable: idTrail,
  });
  const refetchAll = () => {
    refetchMaterial();
    refetchTrailTable();
    refetchDetailTable();
  };
  const { deleteFn } = MaterialFormLogic({ refetchMaterial: refetchAll });
  const { deleteFn: deleteTrailFn } = TrailFormLogic({
    refetchTable: refetchAll,
  });
  const { deleteFn: deleteDetailFn } = DetailFormLogic({
    refetchTable: refetchAll,
  });

  useEffect(() => {
    if (open.length) setUniqueID(open);
    else setUniqueID("main_table_lab");
  }, [open]);

  useEffect(() => {
    if (tableData?.data?.length) {
      setIdTable(tableData.data[0].LABRECETECALISMAID);
    }
  }, [tableData]);

  useEffect(() => {
    if (trailData?.okey?.length) {
      setIdTrail(trailData.okey[0].LABRECETEATISID);
    }
  }, [trailData]);

  useEffect(() => {
    if (detailData?.length) {
      setIdDetailForm(detailData[0].LABRECETEURUNID);
    }
  }, [detailData]);

  const handleActionsMaterial = (
    el: { index: number; LABRECETECALISMAID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "view_single") {
      setIdTable(el.LABRECETECALISMAID);
      setIdMaterial(el.LABRECETECALISMAID);
    }

    if (type === "view") {
      setOpen("material");
      setIdMaterial(el.LABRECETECALISMAID);
    }

    if (type === "modal") {
      setOpen("material");
      setIdMaterial(null);
    }

    if (type === "delete") {
      deleteFn(
        arr.map((item: { LABRECETECALISMAID: number }) => {
          return item.LABRECETECALISMAID;
        })
      );
    }
  };

  const handleActionsTrial = (
    el: { index: number; LABRECETEATISID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "modal") {
      setOpen("trial");
      setIdTrailForm(null);
    }

    if (type === "view_single") {
      setIdTrail(el.LABRECETEATISID);
    }
    if (type === "view") {
      setIdTrailForm(el.LABRECETEATISID);
      setOpen("trial");
    }

    if (type === "delete") {
      deleteTrailFn(
        arr.map((item: { LABRECETEATISID: number }) => {
          return item.LABRECETEATISID;
        })
      );
    }
  };

  const handleActionsDetails = (
    el: { index: number; LABRECETEURUNID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "modal") {
      setOpen("detail");
      setIdDetailForm(null);
    }
    if (type === "view_single") {
      setIdDetailForm(el.LABRECETEURUNID);
    }

    if (type === "view") {
      setIdDetailForm(el.LABRECETEURUNID);
      setOpen("detail");
    }

    if (type === "delete") {
      deleteDetailFn(
        arr.map((item: { LABRECETEURUNID: number }) => {
          return item.LABRECETEURUNID;
        })
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-x-2">
        <div className="border rounded-[12px] border-[var(--border)] pb-11">
          <TableUI
            title="material"
            headColumns={headColumns}
            idTable={idTable}
            bodyColumns={tableData?.data}
            handleRowClick={handleActionsMaterial}
            disabled={disabled}
            name="LABRECETECALISMAID"
          />
        </div>

        <div className="rounded-[12px] border border-[var(--border)]">
          <TwoRowTable
            title="trail"
            headColumns={trailHeadColumns}
            bodyColumns={trailData}
            handleRowClick={handleActionsTrial}
            disabled={tableData?.data ? false : true}
            idTable={idTrail}
          />
        </div>

        <div className="border rounded-[12px] border-[var(--border)] pb-11">
          <TableUI
            title="detail"
            idTable={idDetailForm}
            handleRowClick={handleActionsDetails}
            headColumns={detailHeadColumns}
            bodyColumns={detailData}
            name="LABRECETEURUNID"
            disabled={!trailData?.okey?.length && !trailData?.okeysiz?.length}
          />
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
          handleActions={() => {
            setOpen("");
            refetchAll();
          }}
        >
          {open === "material" && (
            <MaterialForm
              onClose={() => {
                setOpen("");
              }}
              refetchMaterial={() => {
                refetchAll();
                setIdMaterial(null);
              }}
              formData={formData}
              formId={idMaterial}
              open={open}
            />
          )}
          {open === "trial" && (
            <TrailForm
              onClose={() => setOpen("")}
              handleActionsDetails={handleActionsDetails}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              disabled={disabled}
              setOpen={setOpen}
              formId={idTrailForm}
              DetailHeader={detailHeadColumns}
              detailData={detailData}
              labReceteId={formData?.LABRECETEID}
              materialId={idTable}
              open={open}
              refetchTable={refetchAll}
            />
          )}
          {open === "detail" && (
            <DetailForm
              onClose={() => setOpen("")}
              formId={idDetailForm}
              idTrail={idTrail}
              open={open}
              materialID={formData?.LABRECETEID}
              refetchTable={refetchAll}
            />
          )}
        </CNewMiniModal>
      ) : (
        ""
      )}
    </>
  );
};
