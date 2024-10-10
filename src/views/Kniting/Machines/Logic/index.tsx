import { useEffect, useMemo, useState } from "react";
import CCheckButton from "../../../../components/CElements/CCheckButton";
import useCQuery from "../../../../hooks/useCQuery";
import { useDispatch, useSelector } from "react-redux";
import { mashineActions } from "../../../../store/machine/machine.slice";

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
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_DRIVER_HOME`,
    endpoint: `/WEB_ALL?code=01&podr_id=614`,
    params: {
      // page: 1,
    },
  });

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

    return arr;
  }, [data]);

  return { bodyData: newData, isLoading, refetch };
};

interface Props {
  setChecked: (val: any) => void;
  checked: any;
  bodyData: any;
  setSearch: (val: string) => void;
}

export const CountBtns = ({
  checked,
  setChecked = () => {},
  bodyData = [],
  setSearch = () => {},
}: Props) => {
  const dispatch = useDispatch();
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

  const [counts, setCounts]: any = useState({});
  const machine_info = useSelector((state: any) => state.machine.machine_info);

  const TimerFn = (id: number) => {
    let time = 1;

    setInterval(() => {
      dispatch(
        mashineActions.setMachineTimer({
          id,
          payload: { timer: (time += 1), animation: false },
        })
      );
    }, 1000);
  };

  const AnimateFn = (id: number) => {
    dispatch(
      mashineActions.setMachineTimer({
        id,
        payload: { timer: 1800001, animation: true },
      })
    );
  };

  const HandleAnimation = (id: number) => {
    if (!machine_info?.[id]?.timer) {
      TimerFn(id);
    } else {
      if (machine_info?.[id]?.timer > 1800000) {
        AnimateFn(id);
      }
    }
  };

  const RemoveFn = (id: number) => {
    dispatch(
      mashineActions.setMachineTimer({
        id,
        payload: { timer: 0, animation: false },
      })
    );
  };

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
        RemoveFn(element.idlocation);
      } else if (
        element.yarn_replacement == "true" &&
        element.pkol_knit === 0 &&
        element.machine_is_on === "true" &&
        element.no_connnection === "false"
      ) {
        RemoveFn(element.idlocation);
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
          RemoveFn(element.idlocation);
          obj.working += 1;
        } else {
          RemoveFn(element.idlocation);
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
        HandleAnimation(element.idlocation);
        obj.stopped += 1;
      }
    });

    setCounts(obj);
  }, [bodyData]);

  return (
    <div className="flex space-x-3">
      <CCheckButton
        color="var(--main60)"
        element={{
          label: (
            <p className="font-[600]">
              Все{" "}
              <span className="font-bold">
                {counts?.working +
                  counts?.no_plan +
                  counts?.broken +
                  counts?.stopped}
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
            <p className="font-[600]">
              Работает <span className="font-bold">{counts?.working}</span>
            </p>
          ),
        }}
        checked={checked.includes("green")}
        handleCheck={() => filterCheckbox("green")}
      />
      <CCheckButton
        color="#8099f1"
        element={{
          label: (
            <p className="font-[600]">
              Нет плана <span className="font-bold">{counts?.no_plan}</span>
            </p>
          ),
        }}
        checked={checked.includes("blue")}
        handleCheck={() => filterCheckbox("blue")}
      />
      <CCheckButton
        color="var(--gray30)"
        element={{
          label: (
            <p className="font-[600]">
              Сломан <span className="font-bold">{counts?.broken}</span>
            </p>
          ),
        }}
        checked={checked.includes("grey")}
        handleCheck={() => filterCheckbox("grey")}
      />
      <CCheckButton
        color="#fb6060"
        element={{
          label: (
            <p className="font-[600]">
              Остановлено <span className="font-bold">{counts?.stopped}</span>
            </p>
          ),
        }}
        checked={checked.includes("red")}
        handleCheck={() => filterCheckbox("red")}
      />
    </div>
  );
};

export const CardLogic = () => {};
