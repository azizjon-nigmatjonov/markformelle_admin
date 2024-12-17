import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";
import { ChniTable } from "./Components/Table";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { ChniMachines } from "./Logic";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../components/UI/GlobalSearch";
import useCQuery from "../../hooks/useCQuery";
import { useTimeDifference } from "../../hooks/useCalucaleTime";
import { Skeletons, SkeletonTable } from "./Components/Skeleton";
import { useSelector } from "react-redux";
const breadCrumbs = [{ label: "Дашборд ЧНИ", link: "/chni/dashboard" }];
const ChniDashboard = () => {
  const [type, setType] = useState("grid");
  const [list, setList] = useState([...ChniMachines]);
  const { GetTimeDifference } = useTimeDifference();
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_CHNI_LIST`,
    endpoint: `http://srv-nav.praktik.loc:1880/socsdata`,
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
    return (
      data?.map((item: any) => {
        const minutes: any = GetTimeDifference(
          item.PrevDateTime,
          item.LastDateTime
        );
        const plan_hourly = minutes > 0 ? Math.ceil(60 / minutes) : 0;

        const obj = {
          new_status: {
            color: "green",
          },
          plan_hourly,
          plan_fact: 0,
          plan: 100,
          id: item.MAC_Address,
        };
        return {
          ...obj,
          ...item,
        };
      }) ?? []
    );
  }, [data]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mr-3">
          <GlobalSearch list={newList ?? []} setList={setList} />
        </div>
        <ToggleBtn type={type} setType={setType} />
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
      {type === "grid" ? <ChniList list={list} /> : <ChniTable list={data} />}
    </>
  );
};

export default ChniDashboard;
