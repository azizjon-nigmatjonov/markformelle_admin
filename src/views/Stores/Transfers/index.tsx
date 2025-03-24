import { useMemo, useState } from "react";
import { breadCrumbs, ModalLogic, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalUI } from "./Modal";

export const Transfers = () => {
  const [modalList, setModalList]: any = useState([]);
  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal } = ModalLogic({ setModalList, modalList });
  const { bodyColumns, handleActions, isLoading, bodyData } = TableData({
    handleActionsModal,
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      newColumns.push({ title: key, id: key });
    });

    return newColumns;
  }, [bodyColumns?.length]);

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="Таблица внутреннее примешенныей"
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns?.filter(
            (item: any) => item.DEPOID === "D003" && item.HAREKETTIPI === 5
          )}
          defaultFilters={["sidebar_filter", "add", "delete"]}
          defaultSearch={{ IRSALIYENO: "" }}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={(val: any) => {
            setFilterParams(val);
          }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {modalList?.length ? (
        <ModalUI
          element={modalList[0]}
          setModalList={setModalList}
          modalList={modalList}
        />
      ) : (
        ""
      )}
    </>
  );
};
