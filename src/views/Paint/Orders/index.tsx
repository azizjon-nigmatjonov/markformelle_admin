import { useTranslation } from "react-i18next";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CNewTable from "../../../components/CElements/CNewTable";
import { Header } from "../../../components/UI/Header";
import { breadCrumbs, TableData, useTableHeaders } from "./Logic";
import { IFilterParams } from "../../../interfaces";
import { useState } from "react";
import CNewModal from "../../../components/CElements/CNewModal";
import { ModalUI } from "./Modal";

export const PartyOrders = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<any>({});

  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const predefinedColumns: any = [];

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });


  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        LABRECETEID: el?.LABRECETEID,
        ...el,
      });
    }

    if (status === "delete") {
      deleteFn([el.LABRECETEID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { LABRECETEID: string }) => {
          return item.LABRECETEID;
        })
      );
    }
  };

  const modalActionsFn = (status: string) => {
    if (status === "close") {
      setOpen(false);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_party")}
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
          defaultSearch={{
            PARTIYIL: "",
            PARTIID: "",

          }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <CNewModal title="Party Orders" handleActions={modalActionsFn} defaultData={modalInitialData}>
          <ModalUI handleModalActions={modalActionsFn} defaultData={modalInitialData} />
        </CNewModal>
      )}
    </>
  );
};