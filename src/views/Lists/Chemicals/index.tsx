import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { ReceteAsamaModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";
import CNewMiniModal from "../../../components/CElements/CNewMiniModal";

export const ChemicalsListPage = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});

  const {
    bodyColumns,
    isLoading,
    bodyData,
    deleteFn,
    refetch: refetchTable,
  } = TableData({
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

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
        RECETEASAMAID: el?.RECETEASAMAID,
        ...el,
      });
    }

    if (status === "delete") {
      deleteFn([el.RECETEASAMAID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { RECETEASAMAID: string }) => {
          return item.RECETEASAMAID;
        })
      );
    }
  };

  const handleModalActions = (status: string) => {
    if (status === "Close") {
      setOpen(false);
      setModalInitialData({});
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_receteasama")}
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
          defaultSearch={{ RECETEASAMAID: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <CNewMiniModal
          title={"form_receteasama"}
          handleActions={handleModalActions}
        >
          <ReceteAsamaModalUI
            defaultData={modalInitialData}
            setOpen={setOpen}
            refetchTable={refetchTable}
          />
        </CNewMiniModal>
      )}
    </>
  );
};
