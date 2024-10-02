import CTable from "../../../../components/CElements/CTable";

const list = [
  {
    workers: "Azizjon Nigmatjonov",
    by_month: "1455 КГ",
    by_day: "120 КГ",
    order: 0,
  },
  {
    workers: "Sardorbek",
    by_month: "1455 КГ",
    by_day: "120 КГ",
    order: 1,
  },
  {
    workers: "Nurmat",
    by_month: "1455 КГ",
    by_day: "120 КГ",
    order: 2,
  },
  {
    workers: "Shaxboz",
    by_month: "1455 КГ",
    by_day: "120 КГ",
    order: 4,
  },
  {
    workers: "Yusuf",
    by_month: "1455 КГ",
    by_day: "120 КГ",
    order: 4,
  },
];

export const SecondColumn = () => {
  const headColumns = [
    {
      title: "Список грузчиков",
      renderHead: () => (
        <h3 className="small_desktop:text-xl font-semibold text-[var(--gray)]">
          Список грузчиков
        </h3>
      ),
      width: 330,
      id: ["workers", "order"],
      render: (val: any) => (
        <div className="flex items-center space-x-3">
          <div>
            {val[1] === 0 ? (
              <img className="w-[40px]" src="/images/medal_1.png" alt="first" />
            ) : val[1] === 1 ? (
              <img
                className="w-[40px]"
                src="/images/medal_2.png"
                alt="second"
              />
            ) : val[1] === 2 ? (
              <img className="w-[40px]" src="/images/medal_3.png" alt="third" />
            ) : (
              <img
                className="w-[38px]"
                src="/images/danger.png"
                alt={`last ${val[1]}`}
              />
            )}
          </div>
          <p className="small_desktop:text-2xl font-semibold">{val[0]}</p>
        </div>
      ),
    },
    {
      title: "C начала месяца",
      renderHead: () => (
        <h3 className="small_desktop:text-lg font-semibold text-[var(--gray)]">
          C начала месяца
        </h3>
      ),
      id: "by_month",
      render: (val: string) => (
        <p className="small_desktop:text-2xl font-semibold">{val}</p>
      ),
    },
    {
      title: "В этой смене",
      id: "by_day",
      renderHead: () => (
        <h3 className="small_desktop:text-lg font-semibold text-[var(--gray)]">
          В этой смене
        </h3>
      ),
      render: (val: string) => (
        <p className="small_desktop:text-2xl font-semibold">{val}</p>
      ),
    },
  ];
  return (
    <div className="h-full">
      <CTable
        headColumns={headColumns}
        bodyColumns={list}
        handleFilterParams={() => {}}
        filterParams={{}}
        disablePagination={true}
        tableSetting={false}
      />
    </div>
  );
};
