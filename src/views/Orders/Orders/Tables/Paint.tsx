import { useEffect, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { PaintTableLogic } from "./Logic";

export const PaintTable = ({
  handleActionsTable,
  formId,
}: {
  formId: number;
  handleActionsTable: (val: any, status: string) => void;
}) => {
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { bodyData, isLoading, refetch, headColumns, bodyColumns, deleteFn } =
    PaintTableLogic({
      filterParams,
    });

  useEffect(() => {
    if (formId) {
      setFilterParams({ ...filterParams, BOYASIPARISKAYITID: formId });
    }
  }, [formId]);

  return (
    <CNewTable
      key={headColumns.length}
      headColumns={headColumns}
      defaultFilters={["add", "excel_download"]}
      idForTable="paint_table_inner"
      handleActions={handleActionsTable}
      bodyColumns={bodyColumns}
      autoHeight="250px"
      handleFilterParams={(params: any) => {
        setFilterParams(params);
      }}
      isLoading={isLoading}
      disablePagination={true}
      filterParams={filterParams}
    />
  );
};
