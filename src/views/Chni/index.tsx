import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";
import { ChniTable } from "./Components/Table";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { ChniMachines } from "./Logic";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../components/UI/GlobalSearch";
import useCQuery from "../../hooks/useCQuery";
import { Skeletons, SkeletonTable } from "./Components/Skeleton";
import { useSelector } from "react-redux";
const breadCrumbs = [{ label: "Дашборд ЧНИ", link: "/chni/dashboard" }];
const ChniDashboard = () => {
  const [type, setType] = useState("grid");
  const [list, setList] = useState([...ChniMachines]);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_CHNI_LIST`,
    endpoint: `http://10.40.14.193:8080/v1/get_all_machine_status`,
    params: {},
  });

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 60000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const newList = useMemo(() => {
    const arr: any = [];
    data?.results
      ?.sort((a: any, b: any) => a.machine_name - b.machine_name)
      ?.forEach((item: any) => {
        const obj = {
          new_status: {
            color: item.status === "success" ? "green" : "grey",
          },
        };
        arr.push({ ...item, ...obj });
      });
    return arr;
  }, [data]);

  const FilterUI = () => (
    <div className="flex justify-between space-x-3">
      <GlobalSearch list={newList ?? []} setList={setList} />

      <ToggleBtn type={type} setType={setType} />
    </div>
  );

  return (
    <>
      <Header
        filters={FilterUI()}
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        {FilterUI()}
      </Header>
      {isLoading ? (
        <>
          {type === "grid" ? (
            <Skeletons openHeader={openHeader} />
          ) : (
            <SkeletonTable openHeader={openHeader} />
          )}
        </>
      ) : (
        ""
      )}
      {type === "grid" ? (
        <ChniList list={list} />
      ) : (
        <ChniTable list={data?.results ?? []} />
      )}
    </>
  );
};

export default ChniDashboard;
