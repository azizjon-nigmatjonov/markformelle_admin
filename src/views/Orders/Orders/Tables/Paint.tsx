import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";

export const PaintTable = () => {
  const [filterParams, setFilterParams] = useState({});
  return (
    <CNewTable
      headColumns={[
        { id: "BOYASIPARISID", title: "BOYASIPARISID" },
        { id: "BOYASIPARISTIPIADI", title: "BOYASIPARISTIPIADI" },
        { id: "BOYASIPARISTIPIADI", title: "BOYASIPARISTIPIADI" },
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
