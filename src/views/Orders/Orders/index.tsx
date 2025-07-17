import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTableHeaders } from "../../../hooks/useTableHeaders";
import { modalsActions } from "../../../store/modal/modal.slice";
import { useDispatch } from "react-redux";

export const OrderList = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });

  const dispatch = useDispatch();
  const { bodyColumns, isLoading, bodyData, deleteFn, refetch } = TableData({
    filterParams,
  });

  const { newHeadColumns } = useTableHeaders({ bodyColumns });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      dispatch(
        modalsActions.setModalData({
          id: "boya",
          defaultData: {},
        })
      );
    }

    if (status === "view" || status === "edit") {
      dispatch(
        modalsActions.setModalData({
          id: "boya",
          defaultData: el,
        })
      );
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
      dispatch(
        modalsActions.setModalData({
          id: "boya",
          defaultData: {},
        })
      );
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

      {/* {open && (
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
          />
        </CNewModal>
      )} */}
    </>
  );
};
