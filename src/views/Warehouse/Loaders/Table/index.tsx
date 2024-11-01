import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect, useMemo } from "react";
import { ThirdColumn } from "./ThirdColumn";
import { FourthColumn } from "./FourthColumn";
import CCard from "../../../../components/CElements/CCard";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { LoadingComponent } from "../../../../components/UI/Loading";

export const ProcessTable = () => {
  // const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { getFontSize } = useDeviceHeight();
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_dashboard_data_612`,
    params: {},
  });

  const newData = useMemo(() => {
    const upper: any = data?.dashboard_data?.sotrudn_data?.filter(
      (item: any) => item.OPERAC === "Приемка"
    );
    const down: any = data?.dashboard_data?.sotrudn_data?.filter(
      (item: any) => item.OPERAC === "Сборка"
    );
    return { ...data, upper, down };
  }, [data]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 30000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex p-3 space-x-1 small_desktop:space-x-3">
      <div className="grid grid-flow-row-dense grid-cols-6 gap-x-1 small_desktop:gap-x-3 w-full">
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
        <div className="col-span-3 space-y-3">
          <CCard half={true} classes="designed-scroll">
            <div className="flex items-center justify-center w-full sticky-header">
              <h2
                className="uppercase text-[var(--black)] font-bold"
                style={{
                  fontSize: getFontSize({
                    type: "card",
                    count: 14,
                    percent: 38,
                  }),
                }}
              >
                Приемка
              </h2>
            </div>

            <FourthColumn data={newData?.upper} isLoading={isLoading} />
          </CCard>
          <CCard half={true}>
            <div className="flex items-center justify-center w-full sticky-header">
              <h2
                className="uppercase text-[var(--black)] font-bold"
                style={{
                  fontSize: getFontSize({
                    type: "card",
                    count: 14,
                    percent: 38,
                  }),
                }}
              >
                Сборка
              </h2>
            </div>

            <FourthColumn data={newData?.down} isLoading={isLoading} />
          </CCard>
        </div>
      </div>
    </div>
  );
};
