import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CNewTable from "../../../components/CElements/CNewTable";
import { Header } from "../../../components/UI/Header";

export const EritmaPage = () => {
  const { headColumns, bodyColumns, handleActions } = TableData();
  const [filterParams, setFilterParams]: any = useState({});

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />}
      ></Header>

      <div className="p-2">
        <CNewTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          isResizeble={true}
          handleActions={handleActions}
          isLoading={false}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
        />
      </div>
    </>
  );
};
