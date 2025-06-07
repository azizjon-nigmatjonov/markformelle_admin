import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import CNewModal from "../../../components/CElements/CNewModal";
import { ModalUI } from "./Modal";
// import { ModalTypes } from "./interfaces";
import { playSound } from "../../../utils/playAudio";

export const RecipeList = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
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
      setOpen(true);
    }
    console.log("el", el, status);
    if (status === "view" || status === "edit") {
      setOpen(true);

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
      if (!changed) {
        setModalInitialData({});
        setOpen(false);
      } else {
        playSound("/error-m.mp3");
        setAskAction(changed);
      }
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

      {open || changed ? (
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
