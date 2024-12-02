import { useEffect, useState } from "react";
import CCard from "../../../../components/CElements/CCard";
import CTable from "../../../../components/CElements/CTable";
import { SkeletonUI } from "../Skeleton/Skeleton";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useCalculateTimeAndDate } from "../../../../hooks/useCalucaleTime";
interface Props {
  list: any;
  isLoading: boolean;
}

export const TableUI = ({ list = [], isLoading = false }: Props) => {
  const [filterParams, setFilterParams]: any = useState({});
  const [headColumns, setHeadColumns]: any = useState([]);
  const { GetHourAndMinute } = useCalculateTimeAndDate();

  useEffect(() => {
    const headColumns = [
      {
        title: "index",
        id: "index",
        width: 40,
      },
      {
        title: "Номер машины",
        id: "NUMBER_ID",
      },
      {
        title: "Баркод",
        id: "BARCODE",
      },
      {
        title: "ФИО",
        id: "FIO",
      },
      {
        title: "Дата вязания",
        id: "DATE_KNIT",
        render: (val: string) => {
          return GetCurrentDate({
            date: val,
            type: "usually",
          });
        },
      },
      {
        title: "Разница во времени",
        id: "time",
        render: (val: string) => {
          return GetHourAndMinute(val);
        },
      },
    ];

    const obj = list?.[0] ? { ...list?.[0] } : {};
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

    setTimeout(() => {
      setHeadColumns(newColumns);
    }, 0);
  }, [list]);

  return (
    <div className="p-2">
      <CCard>
        {isLoading ? (
          <SkeletonUI />
        ) : (
          <CTable
            headColumns={headColumns}
            bodyColumns={list}
            isResizeble={true}
            isLoading={isLoading}
            filterParams={filterParams}
            handleFilterParams={setFilterParams}
            disablePagination={true}
            defaultSortData={{ value: "down", id: "DATE_KNIT" }}
          />
        )}
      </CCard>
    </div>
  );
};
