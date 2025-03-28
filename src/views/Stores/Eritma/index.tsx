import { useMemo, useState } from "react";
import { breadCrumbs, ModalLogic, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalList } from "./ModalList";

export const EritmaPage = () => {
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

  const newHeadColumns = useMemo(() => {
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      newColumns.push({ title: key, id: key });
    });

    return newColumns;
  }, [bodyColumns]);

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="Таблица химикатов"
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          defaultFilters={["sidebar_filter", "add", "delete"]}
          defaultSearch={{ URUNID: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {modalList?.length ? (
        <ModalList
          handleActionsModal={handleActionsModal}
          item={modalList[0]}
          modalList={modalList}
        />
      ) : (
        ""
      )}
    </>
  );
};
