import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { useTableHeaders } from "../Logic";

export const RezervTable = ({
  bodyColumns,
  isLoading,
}: {
  bodyColumns: any;
  isLoading: boolean;
}) => {
  const [filterParams, setFilterParams] = useState({});

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns: [],
  });

  return (
    <CNewTable
      title="Rezerve"
      headColumns={newHeadColumns?.length ? newHeadColumns : []}
      innerTable={true}
      idForTable="rezerve_table"
      bodyColumns={bodyColumns?.length ? bodyColumns : []}
      handleActions={() => {}}
      isLoading={isLoading}
      autoHeight="250px"
      disablePagination={true}
      handleFilterParams={(params: any) => {
        setFilterParams(params);
      }}
      defaultFilters={["delete", "actions", "excel_download", "sellect_more"]}
      filterParams={filterParams}
    />
  );
};
