import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CNewTable from "../../../components/CElements/CNewTable";
import { Header } from "../../../components/UI/Header";
import { breadCrumbs, TableData, useTableHeaders } from "./Logic";
import { IFilterParams } from "../../../interfaces";
import { useMemo, useState } from "react";
import { modalsActions } from "../../../store/modal/modal.slice";
import { useDispatch } from "react-redux";

export const PartiTanitimi = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const dispatch = useDispatch();
  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const predefinedColumns = useMemo(() => {
    return [];
  }, []);

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      dispatch(
        modalsActions.setModalData({
          id: "partitanitimi",
          defaultData: {},
          type: "add",
        })
      );
    }

    if (status === "view" || status === "edit") {
      dispatch(
        modalsActions.setModalData({
          id: "partitanitimi",
          defaultData: el,
          type: "edit",
        })
      );
    }

    if (status === "delete") {
      deleteFn([el.PARTIKAYITID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { PARTIKAYITID: string }) => {
          return item.PARTIKAYITID;
        })
      );
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title="Parti"
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
            PARTIKAYITID: "",
          }}
          meta={{
            totalCount: bodyData?.count || 0,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>
    </>
  );
};
