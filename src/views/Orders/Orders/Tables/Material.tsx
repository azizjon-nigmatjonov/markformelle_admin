import CNewTable from "../../../../components/CElements/CNewTable";
import { useEffect, useState } from "react";
import { MaterialTableLogic } from "./Logic";
import { MaterialForm } from "../Modal/Forms/MaterialForm";

export const MaterialTable = ({
  handleActionsTable,
  uniqueID,
  formId,
  currentMaterial,
  currentKnitting,
  title,
}: {
  formId: number;
  currentKnitting: any;
  currentMaterial: any;
  uniqueID: string;
  handleActionsTable: (val: any, status: string, type: string) => void;
  title: string;
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

  useEffect(() => {
    if (bodyColumns?.length) {
      handleActionsTable(bodyColumns?.[0], "view_single", "material");
    }
  }, [bodyColumns]);

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
        title={title}
        key={headColumns.length ? "isloading" : "iscame"}
        idForTable="material_table_inner"
        headColumns={headColumns}
        handleActions={(obj: any, status: string) => {
          handleActionsTable(obj, status, "material");
          handleActions(obj, status);
        }}
        currentIdRow={currentKnitting?.index || 1}
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
