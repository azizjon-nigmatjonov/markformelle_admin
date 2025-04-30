import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import CNewModal from "../../../components/CElements/CNewModal";
import { ModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";

export const LabChemicals = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});

  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        title: "RECETE KODU",
        id: "URUNID",
        checked: true,
      },
      {
        title: "RECETE AD",
        id: "ADI",
        checked: true,
      },
      {
        title: "FIMRA KODU",
        id: "MUTFAKDEPONO",
        checked: true,
      },
      {
        title: "FIRMA AD",
        id: "UNITEADI",
        checked: true,
      },
      {
        title: "TALEP TARIHI",
        id: "URUNTIPIADI",
        checked: true,
      },
      {
        title: "LAB RECETE GRUP",
        id: "BOYATIPIADI",
        checked: true,
      },
      {
        title: "RENK GRUP",
        id: "KULLANICIADI",
        checked: true,
      },
      {
        title: "SABS TIPI",
        id: "INSERTTARIHI",
        checked: true,
      },
      {
        title: "ESKI LAB RECETE KODU",
        id: "INSERKULLANICIADI",
        checked: true,
      },
      {
        title: "PANTONE KODU",
        id: "SONALISTARIHI",
        checked: true,
      },
      {
        title: "RECETE TURU",
        id: "DEGISIMTARIHI",
        checked: true,
      },
      {
        title: "HAD ADI",
        id: "SONALISSTOKDETAYID",
        checked: true,
      },
      {
        title: "ILK HAYDEDEN KULLANUCI",
        id: "BARKOD",
        checked: true,
      },
    ];

    keys.forEach((key: string) => {
      if (!newColumns.find((item: { id: string }) => item.id === key)) {
        newColumns.push({
          title: key,
          id: key,
        });
      }
    });

    return newColumns;
  }, [bodyColumns]);

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        URUNID: el?.URUNID,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.URUNID]);
      setFilterParams({ page: 0, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { URUNID: string }) => {
          return item.URUNID;
        })
      );
      setFilterParams({ page: 0, perPage: 50 });
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "close") {
      setOpen(false);
      setModalInitialData({});
    }
    if (status === "delete") {
      setOpen(false);
      deleteFn([id]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_chemicals")}
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          defaultFilters={[
            "sidebar_filter",
            "add",
            "delete",
            "actions",
            "excel_download",
            "active_menu",
            "filter",
            "sellect_more",
          ]}
          defaultSearch={{ DATE: "", URUNID: "", PANTONE: "", MATERIAL: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <CNewModal
          title={t(
            modalInitialData.URUNID ? "updating_chemical" : "creating_chemical"
          )}
          handleActions={handleModalActions}
          defaultData={{
            id: modalInitialData?.URUNID,
          }}
          disabled="big"
        >
          <ModalUI defaultData={modalInitialData} />
        </CNewModal>
      )}
    </>
  );
};
