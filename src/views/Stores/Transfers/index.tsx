import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalUI } from "./Modal";
import { IFilterParams } from "../../../interfaces";
import { GetCurrentDate } from "../../../utils/getDate";

interface ModalTypes {
  IRSALIYENO?: string;
  DEPOID?: string;
}

export const Transfers = () => {
  const [open, setOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });

  const { bodyColumns, isLoading, bodyData, getList, deleteFn } = TableData({
    filterParams,
  });

  const handleActionsModal = (type: string, element?: any) => {
    if (type === "edit") {
      setOpen(true);
    }
    if (type === "delete") {
      setOpen(false);
      console.log("el", element);
      setModalInitialData({});
      // deleteFn([element.IRSALIYEID]);
    }
    if (type === "add") {
      setOpen(true);
    }
    if (type === "close") {
      setOpen(false);
      setModalInitialData({});
    }
  };

  const handleActions = (el: any, status: string) => {
    console.log("el", el, status);

    if (status === "delete") {
      deleteFn([el.IRSALIYEID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { IRSALIYEID: string }) => {
          return item.IRSALIYEID;
        })
      );
    }
    if (status === "modal") {
      setOpen(true);
    }
    if (status === "view" || status === "edit") {
      setOpen(true);
      setModalInitialData({
        IRSALIYENO: el.IRSALIYENO,
        DEPOID: el.DEPOID,
      });
    }
  };

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

      {open && (
        <ModalUI
          defaultData={modalInitialData}
          getList={() => getList(filterParams)}
          irsaliyaNo={bodyColumns?.[0]?.IRSALIYEID || 9000}
          handleActionsModal={handleActionsModal}
        />
      )}
    </>
  );
};
