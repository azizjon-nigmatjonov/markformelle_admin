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
import { PantoneColors } from "../../../constants/pantone";

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
      },
      {
        title: "RECETE AD",
        id: "ADI",
      },
      {
        title: "FIMRA KODU",
        id: "MUTFAKDEPONO",
      },
      {
        title: "PANTONE KODU",
        id: "PANTONE",
        render: () => {
          const value = "TCX 16-5123";
          return (
            <div className="flex space-x-2 items-center">
              <p>{value}</p>
              <div
                className={`w-[70px] h-[25px] rounded-[8px]`}
                style={{
                  backgroundColor:
                    "#" + PantoneColors[value.substring(4, 11)]?.hex,
                }}
              ></div>
            </div>
          );
        },
      },
      {
        title: "FIRMA AD",
        id: "UNITEADI",
      },
      {
        title: "TALEP TARIHI",
        id: "URUNTIPIADI",
      },
      {
        title: "LAB RECETE GRUP",
        id: "BOYATIPIADI",
      },
      {
        title: "RENK GRUP",
        id: "KULLANICIADI",
      },
      {
        title: "SABS TIPI",
        id: "INSERTTARIHI",
      },
      {
        title: "ESKI LAB RECETE KODU",
        id: "INSERKULLANICIADI",
      },

      {
        title: "RECETE TURU",
        id: "DEGISIMTARIHI",
      },
      {
        title: "HAD ADI",
        id: "SONALISSTOKDETAYID",
      },
      {
        title: "ILK HAYDEDEN KULLANUCI",
        id: "BARKOD",
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
