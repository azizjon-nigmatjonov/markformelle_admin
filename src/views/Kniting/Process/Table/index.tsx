import { useSelector } from "react-redux";
import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect } from "react";
import { LoadingComponent } from "../../../../components/UI/Loading";

export const ProcessTable = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);

  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_sotrudn_data`,
    params: {},
  });

  const {
    data: cardsData,
    isLoading: cardLoading,
    refetch: refetchCards,
  } = useCQuery({
    key: `GET_CARDS_DATA`,
    endpoint: `http://10.10.6.21:8083/get_roll_data`,
    params: {},
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
      refetchCards();
    }, 60000);
  }, []);

  if (isLoading || cardLoading) {
    return <LoadingComponent />;
  }

  return (
    <div
      className="flex p-3 space-x-1 small_desktop:space-x-3"
      style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
    >
      <div className="w-[48%]">
        <FirstColumn data={cardsData?.dashboard_data ?? []} isLoading={false} />
      </div>
      <div className="w-[52%] h-full overflow-y-scroll remove-scroll">
        <SecondColumn data={data?.dashboard_data ?? []} isLoading={false} />
      </div>
    </div>
  );
};
