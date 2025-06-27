import CNewTable from "../../../../components/CElements/CNewTable";
import { useState } from "react";

export const MaterialTable = ({
  handleActionsTable,
}: {
  handleActionsTable: (val: any, status: string) => void;
}) => {
  const [filterParams, setFilterParams] = useState({});
  return (
    <CNewTable
      headColumns={[
        { id: "MATERIALID", title: "MATERIALID" },
        { id: "MATERIALADI", title: "MATERIALADI" },
      ]}
      handleActions={handleActionsTable}
      bodyColumns={[]}
      autoHeight="250px"
      handleFilterParams={(params: any) => {
        setFilterParams(params);
      }}
      filterParams={filterParams}
    />
  );
};
