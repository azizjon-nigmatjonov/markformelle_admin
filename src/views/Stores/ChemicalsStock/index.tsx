import { useState } from "react";
import { breadCrumbs, ModalLogic, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTableHeaders } from "../../../hooks/useTableHeaders";

export const ChemicalsStock = () => {
  const [modalList, setModalList]: any = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal } = ModalLogic({ setModalList, modalList });
  const { bodyColumns, handleActions, isLoading, bodyData } = TableData({
    handleActionsModal,
    filterParams,
  });

  const { newHeadColumns } = useTableHeaders({ bodyColumns });

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="Таблица остатки химикатов"
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          defaultFilters={["excel_download"]}
          handleFilterParams={setFilterParams}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {/* {modalList?.length ? (
        <ModalList
          handleActionsModal={handleActionsModal}
          item={modalList[0]}
          modalList={modalList}
        />
      ) : (
        ""
      )} */}
    </>
  );
};
