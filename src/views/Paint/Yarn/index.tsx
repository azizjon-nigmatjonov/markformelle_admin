import { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/UI/Header";
import { ToggleBtn } from "../../../components/UI/ToggleBtn";
import { PaintList } from "../Components/List";
import { PaintTable } from "../Components/Table";
import useCQuery from "../../../hooks/useCQuery";
import { PaintListSkeleton, PaintSkeletons } from "../Components/Skeleton";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../../components/UI/GlobalSearch";
const breadCrumbs = [{ label: "Дашборд покраски", link: "/paint/dashboard" }];
const PaintSectionYarn = () => {
  const [type, setType] = useState("grid");
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_PAINT_LIST`,
    endpoint: `http://srv-nav.praktik.loc:1991/WEB_ALL`,
    params: {
      // page: 1,
    },
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 60000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const newData = useMemo(() => {
    const result = list?.length ? list : data ?? [];
    const arr: any = [];
    result?.forEach((element: any) => {
      if (
        element.boya_kazan.toLowerCase().includes("yes") &&
        element.device_group?.includes("IPLIK BOYA")
      ) {
        const order = element.code_device.replace("-", "");
        let obj: any = {};
        if (element.nres?.[0]) {
          obj.machine = element.nres?.[0];
          obj.status = {
            color: "green",
            status: "working",
          };
        } else {
          obj.status = {
            color: element.ip === "EMPTY" ? "grey" : "blue",
            status: element.ip === "EMPTY" ? "no_connection" : "stopped",
          };
        }
        arr.push({ ...element, ...obj, order });
      }
    });

    return arr.sort((a: any, b: any) => a.order - b.order);
  }, [list?.length, data]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mr-3">
          <GlobalSearch list={data ?? []} setList={setList} />
        </div>
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {isLoading ? (
        <>
          {type === "grid" ? (
            <PaintSkeletons openHeader={openHeader} />
          ) : (
            <PaintListSkeleton openHeader={openHeader} />
          )}
        </>
      ) : (
        ""
      )}
      {type === "grid" ? (
        <PaintList data={newData ?? []} />
      ) : (
        <PaintTable list={newData ?? []} />
      )}
    </>
  );
};

export default PaintSectionYarn;
