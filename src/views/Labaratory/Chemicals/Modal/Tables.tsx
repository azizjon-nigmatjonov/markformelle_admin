import { useEffect, useMemo, useState } from "react";
import { MaterialForm } from "./MaterialForm";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { TrailForm } from "./TrailForm";
import { DetailForm } from "./DetailForm";
import { TwoRowTable } from "./TableUI/TwoRowTable";
import { TableUI } from "./TableUI/TableUI";
import { GetCurrentDate } from "../../../../utils/getDate";
import { DetailTableLogic, TrailTableLogic } from "./Logic";

export const LabModalTables = ({
  disabled,
  tableData = [],
  formId,
}: {
  disabled: boolean;
  tableData: any;
  formId: number;
}) => {
  const [idTable, setIdTable]: any = useState(null);
  const [idMaterial, setIdMaterial]: any = useState(null);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 100 });
  const [open, setOpen] = useState("");
  const { trailData } = TrailTableLogic({ id: formId, idTable: idTable });
  const { detailData } = DetailTableLogic({ id: formId, idTable: idMaterial });

  useEffect(() => {
    if (tableData?.data?.length) {
      setIdTable(tableData.data[0].LABRECETECALISMAID);
    }
  }, [tableData]);

  useEffect(() => {
    if (trailData?.okey?.length) {
      setIdMaterial(trailData.okey[0].LABRECETEATISID);
    }
  }, [trailData]);

  const handleActionsMaterial = (
    el: { index: number; LABRECETECALISMAID: number },
    type: string
  ) => {
    if (type === "view_single") {
      setIdTable(el.LABRECETECALISMAID);
    }

    if (type === "modal" || type === "view") {
      setOpen("material");
    }
  };

  const handleActionsTrial = (
    el: { index: number; LABRECETEATISID: number },
    type: string
  ) => {
    if (type === "modal" || type === "view") {
      setOpen("trial");
    }
    if (type === "view_single") {
      setIdMaterial(el.LABRECETEATISID);
    }
  };

  const handleActionsDetails = (_: {}, type: string) => {
    if (type === "modal" || type === "view") {
      setOpen("detail");
    }
  };

  const headColumns = useMemo(() => {
    return [
      {
        title: "HAMID",
        id: "HAMID",
      },
      {
        title: "HAMADI",
        id: "HAMADI",
        render: (val: string) => {
          return <p>{val}</p>;
        },
      },

      {
        title: "CALISMATARIHI",
        id: "CALISMATARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TERMINTARIHI",
        id: "TERMINTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "KULLANICIADI",
        id: "KULLANICIADI",
      },
      {
        title: "ILKKAYDERTARIHI",
        id: "ILKKAYDERTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
      },
      {
        title: "DOVIZID",
        id: "DOVIZID",
      },
      {
        title: "USTASAMAID",
        id: "USTASAMAID",
      },
      {
        title: "USTASAMAADI",
        id: "USTASAMAADI",
      },
    ];
  }, []);

  const trailHeadColumns = useMemo(() => {
    return [
      {
        title: "ATISNO",
        id: "ATISNO",
      },
      {
        title: "ATISTARIHI",
        id: "ATISTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "MIKTAR",
        id: "BOYAYUZDESI",
        render: (val: number) => {
          return val.toString().substring(0, 8);
        },
      },
      {
        title: "BIRIM",
        id: "BIRIM",
        render: () => {
          return <p>%</p>;
        },
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "TARIHI",
        id: "TARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
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
      },
      {
        title: "Urun Adi",
        id: "URUNADI",
      },

      {
        title: "Miktar",
        id: "MIKTARYUZDE",
      },
      {
        title: "Hasep Birimi",
        id: "HASEPBIRIMI",
        render: () => "%",
      },
      {
        title: "BIRIMFIYAT",
        id: "BIRIMFIYAT",
        render: (val: number) => val.toString().substring(0, 8),
      },
      {
        title: "DEGISIMTARIHI",
        id: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
      {
        title: "INSERTTARIHI",
        id: "INSERTTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "usually" });
        },
      },
    ];
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 border rounded-[12px] border-[var(--border)]">
        <div className="h-[400px]">
          <TableUI
            title="material"
            headColumns={headColumns}
            idTable={idTable}
            bodyColumns={tableData?.data}
            handleRowClick={handleActionsMaterial}
          />
        </div>

        <div className="border-x border-[var(--border)] ">
          <TwoRowTable
            title="trail"
            headColumns={trailHeadColumns}
            bodyColumns={trailData}
            handleRowClick={handleActionsTrial}
          />
        </div>

        <div className="h-[400px]">
          <TableUI
            title="detail"
            idTable={null}
            handleRowClick={handleActionsTrial}
            headColumns={DetailHeader}
            bodyColumns={detailData}
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
