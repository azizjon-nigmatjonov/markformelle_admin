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
  const { bodyColumns, isLoading, siparisData, siparisIsLoading } = TableData({
    filterParams,
    formId,
  });

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns: [],
  });

  const { newHeadColumns: newHeadColumnsSiparis } = useTableHeaders({
    bodyColumns: siparisData,
    predefinedColumns: [],
  });

  return (
    <div className="space-y-5">
      <CNewTable
        title="siparisler"
        headColumns={newHeadColumnsSiparis}
        bodyColumns={siparisData}
        autoHeight="200px"
        isLoading={siparisIsLoading}
        idForTable="modal_table_zerve"
        handleFilterParams={setFilterParams}
        filterParams={filterParams}
        disablePagination
        defaultFilters={["excel_download"]}
      />
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
        defaultFilters={["excel_download"]}
      />
    </div>
  );
};
