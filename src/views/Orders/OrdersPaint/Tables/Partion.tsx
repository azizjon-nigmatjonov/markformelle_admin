import CNewTable from "../../../../components/CElements/CNewTable";
import { useEffect, useState } from "react";
import { MaterialTableLogic } from "./Logic";
import { MaterialForm } from "../Modal/Forms/MaterialForm";

export const PartianTable = ({
  handleActionsTable,
  uniqueID,
  formId,
  currentMaterial,
  currentPaint,
  defaultFilters = [],
}: {
  formId: number;
  currentMaterial: any;
  uniqueID: string;
  handleActionsTable: (val: any, status: string, type: string) => void;
  currentPaint: any;
  defaultFilters?: string[];
}) => {
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { isLoading, headColumns, bodyColumns, deleteFn, refetch } =
    MaterialTableLogic({
      filterParams,
    });

  useEffect(() => {
    if (currentPaint?.BOYASIPARISDETAYID) {
      setFilterParams({
        ...filterParams,
        BOYASIPARISDETAYID: currentPaint.BOYASIPARISDETAYID,
      });
    }
  }, [currentPaint]);

  const handleActions = (el: any, status: string) => {
    if (status === "delete") {
      deleteFn([el.ORMESIPARISDETAYID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { ORMESIPARISDETAYID: number }) => {
          return item.ORMESIPARISDETAYID;
        })
      );
    }
  };

  return (
    <>
      <CNewTable
        title="Partiye"
        key={headColumns.length ? "isloading" : "iscame"}
        idForTable="partiya_table_inner"
        headColumns={headColumns}
        handleActions={(obj: any, status: string) => {
          handleActionsTable(obj, status, "material");
          handleActions(obj, status);
        }}
        defaultFilters={defaultFilters}
        disablePagination={true}
        innerTable={true}
        bodyColumns={bodyColumns}
        autoHeight="140px"
        handleFilterParams={(params: any) => {
          setFilterParams(params);
        }}
        isLoading={isLoading}
        filterParams={filterParams}
      />
      {uniqueID === "material_form" && (
        <MaterialForm
          handleActions={(val: string) => {
            handleActionsTable({}, val, "material");
          }}
          refetch={refetch}
          defaultData={currentMaterial}
          uniqueID={uniqueID}
          parentId={formId ?? 0}
        />
      )}
    </>
  );
};
