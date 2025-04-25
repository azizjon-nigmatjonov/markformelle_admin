import { useState } from "react";
import CTable from "../../../../components/CElements/CTable";

export const CViewTable = () => {
  const [filterParams, setFilterParams]: any = useState({});
  const headColumns: any = [];
  const bodyColumns: any = [];

  const handleActions = () => {};
  return (
    <div>
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        meta={bodyColumns?.meta}
        isResizeble={true}
        isLoading={false}
        handleActions={handleActions}
        filterParams={filterParams}
        handleFilterParams={setFilterParams}
        tableSetting={false}
      />
    </div>
  );
};
