import AddButton from "../../../components/UI/Buttons/AddButton";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { RouteList } from "./List";
import { RouteCreate } from "./List/RouteCreate";
import { FetchFunction } from "./List/Logic";
import usePageRouter from "../../../hooks/useObjectRouter";
import { useGetQueries } from "../../../hooks/useGetQueries";

export const breadCrumbs = [
  { label: "Доступ", link: "/access/routes" },
  { label: "Страница разрешение" },
];

const RoutePage = () => {
  const { navigateQuery } = usePageRouter();
  const { modal } = useGetQueries();
  const { newRouteList, refetch, isLoading } = FetchFunction();

  const handleClose = () => {
    navigateQuery({ modal: "", active: "" });
    refetch();
  };

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />}
      ></Header>

      <div className="p-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[#101828] text-lg font-semibold">
              Добавить новую страницу и разрешение
            </h1>
            <p className="text-[#475467] text-sm font-normal">
              Добавьте новую страницу и разрешение на управление разрешениями.
              место
            </p>
          </div>
          <div>
            <AddButton
              onClick={() => navigateQuery({ modal: "open" })}
              iconLeft={true}
              text="Добавить страницу"
            />
          </div>
        </div>

        <RouteList
          isLoading={isLoading}
          handleClose={handleClose}
          newRouteList={newRouteList}
        />
      </div>

      {modal && (
        <RouteCreate handleClose={handleClose} newRouteList={newRouteList} />
      )}
    </>
  );
};

export default RoutePage;
