import { useEffect, useMemo, useState } from "react";
import CCheckButton from "../../../../components/CElements/CCheckButton";
import useCQuery from "../../../../hooks/useCQuery";

export const breadCrumbItems = [
  { label: "dashboard", link: "/dashboard/dashboard" },
  { label: "dashboardavto", link: "/dashboard/dashboard" },
];

export const DataObjects = {
  working: 0,
  no_plan: 0,
  no_yarn: 0,
  fixing: 0,
  no_connnection: 0,
  reload: 0,
  cleaning: 0,
  stopped: 0,
  no_status: 0,
  reload_yarn: 0,
};

export const CheckDataReason = (machine: any) => {
  if (machine.no_connnection === "true" && machine.reason !== "Ремонт") {
    return "no_connnection";
  }

  if (machine.not_broken == "false" && machine.machine_is_on == "false") {
    return "no_connnection";
  }

  if (
    machine.rotation > 0 &&
    machine.not_broken == "true" &&
    machine.machine_is_on == "true"
  ) {
    if (
      machine.yarn_replacement == "true" &&
      machine.pkol_knit - machine.fkol_knit < 30 &&
      machine.pkol_knit - machine.fkol_knit > 0
    ) {
      return "working";
    } else return "working";
  }

  if (!machine.idlocation) return "";
  if (
    (machine.rotation == 0 || !machine.rotation) &&
    (machine.reason?.includes("Остановлена меньше 30 ми") || !machine.reason)
  ) {
    return "stopped";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    machine.pkol_knit != 0 &&
    Number(machine.stop_mins) >= 30 &&
    (machine.reason?.includes("Ожидание причины останова") || !machine.reason)
  ) {
    return "no_status";
  }

  switch (machine.reason.toLowerCase()) {
    case "ремонт":
      return "fixing";
    case "ремонт машины":
      return "fixing";
    case "замена иглы":
      return "reload";
    case "замена пряжи":
      return "reload_yarn";
    case "чистка машины":
      return "cleaning";
    case "нет пряжи":
      return "no_yarn";
    case "нет плана":
      return "no_plan";
    case "перезаправка":
      return "reload";
    default:
      return "stopped";
  }
};

export const CheckData = (machine: any) => {
  if (!machine.idlocation) return "";

  if (machine.no_connnection === "true" && machine.reason !== "Ремонт") {
    return "no_connnection";
  } else if (machine.pkol_knit == 0) {
    if (machine.reason === "Нет пряжи") {
      return "no_yarn";
    } else {
      // return "no_plan";
    }
  }

  if (
    machine.rotation > 0 &&
    machine.not_broken == "true" &&
    machine.machine_is_on == "true"
  ) {
    if (
      machine.yarn_replacement == "true" &&
      machine.pkol_knit - machine.fkol_knit < 30 &&
      machine.pkol_knit - machine.fkol_knit > 0
    ) {
      return "working";
    } else return "working";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    machine.machine_is_on === "true" &&
    machine.no_connnection === "false" &&
    machine.pkol_knit === 0 &&
    machine.yarn_replacement == "true" &&
    machine.reason !== "Ремонт"
  ) {
    if (machine.reason === "Нет пряжи") {
      return "no_yarn";
    } else {
      return "no_plan";
    }
  }

  if (machine.not_broken == "true" && machine.machine_is_on == "false") {
    return "no_plan";
  }

  if (machine.reason === "Ремонт" && machine.no_connnection === "false") {
    return "fixing";
  }

  if (machine.not_broken == "false" && machine.machine_is_on == "false") {
    return "no_connnection";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    machine.reason === "Замена пряжи"
  ) {
    return "reload";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    machine.reason === "Замена игл"
  ) {
    return "reload_yarn";
  }

  if (
    machine.reason === "Очистка" &&
    (machine.rotation == 0 || !machine.rotation)
  ) {
    return "cleaning";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    (machine.reason?.includes("Остановлена меньше 30 ми") || !machine.reason)
  ) {
    return "stopped";
  }

  if (
    (machine.rotation == 0 || !machine.rotation) &&
    machine.pkol_knit != 0 &&
    Number(machine.stop_mins) >= 30 &&
    (machine.reason?.includes("Ожидание причины останова") || !machine.reason)
  ) {
    return "no_status";
  }

  if (machine.no_connnection === "true") {
    return "fixing";
  }

  if (machine.reason === "Перезаправка" && machine.rotation == 0) {
    return "reload";
  }
  if (machine.reason === "Нет пряжи") {
    return "no_yarn";
  }

  switch (machine.reason.toLowerCase()) {
    case "ремонт":
      return "fixing";
    case "ремонт машины":
      return "fixing";
    case "замена иглы":
      return "reload";
    case "замена пряжи":
      return "reload_yarn";
    case "чистка машины":
      return "cleaning";
    case "нет пряжи":
      return "no_yarn";
    case "нет плана":
      return "no_plan";
    case "перезаправка":
      return "reload";
    default:
      return "stopped";
  }
};

export const TableData = () => {
  const headColumns = [
    {
      title: "#",
      id: "id",
    },
    {
      title: "yo'lovchi",
      id: "pasenger",
    },
    {
      title: "haydovchi",
      id: "driver",
    },
    {
      title: "so'ralgan sana",
      id: "riderequest_in_datetime",
    },
    {
      title: "holat",
      id: "status",
    },
  ];

  return { headColumns };
};

