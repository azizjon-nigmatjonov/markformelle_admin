import { useSelector } from "react-redux";
import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect } from "react";
import { ThirdColumn } from "./ThirdColumn";
import { FourthColumn } from "./FourthColumn";

export const ProcessTable = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_dashboard_data_612`,
    params: {},
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 10000);
  }, []);

  return (
    <div
      className="flex p-3 space-x-1 small_desktop:space-x-3"
      style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
    >
      <div className="grid grid-flow-row-dense grid-cols-6 gap-x-1 small_desktop:gap-x-3 w-full">
        <div>
          <FirstColumn
            data={data?.dashboard_data?.ready_cells}
            isLoading={isLoading}
          />
        </div>
        <div>
          <SecondColumn
            data={data?.dashboard_data?.empty_cells}
            isLoading={isLoading}
          />
        </div>
        <div>
          <ThirdColumn
            data={data?.dashboard_data?.cells_without_zon}
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-3">
          <FourthColumn
            data={data?.dashboard_data?.sotrudn_data}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
