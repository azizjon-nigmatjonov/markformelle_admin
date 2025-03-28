import { useTranslation } from "react-i18next";
import CTable from "../../../../../../components/CElements/CTable";
import { useMemo, useState } from "react";
import { MachineConstantList } from "../../../../../../constants/machines";
import { CList } from "../../../../../../components/CElements/CList";
import usePageRouter from "../../../../../../hooks/useObjectRouter";

export const MachineList = () => {
  const { t } = useTranslation();
  const { navigateTo } = usePageRouter();
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 10,
  });
  const [open, setOpen]: any = useState(false);

  const bodyColumns = useMemo(() => {
    if (!MachineConstantList?.length) return [];
    return MachineConstantList?.map((item: any, index: number) => {
      return {
        ...item,
        status:
          index % 2 === 0
            ? "working"
            : index / 3 === 3
            ? "no_plan"
            : index === 1 || index === 3
            ? "broken"
            : "stopped",
        plans: [
          { plan: "6410", fact: "446.8", remainder: "1695" },
          { plan: "6410", fact: "446.8", remainder: "1695" },
        ],
        empty_feild: "1888",
      };
    });
  }, [MachineConstantList]);

  const headColumns = useMemo(() => {
    return [
      {
        title: "index",
        id: "index",
        width: 50,
      },
      {
        title: t("name"),
        id: "name",
      },
      {
        title: t("status"),
        id: "status",
        width: 140,
        render: (val: string) => {
          if (!val?.length) return "";
          return (
            <div
              className={`px-4 ${
                val === "working"
                  ? "bg-[var(--success)]"
                  : val === "stopped"
                  ? "bg-[var(--error)]"
                  : val === "broken"
                  ? "bg-[var(--gray)]"
                  : "bg-[var(--primary70)]"
              } flex items-center justify-center rounded-[8px] h-[30px] font-medium`}
            >
              {t(val)}
            </div>
          );
        },
      },
      {
        title: t("plans"),
        id: ["plans", "id"],
        click: "custom",
        width: 300,
        render: (val: any) => {
          if (!val?.length) return "";
          return (
            <CList
              open={open === val?.[1]}
              setOpen={(opened: any) => setOpen(opened ? val[1] : false)}
              title="plans"
            >
              <ul className="space-y-5">
                {val?.[0]?.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="px-2 border border-[var(--border)] rounded-[8px]"
                  >
                    <div>
                      <div className="border-b border-[var(--border)] py-2 flex justify-between">
                        <span>{t("plan_amount")}:</span>
                        <span className="font-bold"> {item.plan} kg</span>
                      </div>
                      <div className="border-b border-[var(--border)] py-2 flex justify-between">
                        <span>{t("actual_plan")}:</span>
                        <span className="font-bold"> {item.plan + 50} kg</span>
                      </div>
                      <div className="border-b border-[var(--border)] py-2 flex justify-between">
                        <span>{t("start_date")}:</span>
                        <span className="font-bold"> 14.09.2024</span>
                      </div>
                      <div className="border-b border-[var(--border)] py-2 flex justify-between">
                        <span>{t("end_date")}:</span>
                        <span className="font-bold"> 20.09.2024</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span>{t("estimated_date")}:</span>
                        <span className="font-bold"> 20.09.2024</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CList>
          );
        },
      },
      {
        title: t("empty_feild"),
        id: "empty_feild",
        render: (val: string) => (
          <>
            {val} {t("kg")}
          </>
        ),
      },
      {
        title: t("article"),
        id: "art",
      },
      {
        title: t("machine_power"),
        id: "capacity",
      },
      {
        title: t("start_date"),
        id: "start_date",
        render: () => <>14.09.2024</>,
      },
      {
        title: t("end_date"),
        id: "end_date",
        render: () => (
          <div>
            <span>20.09.2024 </span>
            <span className="text-[var(--gray)]">(осталось 6 дней)</span>
          </div>
        ),
      },
      {
        title: t("estimated_end_date"),
        id: "estimated_end_date",
        render: () => (
          <p className="text-[var(--gray)] font-bold">20.09.2024</p>
        ),
      },
      {
        title: t("machine_place"),
        id: "machine_place",
        render: () => <>1 линия, 1 машина</>,
      },
    ];
  }, [open]);

  const handleActions = (el: any, type: string) => {
    if (type === "view") {
      navigateTo(`/knitting/machine/${el.id}`);
    }
  };

  return (
    <>
      <CTable
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        meta={{ totalCount: 60, pageCount: 5 }}
        clickable={true}
        isResizeble={true}
        isLoading={false}
        handleActions={handleActions}
        disablePagination={true}
        filterParams={filterParams}
        handleFilterParams={setFilterParams}
      />
    </>
  );
};
