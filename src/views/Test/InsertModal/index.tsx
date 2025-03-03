import { useState } from "react";
import CTable from "../../../components/CElements/CTable";

export const TanitimModal = () => {
  const [filterParams, setFilterParams]: any = useState({});
  const headColumns: any = [];
  const bodyColumns: any = [];

  const handleActions = () => {};
  return (
    <div className="min-h-[80vh]">
      <h2>Laboratuar</h2>
      <div></div>
      <div className="grid grid-cols-1 gap-y-3">
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
        <div className="grid grid-cols-2 gap-x-2">
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

        <div className="grid grid-cols-2 gap-x-2">
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
      </div>
    </div>
  );
};
