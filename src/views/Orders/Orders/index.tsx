import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTableHeaders } from "../../../hooks/useTableHeaders";
import { OrderModal } from "./Modal";
import { ModalTypes } from "./interfaces";
import CNewModal from "../../../components/CElements/CNewModal";

export const OrderList = () => {
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<ModalTypes | null>(
    null
  );

  const { bodyColumns, isLoading, bodyData, deleteFn, refetch } = TableData({
    filterParams,
  });

  const { newHeadColumns } = useTableHeaders({ bodyColumns });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData(el);
    }

    if (status === "delete") {
      deleteFn([el.BOYASIPARISKAYITID]);
    }

    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { BOYASIPARISKAYITID: number }) => {
          return item.BOYASIPARISKAYITID;
        })
      );
    }
  };

  const handleModal = (status: string, id: number) => {
    if (status === "delete") {
      deleteFn([id]);
    } else if (status === "close") {
      setOpen(false);
      setModalInitialData(null);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="table_orders"
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
            BOYASIPARISKAYID: "",
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
        <CNewModal
          title="orders_form"
          handleActions={handleModal}
          defaultData={{
            id: modalInitialData?.BOYASIPARISKAYITID,
          }}
          disabled="big"
        >
          <OrderModal
            defaultData={modalInitialData ?? { BOYASIPARISKAYITID: 0 }}
            setOpen={setOpen}
            refetch={refetch}
          />
        </CNewModal>
      )}
    </>
  );
};
