import { useEffect, useMemo, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { TwoRowTable } from "./TableUI/TwoRowTable";
import { TableUI } from "./TableUI/TableUI";
import { GetCurrentDate } from "../../../../utils/getDate";
import { DetailTableLogic, TablesLogic, TrailTableLogic } from "./Logic";
import { MaterialFormLogic } from "./MaterialForm/Logic";
import { TrailFormLogic } from "./TrailForm/Logic";
import { DetailFormLogic } from "./DetailForm/Logic";

export const LabModalTables = ({
  disabled,
  formId,
  formData = {},
}: {
  disabled: boolean;
  formId: number;
  formData: any;
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
  const { trailData, refetch: refetchTrailTable } = TrailTableLogic({
    id: formId,
    idTable: idTable,
  });
  const { detailData, refetch: refetchDetailTable } = DetailTableLogic({
    id: formId,
    idTable: idTrail,
  });
  const { deleteFn } = MaterialFormLogic({ refetchMaterial });
  const { deleteFn: deleteTrailFn } = TrailFormLogic({
    refetchTable: refetchTrailTable,
  });
  const { deleteFn: deleteDetailFn } = DetailFormLogic({
    refetchTable: refetchDetailTable,
  });

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

  const handleActionsMaterial = (
    el: { index: number; LABRECETECALISMAID: number },
    type: string,
    arr?: any
  ) => {
    if (type === "view_single") {
      setIdTable(el.LABRECETECALISMAID);
      setIdMaterial(el.LABRECETECALISMAID);
      setIdTrail(null);
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

  const headColumns = useMemo(() => {
    return [
      {
        title: "HAMADI",
        id: "HAMADI",
        width: 105,
        render: (val: string) => {
          return <p>{val}</p>;
        },
      },

      {
        title: "CALISMATARIHI",
        id: "CALISMATARIHI",
        width: 112,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TERMINTARIHI",
        id: "TERMINTARIHI",
        width: 110,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "ID",
        id: "HAMID",
        width: 20,
      },
      {
        title: "KULLANICIADI",
        id: "KULLANICIADI",
        width: 95,
      },

      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
        width: 75,
      },
      {
        title: "DOVIZID",
        id: "DOVIZID",
        width: 60,
      },
      {
        title: "USTASAMAID",
        id: "USTASAMAID",
        width: 90,
      },
      {
        title: "USTASAMAADI",
        id: "USTASAMAADI",
        width: 120,
      },
      {
        title: "ILKKAYDERTARIHI",
        id: "ILKKAYDERTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

  const trailHeadColumns = useMemo(() => {
    return [
      {
        title: "ATISNO",
        id: "ATISNO",
        width: 50,
      },
      {
        title: "ATISTARIHI",
        id: "ATISTARIHI",
        width: 77,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "MIKTAR",
        id: "BOYAYUZDESI",
        width: 63,
        render: (val: number) => {
          return val.toString().substring(0, 8);
        },
      },
      {
        title: "BIRIM",
        id: "BIRIM",
        width: 40,
        render: () => {
          return <p>%</p>;
        },
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 115,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TARIHI",
        id: "TARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

  const DetailHeader = useMemo(() => {
    return [
      {
        title: "Sira",
        id: "SIRA",
        width: 30,
      },
      {
        title: "Urun Adi",
        id: "URUNADI",
        width: 155,
        render: (val: string) => {
          return val.substring(0, 19);
        },
      },

      {
        title: "Miktar",
        id: "MIKTARYUZDE",
        width: 50,
        render: (val: string) => {
          return val.toString().substring(0, 5);
        },
      },
      {
        title: "Hasep Birimi",
        id: "HASEPBIRIMI",
        width: 83,
        render: () => "%",
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
        width: 77,
        render: (val: number) => val.toString().substring(0, 8),
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        width: 120,
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

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
          />
        </div>

        <div className="rounded-[12px] border border-[var(--border)] ">
          <TwoRowTable
            title="trail"
            headColumns={trailHeadColumns}
            bodyColumns={trailData}
            handleRowClick={handleActionsTrial}
            disabled={disabled}
            idTable={idTrail}
          />
        </div>

        <div className="border rounded-[12px] border-[var(--border)] pb-11">
          <TableUI
            title="detail"
            idTable={null}
            handleRowClick={handleActionsDetails}
            headColumns={DetailHeader}
            bodyColumns={detailData}
            disabled={disabled}
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
          handleActions={() => setOpen("")}
        >
          {open === "material" && (
            <MaterialForm
              onClose={() => setOpen("")}
              refetchMaterial={refetchMaterial}
              formData={formData}
              formId={idMaterial}
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
              DetailHeader={DetailHeader}
              detailData={detailData}
              labReceteId={formData?.LABRECETEID}
              materialId={idTable}
              refetchTable={refetchTrailTable}
            />
          )}
          {open === "detail" && (
            <DetailForm
              onClose={() => setOpen("")}
              formId={idDetailForm}
              idTrail={idTrail}
              materialID={formData?.LABRECETEID}
              refetchTable={refetchDetailTable}
            />
          )}
        </CNewMiniModal>
      ) : (
        ""
      )}
    </>
  );
};
