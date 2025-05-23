import { useCallback, useState } from "react";
import CTable from "../../../components/CElements/CTable";
import AddButton from "../../../components/UI/Buttons/AddButton";
import usePageRouter from "../../../hooks/useObjectRouter";
import Form from "./Form";
import adminService from "../../../services/admins";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { FetchFunction, TableData, breadCrumbs } from "./Logic";
import { FilterFunctions } from "../../../components/UI/Filter/Logic";
import CCard from "../../../components/CElements/CCard";

const adminsList = [
  {
    name: "Azizjon",
    email: "aziz.nigmatjonov7@gmail.com",
    phone: "+998 99 491 2830",
    roles: [{ name: "super_admin" }],
    created_at: "",
    status: "active",
  },
];

const Admins = () => {
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
      if (element.email === "superrt@akataxi.uz") return;
      adminService.deleteAdmin(element.id).then(() => {
        refetch();
      });
    }
  }, []);

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
      >
        <div className="ml-5">
          <AddButton
            text="add"
            onClick={() => navigateQuery({ id: "create" })}
          />
        </div>
      </Header>
      <div className="p-2">
        <CCard>
          <CTable
            headColumns={headColumns}
            bodyColumns={adminsList ?? bodyColumns.list}
            meta={bodyColumns?.meta}
            isResizeble={true}
            isLoading={isLoading}
            handleActions={handleActions}
            filterParams={filterParams}
            handleFilterParams={handleFilterParams}
          />

          {query?.id && <Form refetch={refetch} id={query.id} />}
        </CCard>
      </div>
    </>
  );
};
export default Admins;
