import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect, useMemo } from "react";
import { ThirdColumn } from "./ThirdColumn";
import { FourthColumn } from "./FourthColumn";

export const ProcessTable = () => {
  // const openHeader = useSelector((state: any) => state.sidebar.openHeader);

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_dashboard_data_612`,
    params: {},
  });

  const newData = useMemo(() => {
    return data;
  }, [data]);

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 10000);
  }, []);

  if (isLoading) {
    return "Закрузка...";
  }

  return (
    <div className="flex p-3 space-x-1 small_desktop:space-x-3">
      <div className="grid grid-flow-row-dense grid-cols-7 gap-x-1 small_desktop:gap-x-3 w-full">
        <div>
          <FirstColumn
            data={newData?.dashboard_data?.ready_cells}
            isLoading={isLoading}
          />
        </div>
        <div>
          <SecondColumn
            data={newData?.dashboard_data?.empty_cells}
            isLoading={isLoading}
          />
        </div>
        <div>
          <ThirdColumn
            data={newData?.dashboard_data?.cells_without_zon}
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-4">
          <FourthColumn
            data={newData?.dashboard_data?.sotrudn_data}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
