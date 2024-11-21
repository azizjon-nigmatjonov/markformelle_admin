import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import CTable from "../../../../../components/CElements/CTable";
import CCard from "../../../../../components/CElements/CCard";
import {
  FormatTime,
  GetGoursFromMinutes,
} from "../../../../../utils/formatTime";

interface Props {
  list: any;
  filterParams: any;
  setFilterParams: (val: any) => void;
}

export const MachinesList = ({
  list = [],
  setFilterParams,
  filterParams,
}: Props) => {
  const { t } = useTranslation();
  const [headColumns, setHeadColumns]: any = useState([]);

  const bodyColumns = useMemo(() => {
    if (!list?.length) return [];
    const arr: any = [];
    let neInd = 0;
    list.forEach((element: any, index: number) => {
      element.machine_place = {
        line: Math.ceil((index + 1) / 11),
      };

      if (element.idlocation) {
        neInd += 1;
        element.machine_place.que = neInd;
        arr.push({ index, ...element });
      }
    });
    return arr;
  }, [list]);

  useEffect(() => {
    const headColumns = [
      {
        title: "index",
        id: "index",
        width: 40,
      },
      {
        title: t("name"),
        id: "name",
        width: 100,
        filter: "number",
      },
      {
        title: t("model"),
        id: "model",
        width: 100,
      },
      {
        title: t("IP адрес"),
        id: "ip_address",
        width: 100,
      },
      {
        title: t("status"),
        id: "new_status",
        width: 100,
        render: (val: any) => {
          if (!val) return "Нет статуса";

          return (
            <div
              className={`py-1 flex items-center justify-center text-sm rounded-[8px] whitespace-nowrap font-medium ${val.color}`}
            >
              {t(val.status)}
            </div>
          );
        },
      },
      {
        title: t("plan"),
        id: "nplan",
      },
      {
        title: t("stop_mins"),
        id: "stop_mins",
        width: 160,
        render: (val: any) => {
          return <>{GetGoursFromMinutes(val)}</>;
        },
      },
      {
        title: t("message"),
        id: "message",
        width: 150,
        render: (val: any) => {
          return val;
        },
      },
      {
        title: t("article"),
        id: "art",
        width: 140,
      },
      {
        title: t("machine_power"),
        id: "capacity",
        width: 180,
      },
      {
        title: t("response_time"),
        id: "last_response_time",
        width: 140,
        render: (time: string) => {
          return <>{FormatTime(time, "hour")}</>;
        },
      },
      {
        title: t("machine_place"),
        id: "machine_place",
        width: 160,
        render: (obj: any) => (
          <>
            {obj.line || 1} линия, {obj.que} место
          </>
        ),
      },
    ];

    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);
      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setHeadColumns(newColumns);
  }, [bodyColumns]);

  return (
    <div className="p-2">
      <CCard classes="border-0" childClasses="p-0">
        <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          meta={{ totalCount: 60, pageCount: 5 }}
          isResizeble={true}
          isLoading={false}
          disablePagination={true}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
        />
      </CCard>
    </div>
  );
};
