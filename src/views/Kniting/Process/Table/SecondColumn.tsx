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
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)]">
            Список грузчиков
          </h3>
        ),
        // width: 330,
        id: ["FIO", "order"],
        render: (val: any) => (
          <div className="flex items-center space-x-3 py-1">
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
                  className="w-[38px]"
                  src="/images/danger.png"
                  alt={`last ${val[1]}`}
                />
              )}
            </div>
            <p className="title whitespace-nowrap">{val[0]}</p>
          </div>
        ),
      },
      {
        title: "C начала месяца",
        renderHead: () => (
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)]">
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
          <h3 className="small_desktop:text-2xl font-semibold text-[var(--gray)] py-4">
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

    return (
      arr?.map((item: any, index: number) => {
        const naming = item.FIO.trim().split(" ").slice(0, 2);
        return {
          ...item,
          order: index + 1,
          FIO: `${naming[1]} ${naming[0].substring(0, 4)}..`,
        };
      }) ?? []
    );
  }, [data]);
  return (
    <div className="h-full table w-full">
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyData?.slice(0, 6)}
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
