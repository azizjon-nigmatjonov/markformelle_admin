import { useState } from "react";
import CNewTable from "../../../../../../components/CElements/CNewTable";

export const MaterialTable = () => {
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 50 });
  return (
    <div>
      <CNewTable
        headColumns={[
          { id: "MATERIALID", title: "MATERIALID" },
          { id: "MATERIALADI", title: "MATERIALADI" },
        ]}
        disabled
        handleActions={() => {}}
        bodyColumns={[]}
        defaultFilters={["excel_download", "add"]}
        autoHeight="140px"
        handleFilterParams={(params: any) => {
          setFilterParams(params);
        }}
        filterParams={filterParams}
      />
      <div className="grid grid-cols-2 gap-x-2 mt-12">
        <CNewTable
          headColumns={[
            { id: "MATERIALID", title: "MATERIALID" },
            { id: "MATERIALADI", title: "MATERIALADI" },
          ]}
          handleActions={() => {}}
          bodyColumns={[]}
          autoHeight="140px"
          handleFilterParams={(params: any) => {
            setFilterParams(params);
          }}
          defaultFilters={["excel_download", "add"]}
          disabled
          filterParams={filterParams}
        />
        <CNewTable
          headColumns={[
            { id: "MATERIALID", title: "MATERIALID" },
            { id: "MATERIALADI", title: "MATERIALADI" },
          ]}
          disabled
          defaultFilters={["excel_download", "add"]}
          handleActions={() => {}}
          bodyColumns={[]}
          autoHeight="140px"
          handleFilterParams={(params: any) => {
            setFilterParams(params);
          }}
          filterParams={filterParams}
        />
      </div>
    </div>
  );
};