export const StatusColors: any = {
  working: "green",
  no_plan: "blue",
  no_yarn: "blue",
  fixing: "grey",
  no_connnection: "grey",
  reload: "red",
  cleaning: "red",
  stopped: "red",
  no_status: "red",
  reload_yarn: "red",
};

export const FetchFunction = () => {
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_DRIVER_HOME`,
    endpoint: `/WEB_ALL?code=01&podr_id=614`,
    params: {
      // page: 1,
    },
  });
  const obj: any = { ...StatusColors };
  const newData = useMemo(() => {
    if (!data?.length) return [];

    const arr: any = [];
    const existingIds = data?.map((item: any) => item.idlocation);
    const maxId = Math.max(...data?.map((item: any) => item.idlocation));

    for (let index = 1; index < maxId + 1; index++) {
      if (existingIds.includes(index)) {
        arr.push(data?.find((item: any) => item.idlocation === index));
      } else {
        arr.push({});
      }
    }

    return arr.map((machine: any) => {
      const new_status = { color: "red", status: "stopped" };

      if (CheckData(machine) in obj && machine.idlocation) {
        if (
          CheckData(machine) === "stopped" &&
          Number(machine.stop_mins) <= 10
        ) {
          new_status.color = "green";
        } else {
          new_status.color = obj[CheckData(machine)];
        }
      } else {
        new_status.color = "";
      }

      if (CheckDataReason(machine) in obj && machine.idlocation) {
        if (
          CheckDataReason(machine) === "stopped" &&
          Number(machine.stop_mins) <= 10
        ) {
          new_status.status = "working";
        } else {
          new_status.status = CheckDataReason(machine);
        }
      } else {
        new_status.status = "";
      }
      // CheckDataReason

      return {
        ...machine,
        new_status,
      };
    });
  }, [data]);

  return { bodyData: newData, isLoading, refetch };
};

interface Props {
  setChecked: (val: any) => void;
  checked: any;
  bodyData: any;
  setSearch: (val: string) => void;
}

interface Counts {
  [key: string]: number;
}

export const CountBtns = ({
  checked,
  setChecked = () => {},
  bodyData = [],
  setSearch = () => {},
}: Props) => {
  const filterCheckbox = (val: string) => {
    let list: any = checked.filter((i: string) => i !== "all") ?? [];

    if (list.includes(val)) {
      list = list.filter((i: string) => i !== val);
    } else {
      list = [val];
    }

    setSearch("");
    setChecked(list);
  };

  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const obj: any = { ...DataObjects };
    bodyData.forEach((machine: any) => {
      if (machine.new_status.status in obj) {
        obj[machine.new_status.status] += 1;
      }
    });

    setCounts(obj);
  }, [bodyData]);

  return (
    <div className="flex space-x-1 desktop:space-x-2">
      <CCheckButton
        color="var(--main60)"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Все{" "}
              <span className="font-bold">
                {Object.values(counts).reduce((acc, item) => acc + item, 0)}
              </span>
            </p>
          ),
        }}
        checked={checked.includes("all")}
        handleCheck={() => filterCheckbox("all")}
      />
      <CCheckButton
        color="#6cce65"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Работает <span className="font-bold">{counts?.working}</span>
            </p>
          ),
        }}
        checked={checked.includes("working")}
        handleCheck={() => filterCheckbox("working")}
      />
      <CCheckButton
        color="#8099f1"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Нет плана <span className="font-bold">{counts?.no_plan}</span>
            </p>
          ),
        }}
        checked={checked.includes("no_plan")}
        handleCheck={() => filterCheckbox("no_plan")}
      />
      <CCheckButton
        color="#8099f1"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Нет пряжи <span className="font-bold">{counts?.no_yarn}</span>
            </p>
          ),
        }}
        checked={checked.includes("no_yarn")}
        handleCheck={() => filterCheckbox("no_yarn")}
      />
      <CCheckButton
        color="var(--gray30)"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Ремонт <span className="font-bold">{counts?.fixing}</span>
            </p>
          ),
        }}
        checked={checked.includes("fixing")}
        handleCheck={() => filterCheckbox("fixing")}
      />
      <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Замена игл{" "}
              <span className="font-bold">{counts?.reload_yarn}</span>
            </p>
          ),
        }}
        checked={checked.includes("reload_yarn")}
        handleCheck={() => filterCheckbox("reload_yarn")}
      />

      <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Перезаправка <span className="font-bold">{counts?.reload}</span>
            </p>
          ),
        }}
        checked={checked.includes("reload")}
        handleCheck={() => filterCheckbox("reload")}
      />

      <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Очистка <span className="font-bold">{counts?.cleaning}</span>
            </p>
          ),
        }}
        checked={checked.includes("cleaning")}
        handleCheck={() => filterCheckbox("cleaning")}
      />

      {/* <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Остановлено <span className="font-bold">{counts?.stopped}</span>
            </p>
          ),
        }}
        checked={checked.includes("stopped")}
        handleCheck={() => filterCheckbox("stopped")}
      /> */}

      <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="text-[10px] desktop:text-sm font-[600]">
              Без статуса <span className="font-bold">{counts?.no_status}</span>
            </p>
          ),
        }}
        checked={checked.includes("no_status")}
        handleCheck={() => filterCheckbox("no_status")}
      />
    </div>
  );
};

export const CardLogic = () => {};
