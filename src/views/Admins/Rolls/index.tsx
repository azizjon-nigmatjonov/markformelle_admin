import { useMemo, useState } from "react";
import CTable from "../../../components/CElements/CTable";
import AddButton from "../../../components/UI/Buttons/AddButton";
import usePageRouter from "../../../hooks/useObjectRouter";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { DeleteFunction, FetchFunction, TableData, breadCrumbs } from "./Logic";
import { FilterFunctions } from "../../../components/UI/Filter/Logic";
import CCard from "../../../components/CElements/CCard";

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
          <CTable
            headColumns={headColumns}
            bodyColumns={bodyColumns}
            isResizeble={true}
            handleActions={handleActions}
            isLoading={isLoading}
            filterParams={filterParams}
            handleFilterParams={handleFilterParams}
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
