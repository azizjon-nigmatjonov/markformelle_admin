import { useSelector } from "react-redux";
import { FirstColumn } from "./FirstColumn";
import { SecondColumn } from "./SecondColumn";
import useCQuery from "../../../../hooks/useCQuery";
import { useEffect } from "react";
import CCard from "../../../../components/CElements/CCard";
import { ProcessSkeleton } from "./Skeleton";

interface Props {
  isLoading: boolean;
  wokers: any;
  refetch: () => void;
}

export const ProcessTable = ({
  isLoading = false,
  wokers = [],
  refetch = () => {},
}: Props) => {
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);

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
    const refetching = setInterval(() => {
      refetch();
      refetchCards();
    }, 60000);
    return () => {
      clearInterval(refetching);
    };
  }, []);

  return (
    <div
      className="p-2"
      style={{ height: openHeader ? "calc(100vh - 50px)" : "100vh" }}
    >
      {isLoading || cardLoading ? (
        <ProcessSkeleton openHeader={openHeader} />
      ) : (
        <div className="flex gap-1 flex-col mobile:flex-row small_desktop:space-x-2">
          <div className="mobile:w-[48%]">
            <FirstColumn
              data={cardsData?.dashboard_data ?? []}
              isLoading={false}
            />
          </div>
          <div className="mobile:w-[52%] h-full overflow-y-scroll remove-scroll">
            <CCard>
              <SecondColumn
                data={wokers?.length ? wokers : []}
                isLoading={false}
              />
            </CCard>
          </div>
        </div>
      )}
    </div>
  );
};
