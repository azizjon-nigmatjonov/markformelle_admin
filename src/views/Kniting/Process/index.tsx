import { useEffect, useState } from "react";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { Header } from "../../../components/UI/Header";
import { ProcessTable } from "./Table";
import useCQuery from "../../../hooks/useCQuery";

const WarehouseLoaders = () => {
  const [list, setList] = useState([]);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_sotrudn_data`,
    params: {},
  });

  useEffect(() => {
    setList(data?.dashboard_data ?? []);
  }, [data]);

  return (
    <>
      <Header>
        <div className="mx-3">
          <GlobalSearch list={data?.dashboard_data ?? []} setList={setList} />
        </div>
      </Header>
      <ProcessTable wokers={list} refetch={refetch} isLoading={isLoading} />
    </>
  );
};

export default WarehouseLoaders;
