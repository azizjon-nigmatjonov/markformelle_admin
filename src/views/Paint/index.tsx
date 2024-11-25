import { useEffect, useMemo, useState } from "react";
import { Header } from "../../components/UI/Header";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { PaintList } from "./Components/List";
import { PaintTable } from "./Components/Table";
import useCQuery from "../../hooks/useCQuery";
import { PaintListSkeleton, PaintSkeletons } from "./Components/Skeleton";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
const breadCrumbs = [{ label: "Дашборд покраска", link: "/paint/dashboard" }];
const PaintSection = () => {
  const [type, setType] = useState("grid");
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_PAINT_LIST`,
    endpoint: `http://srv-nav.praktik.loc:1991/WEB_ALL`,
    params: {
      // page: 1,
    },
  });

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 20000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const newData = useMemo(() => {
    const arr: any = [];
    data?.forEach((element: any) => {
      if (element.device_group.includes("HT BOYA")) {
        const obj = element.nres?.[0] ?? { status: "stopped" };
        arr.push({ ...element, ...obj });
      }
    });
    return arr;
  }, [data]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
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

export default PaintSection;
