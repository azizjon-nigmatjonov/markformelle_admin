import { useTranslation } from "react-i18next";
import CTable from "../../../../../../components/CElements/CTable";
import { useMemo, useState } from "react";
import { MachineConstantList } from "../../../../../../constants/machines";
import { CList } from "../../../../../../components/CElements/CList";
import usePageRouter from "../../../../../../hooks/useObjectRouter";

export const MachineList = () => {
  const { t } = useTranslation();
  const { navigateTo } = usePageRouter();
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 10 });
  const [open, setOpen]: any = useState(false);

  const bodyColumns = useMemo(() => {
    return MachineConstantList.map((item: any, index: number) => {
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
        render: (val: any) => {
          return (
            <CList
              open={open === val?.[1]}
              setOpen={(opened: any) => setOpen(opened ? val[1] : false)}
              title="plans"
            >
              <ul>
                {val?.[0]?.map((item: any, index: number) => (
                  <li key={index} className="py-2">
                    <div>
                      <div>
                        <span>
                          {t("plan")} {index + 1}
                        </span>
                      </div>
                      <div>
                        <p>{item.status}</p>
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
    ];
  }, [open]);

  const handleActions = (el: any, type: string) => {
    if (type === "view") {
      navigateTo(`/kniting/machine/${el.id}`)
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
