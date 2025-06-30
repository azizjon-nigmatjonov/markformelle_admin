import CNewTable from "../../../../components/CElements/CNewTable";
import { useEffect, useState } from "react";
import { MaterialTableLogic } from "./Logic";
import { MaterialForm } from "../Modal/Forms/MaterialForm";

export const MaterialTable = ({
  handleActionsTable,
  uniqueID,
  formId,
  currentMaterial,
}: {
  formId: number;
  currentMaterial: any;
  uniqueID: string;
  handleActionsTable: (val: any, status: string, type: string) => void;
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
    if (formId) {
      setFilterParams({ ...filterParams, BOYASIPARISKAYITID: formId });
    }
  }, [formId]);

  const handleActions = (el: any, status: string) => {
    console.log("el", el);
    console.log("status", status);
    if (status === "delete") {
      deleteFn([el.BOYASIPARISDETAYID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { BOYASIPARISDETAYID: number }) => {
          return item.BOYASIPARISDETAYID;
        })
      );
    }
  };

  return (
    <>
      <CNewTable
        key={headColumns.length}
        idForTable="material_table_inner"
        headColumns={headColumns}
        handleActions={(obj: any, status: string) => {
          handleActionsTable(obj, status, "material");
          handleActions(obj, status);
        }}
        disablePagination={true}
        innerTable={true}
        bodyColumns={bodyColumns}
        autoHeight="250px"
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
