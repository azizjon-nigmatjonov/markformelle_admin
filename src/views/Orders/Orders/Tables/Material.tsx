import CNewTable from "../../../../components/CElements/CNewTable";
import { useState } from "react";

export const MaterialTable = () => {
  const [filterParams, setFilterParams] = useState({});
  return (
    <CNewTable
      headColumns={[
        { id: "MATERIALID", title: "MATERIALID" },
        { id: "MATERIALADI", title: "MATERIALADI" },
      ]}
      bodyColumns={[]}
      autoHeight="400px"
      handleFilterParams={(params: any) => {
        setFilterParams(params);
      }}
      filterParams={filterParams}
    />
  );
};
