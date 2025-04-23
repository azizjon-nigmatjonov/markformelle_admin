import { useCallback, useEffect, useState } from "react";
import usePageRouter from "../../../hooks/useObjectRouter";
import Form from "./Form";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { FetchFunction, TableData, breadCrumbs } from "./Logic";
import { FilterFunctions } from "../../../components/UI/Filter/Logic";
import axios from "axios";
import CNewTable from "../../../components/CElements/CNewTable";

const Users = () => {
  const { navigateQuery } = usePageRouter();
  const { getQueries } = usePageRouter();
  const query = getQueries();
  const { headColumns } = TableData();
  const [filterParams, setFilterParams]: any = useState({});
  const { bodyColumns, isLoading, refetch } = FetchFunction();
  const { collectFilter, storeFilters } = FilterFunctions({
    store: true,
    filterParams,
  });

  const handleFilterParams = (obj: any) => {
    setFilterParams(obj);
    storeFilters(obj);
  };

  const handleSearch = (value: any) => {
    collectFilter({ type: "q", val: value });
    handleFilterParams({ ...filterParams, q: value, page: 1 });
  };

  const handleActions = useCallback((element: any, status: string) => {
    if (status === "view") navigateQuery({ id: element.id });

    if (status === "edit") navigateQuery({ id: element.id });

    if (status === "delete") {
      if (element.email === "super@example.com") return;
      axios
        .delete(`http://192.168.181.29:3000/users/${element.id}`)
        .then(() => {
          refetch();
        });
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [query?.id]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs
            items={breadCrumbs}
            progmatic={true}
            handleSearch={handleSearch}
            defaultValue={filterParams?.q}
          />
        }
      ></Header>
      <div className="p-2">
        <CNewTable
          headColumns={headColumns}
          bodyColumns={bodyColumns?.list ?? []}
          meta={{
            totalCount: 50,
            pageCount: 19,
          }}
          defaultFilters={[
            "sidebar_filter",
            "add",
            "delete",
            "actions",
            "excel_download",
            "active_menu",
            "filter",
            "sellect_more",
          ]}
          isResizeble={true}
          isLoading={isLoading}
          handleActions={handleActions}
          filterParams={filterParams}
          handleFilterParams={handleFilterParams}
          // extra={
          //   <AddButton
          //     text="add"
          //     onClick={() => navigateQuery({ id: "create" })}
          //     classes="h-[25px] desktop:h-[30px]"
          //   />
          // }
        />

        {query?.id && <Form refetch={refetch} id={query.id} />}
      </div>
    </>
  );
};
export default Users;
