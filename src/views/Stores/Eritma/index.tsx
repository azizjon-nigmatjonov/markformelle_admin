import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CNewTable from "../../../components/CElements/CNewTable";
import { Header } from "../../../components/UI/Header";
import useCQuery from "../../../hooks/useCQuery";

export const EritmaPage = () => {
  const { headColumns, bodyColumns, handleActions } = TableData();
  const [filterParams, setFilterParams]: any = useState({});

  const { data: uruns, isLoading } = useCQuery({
    key: `GET_URUN_LIST`,
    endpoint: `http://10.40.14.193:8000/urun/?skip=0&limit=100`,
    params: {},
  });

  console.log("uruns", uruns);

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
