import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { useTableHeaders } from "../../../hooks/useTableHeaders";
import { ArticulModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";
import CNewMiniModal from "../../../components/CElements/CNewMiniModal";

export const ArticulesPage = () => {
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

  const { newHeadColumns } = useTableHeaders({ bodyColumns });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        KALITEID: el?.KALITEID,
        ...el,
      });
    }

    if (status === "delete") {
      deleteFn([el.KALITEID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { KALITEID: string }) => {
          return item.KALITEID;
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
          title={t("table_articul")}
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
          defaultSearch={{ KALITEID: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <CNewMiniModal title="form_articul" handleActions={handleModalActions}>
          <ArticulModalUI
            defaultData={modalInitialData}
            setOpen={setOpen}
            refetchTable={refetchTable}
          />
        </CNewMiniModal>
      )}
    </>
  );
};
