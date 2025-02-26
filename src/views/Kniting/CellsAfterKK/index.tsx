import { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/UI/Header";
import { CellsAfterKKList } from "./Components/List";
import { CellsAfterKKTable } from "./Components/Table";
import { ToggleBtn } from "../../../components/UI/ToggleBtn";
import { ChniMachines } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import useCQuery from "../../../hooks/useCQuery";
import { Skeletons, SkeletonTable } from "./Components/Skeleton";
import { useSelector } from "react-redux";
import { GetCurrentDate } from "../../../utils/getDate";

const CellsAfterKK = () => {
  const [type, setType] = useState("grid");
  const [list, setList] = useState([...ChniMachines]);
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const [rolesCount, setRolesCount] = useState(0);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_CELLS_AFTER_KK`,
    endpoint: `http://10.10.6.21:8083/get_roll_data_all`,
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
    setRolesCount(0);
    return (
      data?.dashboard_data?.map((item: any) => {
        const plan_hourly = 0;
        setRolesCount((prev) => (prev += item.COUNT_RECORDS));
        const obj = {
          plan_hourly,
          plan_fact: 0,
          plan: 100,
          id: item.MAC_Address,
        };
        return {
          ...obj,
          ...item,
          DATE_CONTROL_FOR_TIMER: GetCurrentDate({
            date: item?.DATE_CONTROL_FOR_TIMER,
            type: "date",
          }),
        };
      }) ?? []
    );
  }, [data]);

  const breadCrumbs = [
    {
      label: "Клетки после КК          " + rolesCount + " рулонов",
      link: "/knitting/cells-after-kk",
    },
  ];

  return (
    <>
      <Header
        filters={
          <div className="flex space-x-2">
            <GlobalSearch list={newList ?? []} setList={setList} />
            <ToggleBtn type={type} setType={setType} />
          </div>
        }
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
      {type === "grid" ? (
        <CellsAfterKKList list={list} data={data?.dashboard_data} />
      ) : (
        <CellsAfterKKTable list={list} />
      )}
    </>
  );
};

export default CellsAfterKK;
