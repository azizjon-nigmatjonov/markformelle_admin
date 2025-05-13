import { useEffect, useMemo, useState } from "react";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { Header } from "../../../components/UI/Header";
import useCQuery from "../../../hooks/useCQuery";
import { TableUI } from "./Table";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { GetCurrentDate } from "../../../utils/getDate";
const breadCrumbs = [
  { label: "Рулоны для контроль качество", link: "/knitting/rolls-kk" },
];
export const RollsKK = () => {
  const [list, setList]: any = useState([]);

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8085/get_avtomat_info_614`,
    params: {},
  });

  const newData = useMemo(() => {
    return (
      data?.dashboard_data?.map((item: any) => {
        return {
          ...item,
          DATE_KNIT: GetCurrentDate({ date: item.DATE_KNIT, type: "usually" }),
        };
      }) ?? []
    );
  }, [data]);

  useEffect(() => {
    setList(newData ?? []);
  }, [newData]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 30000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const HeaderFilter = () => (
    <div>
      <GlobalSearch list={newData} setList={setList} />
    </div>
  );

  return (
    <>
      <Header
        filters={HeaderFilter()}
        open={true}
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mx-2">
          <GlobalSearch list={newData ?? []} setList={setList} />
        </div>
      </Header>

      <TableUI
        list={list?.map((item: any, index: number) => {
          return {
            index,
            ...item,
            time: item.DATE_KNIT,
          };
        })}
        isLoading={isLoading}
      />
    </>
  );
};
