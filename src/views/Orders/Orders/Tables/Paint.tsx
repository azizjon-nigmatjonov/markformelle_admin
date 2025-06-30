import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PaintTableLogic } from "./Logic";
import { PaintForm } from "../Modal/Forms/PaintForm";

export const PaintTable = ({
  handleActionsTable,
  formId,
  uniqueID,
  currentPaint,
}: {
  formId: number;
  uniqueID: string;
  currentPaint: any;
  handleActionsTable: (val: any, status: string, type: string) => void;
}) => {
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { isLoading, headColumns, bodyColumns } = PaintTableLogic({
    filterParams,
  });

  useEffect(() => {
    if (formId) {
      setFilterParams({ ...filterParams, BOYASIPARISKAYITID: formId });
    }
  }, [formId]);

  return (
    <>
      <CNewTable
        key={headColumns.length}
        headColumns={headColumns}
        defaultFilters={["add", "excel_download"]}
        idForTable="paint_table_inner"
        handleActions={(obj: any, status: string) => {
          handleActionsTable(obj, status, "paint");
        }}
        bodyColumns={bodyColumns}
        autoHeight="250px"
        handleFilterParams={(params: any) => {
          setFilterParams(params);
        }}
        isLoading={isLoading}
        disablePagination={true}
        filterParams={filterParams}
      />
      {uniqueID === "paint_form" && (
        <PaintForm
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
    </>
  );
};
