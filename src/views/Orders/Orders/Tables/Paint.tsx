import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";

export const PaintTable = ({
  handleActionsTable,
}: {
  handleActionsTable: (val: any) => void;
}) => {
  const [filterParams, setFilterParams] = useState({});
  return (
    <CNewTable
      headColumns={[
        { id: "BOYASIPARISID", title: "BOYASIPARISID" },
        { id: "BOYASIPARISTIPIADI", title: "BOYASIPARISTIPIADI" },
        { id: "BOYASIPARISTIPIADI", title: "BOYASIPARISTIPIADI" },
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
