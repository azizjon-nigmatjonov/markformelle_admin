import { useMemo, useState } from "react";
import { breadCrumbs, ModalLogic, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalUI } from "./Modal";
import { IFilterParams } from "../../../interfaces";
import { GetCurrentDate } from "../../../utils/getDate";

export const Transfers = () => {
  const [modalList, setModalList]: any = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal } = ModalLogic({ setModalList, modalList });
  const { bodyColumns, handleActions, isLoading, bodyData, createElement } =
    TableData({
      handleActionsModal,
      filterParams,
    });

  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        id: "IRSALIYETARIHI",
        title: "IRSALIYETARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "date" });
        },
      },
    ];

    keys.forEach((key: string) => {
      if (!newColumns.find((item: { id: string }) => item.id === key)) {
        newColumns.push({ title: key, id: key });
      }
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
          bodyColumns={bodyColumns}
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
          createElement={createElement}
          irsaliyaNo={bodyColumns?.[0]?.IRSALIYEID || 9000}
        />
      ) : (
        ""
      )}
    </>
  );
};
