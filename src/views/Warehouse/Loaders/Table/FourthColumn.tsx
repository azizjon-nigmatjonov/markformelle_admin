import { useEffect, useMemo, useState } from "react";
import CTable from "../../../../components/CElements/CTable";
import "./style.scss";

interface Props {
  isLoading: boolean;
  data: any;
}

export const FourthColumn = ({ isLoading = true, data = [] }: Props) => {
  const [total, setTotal]: any = useState({});
  const [bodyData, setBodyData] = useState([]);

  useEffect(() => {
    const arr = data?.sort((a: any, b: any) => b.KOL_IN_MONTH - a.KOL_IN_MONTH);
    const newArr: any = [];
    const totalObj: any = {
      month: 0,
      day: 0,
      title: "Общий",
      order: 0,
      TABN: "123",
    };

    arr?.forEach((item: any, index: number) => {
      const naming = item.FIO.trim().split(" ").slice(0, 2);

      totalObj.month += item.KOL_IN_MONTH;
      totalObj.day += item.KOL_TODAY;

      const formatedMonth = parseInt(item.KOL_IN_MONTH)
        .toLocaleString("en-US")
        .replace(",", " ");
      const formatedDay = parseInt(item.KOL_TODAY)
        .toLocaleString("en-US")
        .replace(",", " ");

      newArr.push({
        ...item,
        KOL_IN_MONTH: formatedMonth,
        KOL_TODAY: formatedDay,
        order: index + 1,
        FIO: `${naming[1]}`,
      });
    }) ?? [];

    totalObj.month = parseInt(totalObj.month)
      .toLocaleString("en-US")
      .replace(",", " ");
    totalObj.day = parseInt(totalObj.day)
      .toLocaleString("en-US")
      .replace(",", " ");
    setBodyData(newArr);

    if (arr.length < 12) {
      newArr.push({
        FIO: totalObj.title,
        KOL_IN_MONTH: totalObj.month,
        KOL_TODAY: totalObj.day,
      });
    }

    setTimeout(() => {
      setTotal(totalObj);
    }, 0);
  }, [data]);

  const headColumns = useMemo(() => {
    return [
      {
        title: "Список грузчиков",
        renderHead: () => (
          <h3 className="text-sm small_desktop:text-xl desktop:text-2xl font-semibold text-[var(--gray)] text-center w-full">
            Список грузчиков
          </h3>
        ),
        width: "40%",
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
              <div className="flex items-center justify-between w-full">
                <p className="footer_text whitespace-nowrap">{val?.[0]}</p>
                <p className="footer_text whitespace-nowrap pr-5 desktop:pr-10">
                  {bodyData.length}
                </p>
              </div>
            )}
            {val?.[1] ? (
              <p className="title whitespace-nowrap">{val?.[0]}</p>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        title: "C начала месяца",
        width: "30%",
        renderHead: () => (
          <h3 className="text-sm small_desktop:text-xl desktop:text-2xl font-semibold text-[var(--gray)] text-center">
            C начала месяца
          </h3>
        ),
        // width: 140,
        id: ["KOL_IN_MONTH", "order"],
        render: (val: string) => <p className={`text`}>{val[0]}</p>,
      },
      {
        title: "В этой смене",
        width: "30%",
        id: ["KOL_TODAY", "order"],
        renderHead: () => (
          <h3 className="text-sm small_desktop:text-xl desktop:text-2xl font-semibold text-[var(--gray)] py-4 text-center">
            В этой смене
          </h3>
        ),
        // width: 140,
        render: (val: string) => <p className={`text`}>{val[0]}</p>,
      },
      {
        title: "priyom",
        width: "30%",
        id: ["KOL_TODAY", "order"],
        renderHead: () => (
          <h3 className="text-sm small_desktop:text-xl desktop:text-2xl font-semibold text-[var(--gray)] py-4 text-center">
            приемка
          </h3>
        ),
        // width: 140,
        render: (val: string) => <p className={`text`}>{}</p>,
      },
      {
        title: "prixod",
        width: "30%",
        id: ["KOL_TODAY", "order"],
        renderHead: () => (
          <h3 className="text-sm small_desktop:text-xl desktop:text-2xl font-semibold text-[var(--gray)] py-4 text-center">
            отборка
          </h3>
        ),
        // width: 140,
        render: (val: string) => <p className={`text`}>{}</p>,
      },
    ];
  }, [bodyData]);

  return (
    <div className="w-full h-full table">
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyData}
        handleFilterParams={() => {}}
        filterParams={{}}
        disablePagination={true}
        tableSetting={false}
        isResizeble={false}
        isLoading={isLoading}
        footer={bodyData?.length < 12 ? 0 : total}
      />
    </div>
  );
};
