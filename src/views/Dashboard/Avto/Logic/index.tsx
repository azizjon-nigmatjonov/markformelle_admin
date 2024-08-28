import { useEffect, useState } from "react";
import CCheckButton from "../../../../components/CElements/CCheckButton";
import useCQuery from "../../../../hooks/useCQuery";

export const breadCrumbItems = [
  { label: "dashboard", link: "/dashboard/dashboard" },
  { label: "dashboardavto", link: "/dashboard/dashboard" },
];

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

export const FetchFunction = () => {
  const { data, isLoading } = useCQuery({
    key: `GET_DRIVER_HOME`,
    endpoint: `/WEB_ALL?code=01&podr_id=614`,
    params: {
      // page: 1,
    },
  });

  return { bodyData: data ?? [], isLoading };
};

interface Props {
  setChecked: (val: any) => void;
  checked: any;
  bodyData: any;
}

export const CountBtns = ({
  checked,
  setChecked = () => {},
  bodyData = [],
}: Props) => {
  const filterCheckbox = (val: string) => {
    let list: any = checked.filter((i: string) => i !== "all") ?? [];

    if (list.includes(val)) {
      list = list.filter((i: string) => i !== val);
    } else {
      list = [val];
    }

    setChecked(list);
  };

  const [counts, setCounts]: any = useState({});

  useEffect(() => {
    let obj: any = {
      no_plan: 0,
      working: 0,
      stopped: 0,
      broken: 0,
    };

    bodyData.forEach((element: any) => {
      if (element.no_connnection == "true") {
        obj.broken += 1;
      } else if (
        element.yarn_replacement == "true" &&
        element.pkol_knit === 0 &&
        element.machine_is_on === "true" &&
        element.no_connnection === "false"
      ) {
        obj.no_plan += 1;
      } else if (element.pkol_knit == 0) {
      } else if (
        element.rotation > 0 &&
        element.not_broken == "true" &&
        element.machine_is_on == "true"
      ) {
        if (
          element.yarn_replacement == "true" &&
          element.pkol_knit - element.fkol_knit < 30 &&
          element.pkol_knit - element.fkol_knit > 0
        ) {
        } else {
          obj.working += 1;
        }
      } else if (
        element.not_broken == "true" &&
        element.machine_is_on == "false"
      ) {
      } else if (
        element.not_broken == "true" &&
        element.machine_is_on == "true" &&
        element.rotation == 0
      ) {
        obj.stopped += 1;
      }
    });

    setCounts(obj);
  }, [bodyData]);

  return (
    <div className="mr-5 flex space-x-5">
      <CCheckButton
        color="var(--main60)"
        element={{ label: "Все " + (counts?.working + counts?.no_plan + counts?.broken + counts?.stopped) }}
        checked={checked.includes("all")}
        handleCheck={() => filterCheckbox("all")}
      />
      <CCheckButton
        color="#6cce65"
        element={{ label: "Работает " + counts?.working }}
        checked={checked.includes("green")}
        handleCheck={() => filterCheckbox("green")}
      />
      <CCheckButton
        color="#8099f1"
        element={{ label: "Нет плана " + counts?.no_plan }}
        checked={checked.includes("blue")}
        handleCheck={() => filterCheckbox("blue")}
      />
      <CCheckButton
        color="var(--gray30)"
        element={{ label: "Сломан " + counts?.broken }}
        checked={checked.includes("grey")}
        handleCheck={() => filterCheckbox("grey")}
      />
      <CCheckButton
        color="#fb6060"
        element={{ label: "Остановлено " + counts?.stopped }}
        checked={checked.includes("red")}
        handleCheck={() => filterCheckbox("red")}
      />
    </div>
  );
};
