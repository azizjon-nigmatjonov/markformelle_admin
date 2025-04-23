import { useMemo, useState } from "react";
import AddButton from "../../../components/UI/Buttons/AddButton";
import usePageRouter from "../../../hooks/useObjectRouter";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { DeleteFunction, FetchFunction, TableData, breadCrumbs } from "./Logic";
import { FilterFunctions } from "../../../components/UI/Filter/Logic";
import CCard from "../../../components/CElements/CCard";
import CNewTable from "../../../components/CElements/CNewTable";

const Rolls = () => {
  const { navigateTo } = usePageRouter();
  const { roles, isLoading, refetch } = FetchFunction();
  const { deleteRoll } = DeleteFunction({ handleClose: refetch });
  const { headColumns, handleActions } = TableData({ deleteRoll });
  const [filterParams, setFilterParams]: any = useState({});
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

  const bodyColumns = useMemo(() => {
    return roles ?? [];
  }, [roles]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs
            items={breadCrumbs}
            progmatic={true}
            type="link"
            handleSearch={handleSearch}
            defaultValue={filterParams?.q}
          />
        }
      ></Header>
      <div className="p-2">
        <CCard>
          <CNewTable
            headColumns={headColumns}
            bodyColumns={bodyColumns}
            isResizeble={true}
            handleActions={handleActions}
            isLoading={isLoading}
            filterParams={filterParams}
            handleFilterParams={handleFilterParams}
            meta={{
              totalCount: 4,
              pageCount: 1,
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
            extra={
              <AddButton
                text="Добавить новую роль"
                type="ordinary"
                onClick={() => navigateTo("/access/rolls/:create")}
                classes="desktop:h-[30px]"
              />
            }
          />
        </CCard>
      </div>
    </>
  );
};
export default Rolls;
