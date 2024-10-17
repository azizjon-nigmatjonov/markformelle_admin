import { useMemo } from "react";
import CTable from "../../../../components/CElements/CTable";
import "./style.scss";

interface Props {
  isLoading: boolean;
  data: any;
}

export const SecondColumn = ({ isLoading = true, data = [] }: Props) => {
  const headColumns = useMemo(() => {
    return [
      {
        title: "Список грузчиков",
        renderHead: () => (
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)] text-center w-full">
            Список грузчиков
          </h3>
        ),
        // width: 330,
        id: ["FIO", "order"],
        render: (val: any) => (
          <div className="flex items-center space-x-2 py-1">
            {val?.[1] ? (
              <div className="w-[40px]">
                {val[1] === 1 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_1.png"
                    alt="first"
                  />
                ) : val[1] === 2 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_2.png"
                    alt="second"
                  />
                ) : val[1] === 3 ? (
                  <img
                    className="w-[40px]"
                    src="/images/medal_3.png"
                    alt="third"
                  />
                ) : (
                  <img
                    className="w-[35px]"
                    src="/images/danger.png"
                    alt={`last ${val[1]}`}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <p className="title whitespace-nowrap">{val?.[0]}</p>
          </div>
        ),
      },
      {
        title: "C начала месяца",
        renderHead: () => (
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)] text-center">
            C начала месяца
          </h3>
        ),
        // width: 140,
        id: "KOL_IN_MONTH",
        render: (val: string) => <p className="text">{val}</p>,
      },
      {
        title: "В этой смене",
        id: "KOL_TODAY",
        renderHead: () => (
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)] py-4 text-center">
            В этой смене
          </h3>
        ),
        // width: 140,
        render: (val: string) => <p className="text">{val}</p>,
      },
    ];
  }, []);

  const bodyData = useMemo(() => {
    const arr = data?.sort((a: any, b: any) => b.KOL_IN_MONTH - a.KOL_IN_MONTH);
    const newArr: any = [];
    const totalObj: any = {
      KOL_IN_MONTH: 0,
      KOL_TODAY: 0,
      FIO: "Общий",
      order: 0,
      TABN: "123",
    };

    arr?.forEach((item: any, index: number) => {
      const naming = item.FIO.trim().split(" ").slice(0, 2);

      totalObj.KOL_IN_MONTH += item.KOL_IN_MONTH;
      totalObj.KOL_TODAY += item.KOL_TODAY;

      const formatedMonth = parseInt(item.KOL_IN_MONTH)
        .toLocaleString("en-US")
        .replace(",", " ");
      const formatedDay = parseInt(item.KOL_TODAY)
        .toLocaleString("en-US")
        .replace(",", " ");

      if (index < 12) {
        newArr.push({
          ...item,
          KOL_IN_MONTH: formatedMonth,
          KOL_TODAY: formatedDay,
          order: index + 1,
          FIO: `${naming[1]}`,
        });
      }
    }) ?? [];

    totalObj.KOL_IN_MONTH = parseInt(totalObj.KOL_IN_MONTH)
      .toLocaleString("en-US")
      .replace(",", " ");
    totalObj.KOL_TODAY = parseInt(totalObj.KOL_TODAY)
      .toLocaleString("en-US")
      .replace(",", " ");
    return [...newArr, totalObj];
  }, [data]);

  return (
    <div className="h-full table w-full">
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyData}
        handleFilterParams={() => {}}
        filterParams={{}}
        disablePagination={true}
        tableSetting={false}
        isResizeble={false}
        isLoading={isLoading}
      />
    </div>
  );
};
