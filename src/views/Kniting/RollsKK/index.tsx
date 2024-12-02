import { useEffect, useState } from "react";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { Header } from "../../../components/UI/Header";
import useCQuery from "../../../hooks/useCQuery";
import { TableUI } from "./Table";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
const breadCrumbs = [
  { label: "Рулоны для Контроль качество", link: "/knitting/rolls-kk" },
];
export const RollsKK = () => {
  const [list, setList] = useState([]);

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8085/get_avtomat_info_614`,
    params: {},
  });

  useEffect(() => {
    setList(data?.dashboard_data ?? []);
  }, [data]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 30000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mx-3">
          <GlobalSearch list={data?.dashboard_data ?? []} setList={setList} />
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
