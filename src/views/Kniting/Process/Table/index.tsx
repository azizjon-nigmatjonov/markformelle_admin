import { useSelector } from "react-redux";
import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect } from "react";

export const ProcessTable = () => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_GRUZ`,
    endpoint: `http://10.10.6.21:8083/get_sotrudn_data`,
    params: {
      // page: 1,
    },
  });

  const {
    data: cardsData,
    isLoading: cardLoading,
    refetch: refetchCards,
  } = useCQuery({
    key: `GET_CARDS_DATA`,
    endpoint: `http://10.10.6.21:8083/get_roll_data`,
    params: {
      // page: 1,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      refetch();
      refetchCards();
    }, 60000);
  }, []);
  // // useEffect(() => {
  // //   axios.get("http://10.10.6.21:8083/get_roll_data").then((res) => {
  // //     console.log(res);
  // //   });
  // // }, []);

  // const cards = [
  //   {
  //     PODR_ID: 614,
  //     OBORUD_NUNBER: "A-027",
  //     COUNT_RECORDS: 38,
  //     "DATE_CONTROL_3@ST_ROLL": "2024-16-e8T04:57:31.793000",
  //     HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL: "2:28:47",
  //   },
  //   {
  //     PODR_ID: 614,
  //     OBORUD_NUNBER: "A-026",
  //     COUNT_RECORDS: 35,
  //     "DATE_CONTROL_3@ST_ROLL": "2024-16-08705:25:48.333000",
  //     HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL: "2:00:30",
  //   },
  //   {
  //     PODR_ID: 614,
  //     OBORUD_NUNBER: "A-061",
  //     COUNT_RECORDS: 33,
  //     "DATE_CONTROL_3@ST_ROLL": "2024-10-08700:62:19.576008",
  //     HOURS_MINUTES_SECONDS_SINCE_30ST_ROLL: "13:23:59",
  //   },
  // ];

  return (
    <div
      className="flex p-3 space-x-1 small_desktop:space-x-3"
      style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
    >
      <div className="w-[48%]">
        <FirstColumn data={cardsData?.dashboard_data} isLoading={cardLoading} />
      </div>
      <div className="w-[52%]">
        <SecondColumn data={data?.dashboard_data} isLoading={isLoading} />
      </div>
      {/* <div className="w-[30%]">
          <ThirdColumn />
        </div> */}
    </div>
  );
};
