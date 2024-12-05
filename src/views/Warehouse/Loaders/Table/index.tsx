import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect, useMemo, useState } from "react";
import { ThirdColumn } from "./ThirdColumn";
import { FourthColumn } from "./FourthColumn";
import CCard from "../../../../components/CElements/CCard";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { WarehouseSkeleton } from "./Skeleton";
import { useSelector } from "react-redux";
import { DocTable } from "./DocTable";

export const ProcessTable = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const [loading, setLoading] = useState(true);
  const { getFontSize } = useDeviceHeight();

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_dashboard_data_612`,
    params: {},
  });

  const { data: documents, refetch: refetchDoc } = useCQuery({
    key: `GET_DOCUMENTS`,
    endpoint: `http://10.10.6.21:8083/get_sborka_info_612`,
    params: {},
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(isLoading);
    }, 1500);
  }, [isLoading]);

  const newData = useMemo(() => {
    const upper: any =
      data?.dashboard_data?.sotrudn_data?.filter(
        (item: any) => item.OPERAC === "Приемка"
      ) ?? [];
    const down: any =
      data?.dashboard_data?.sotrudn_data?.filter(
        (item: any) => item.OPERAC === "Сборка"
      ) ?? [];
    return { ...data, upper, down };
  }, [data]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
      refetchDoc();
    }, 30000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  if (loading) {
    return <WarehouseSkeleton openHeader={openHeader} />;
  }

  return (
    <div className="flex p-3 space-x-1 small_desktop:space-x-2">
      <div className="grid grid-cols-2 gap-x-1 small_desktop:gap-x-2 w-full">
        <div className="grid grid-rows-2 gap-y-2">
          <CCard
            half={true}
            childClasses="small_desktop:p-2 small_desktop:pt-1"
          >
            <div className="grid grid-cols-3 gap-x-1 small_desktop:gap-x-2 h-full">
              <div>
                <FirstColumn data={newData?.dashboard_data?.ready_cells} />
              </div>
              <div>
                <SecondColumn data={newData?.dashboard_data?.empty_cells} />
              </div>
              <div>
                <ThirdColumn
                  data={newData?.dashboard_data?.cells_without_zon}
                />
              </div>
            </div>
          </CCard>

          <CCard
            half={true}
            childClasses="small_desktop:p-2 small_desktop:pt-1"
          >
            <div className="flex items-center justify-center w-full sticky-header">
              <h2
                className="uppercase text-[var(--black)] font-bold"
                style={{
                  fontSize: getFontSize({
                    type: "card",
                    count: 14,
                    percent: 37,
                  }),
                }}
              >
                Документы отборки в крашение
              </h2>
            </div>

            <DocTable data={documents?.dashboard_data ?? []} />
          </CCard>
        </div>
        <div className="space-y-2">
          <CCard
            half={true}
            childClasses="small_desktop:p-2 small_desktop:pt-1"
          >
            <div className="flex items-center justify-center w-full sticky-header">
              <h2
                className="uppercase text-[var(--black)] font-bold"
                style={{
                  fontSize: getFontSize({
                    type: "card",
                    count: 14,
                    percent: 37,
                  }),
                }}
              >
                Приемка
              </h2>
            </div>

            <FourthColumn data={newData?.upper} />
          </CCard>
          <CCard
            half={true}
            childClasses="small_desktop:p-2 small_desktop:pt-1"
          >
            <div className="flex items-center justify-center w-full sticky-header">
              <h2
                className="uppercase text-[var(--black)] font-bold"
                style={{
                  fontSize: getFontSize({
                    type: "card",
                    count: 14,
                    percent: 37,
                  }),
                }}
              >
                Сборка
              </h2>
            </div>

            <FourthColumn data={newData?.down} />
          </CCard>
        </div>
      </div>
    </div>
  );
};
