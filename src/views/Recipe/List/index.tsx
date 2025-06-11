import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import CNewModal from "../../../components/CElements/CNewModal";
import { ModalUI } from "./Modal";
import { playSound } from "../../../utils/playAudio";

export const RecipeList = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState<string[]>([]);
  const [changed, setChanged] = useState("");
  const [askAction, setAskAction] = useState("");
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<any>({});

  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = { ...arr?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    return newColumns;
  }, [bodyColumns]);

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(["card"]);
    }

    if (status === "view" || status === "edit") {
      setOpen(["card"]);

      setModalInitialData({
        RECETEID: el?.RECETEID,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.RECETEID]);
      setFilterParams({ page: 0, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { RECETEID: string }) => {
          return item.RECETEID;
        })
      );
      setFilterParams({ page: 0, perPage: 50 });
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "close") {
      if (!changed && open.length === 1) {
        setModalInitialData({});
        setOpen([]);
      } else {
        playSound("/error-m.mp3");
        setAskAction(changed);
      }
    }
    if (status === "delete") {
      setOpen([]);
      deleteFn([id]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_recipe")}
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
          defaultSearch={{ DATE: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open.length || changed ? (
        <CNewModal
          title={t(
            modalInitialData.RECETEID ? "updating_recipe" : "creating_recipe"
          )}
          handleActions={handleModalActions}
          defaultData={{
            id: modalInitialData?.RECETEID,
          }}
          disabled="big"
        >
          <ModalUI
            defaultData={modalInitialData}
            changed={changed}
            setChanged={setChanged}
            askAction={askAction}
            open={open}
            setOpen={setOpen}
            setAskAction={setAskAction}
          />
        </CNewModal>
      ) : (
        ""
      )}
    </>
  );
};

// {
//   "ADI": "test",
//   "FIRMAID": "M0864",
//   "USTASAMAID": 0,
//   "RECETETIPI": 0,
//   "RECETETURUID": 3,
//   "CALISMATARIHI": "2025-06-11T11:30:32.379Z",
//   "RENKOKEY": false,
//   "RECETEKAPATMA": false,
//   "LABRECETEGRUPID": 2,
//   "LABRENKGRUPID": 30,
//   "RENKDERINLIGIID": 2,
//   "BEKLEMESURESI": null,
//   "RECETEGRAFIKID": null,
//   "LABRECETEID": 11055,
//   "LABRECETEATISID": 13230,
//   "MIGRASYON": 1,
//   "SABLON": false,
//   "ORTAKRECETE": false,
//   "ILAVE": true,
//   "SOKUMUZERIBOYA": false,
//   "RECETEDETAYVAR": true,
//   "NOTU": null,
//   "ESKIRECETEKODU": "string",
//   "BANYOSAYISI": null,
//   "TOPLAMSICAKLIKDEGISIMI": null,
//   "SABLONRECETEID": null,
//   "ILKBOYANANPARTIKAYITID": null,
//   "OZELDURUMLINKISLEMI": false,
//   "MAKINAPLANLAMAGRUPID": null,
//   "GRUPPROSESNO": null,
//   "STANDARTSURE": null,
//   "INSERTKULLANICIID": 1,
//   "INSERTTARIHI": "2025-06-11T11:30:32.379Z",
//   "KULLANICIID": 1,
//   "DEGISIMTARIHI": "2025-06-11T11:30:32.379Z"
// }
