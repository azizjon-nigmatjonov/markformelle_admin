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
    endpoint: `http://10.10.6.21:8083/get_sotrudn_data_612`,
    params: {},
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 60000);
  }, []);

  return (
    <div
      className="flex p-3 space-x-1 small_desktop:space-x-3"
      style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
    >
      <div className="grid grid-cols-4 gap-x-3 w-full">
        <FirstColumn data={data?.data} isLoading={isLoading} />
        <SecondColumn data={data?.data} isLoading={isLoading} />
        <ThirdColumn data={data?.data} isLoading={isLoading} />
        <FourthColumn data={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
};
