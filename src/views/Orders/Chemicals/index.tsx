import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { ModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";
import { PantoneColors } from "../../../constants/pantone";
import CNewModal from "../../../components/CElements/CNewModal";

export const OrderList = () => {
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
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = newColumns.find((item: any) => item.id === key);
      if (found?.id) {
        // newColumns.push(found);
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

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        LABRECETEID: el?.LABRECETEID,
        ...el,
      });
    }

    if (status === "delete") {
      deleteFn([el.LABRECETEID]);
      setFilterParams({ page: 1, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { LABRECETEID: string }) => {
          return item.LABRECETEID;
        })
      );
      setFilterParams({ page: 1, perPage: 50 });
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "delete") deleteFn([id]);
  };

  const handleModal = (status: string, id: string) => {
    // This will be passed to ModalUI
    if (status === "delete") {
      deleteFn([id]);
    } else if (status === "close") {
      setOpen(false);
      setModalInitialData({});
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_orders")}
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
            LABRECETEKODU: "",
            ESKILABREETEKODU: "",
            PANTONEKODU: "",
          }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {/* {open ? (
        <CNewModal
          title={t(
            modalInitialData.LABRECETEID ? "updating_orders" : "creating_orders"
          )}
          handleActions={handleModal}
          defaultData={{
            id: modalInitialData?.LABRECETEID,
          }}
          disabled="big"
        >
          <ModalUI defaultData={modalInitialData} />
        </CNewModal>
      ) : (
        <></>
      )} */}
    </>
  );
};
