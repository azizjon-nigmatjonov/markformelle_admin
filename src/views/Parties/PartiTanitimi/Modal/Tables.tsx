import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../../interfaces";
import { TableData } from "./Logic";
import { useTableHeaders } from "../Logic";

export const Tables = ({ formId }: { formId: number }) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const { bodyColumns, isLoading } = TableData({
    filterParams,
    formId,
  });

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns: [{ id: "index", title: "index" }],
  });

  return (
    <div className="space-y-5">
      <CNewTable
        title="partistok"
        headColumns={newHeadColumns}
        bodyColumns={bodyColumns}
        autoHeight="200px"
        isLoading={isLoading}
        idForTable="modal_table_zerve"
        handleFilterParams={setFilterParams}
        filterParams={filterParams}
        disablePagination
      />
      <CNewTable
        title="rezerv"
        headColumns={newHeadColumns}
        bodyColumns={bodyColumns}
        autoHeight="200px"
        isLoading={isLoading}
        idForTable="modal_table_zerve"
        handleFilterParams={setFilterParams}
        filterParams={filterParams}
        disablePagination
      />
    </div>
  );
};
