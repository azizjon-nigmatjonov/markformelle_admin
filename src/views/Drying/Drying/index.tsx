import { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/UI/Header";
import { ToggleBtn } from "../../../components/UI/ToggleBtn";
import { PaintList } from "../../Paint/Components/List";
import { PaintTable } from "../../Paint/Components/Table";
import useCQuery from "../../../hooks/useCQuery";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { PantoneColors } from "../../../constants/pantone";
import { useCalculateTimeAndDate } from "../../../hooks/useCalucaleTime";
import {
  PaintListSkeleton,
  PaintSkeletons,
} from "../../Paint/Components/Skeleton";
const breadCrumbs = [{ label: "Сушилка", link: "/drying/drying" }];

const statusText: any = {
  no_connection: "Нет соединения",
  working: "Работает",
  stopped: "Нет Задании",
};

const DryingPage = () => {
  const { GetHourAndMinute } = useCalculateTimeAndDate();
  const [type, setType] = useState("grid");
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_PAINT_LIST`,
    endpoint: `http://srv-nav.praktik.loc:1991/WEB_ALL`,
    params: {},
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    const refetching = setInterval(() => {
      refetch();
    }, 60000);

    return () => {
      clearInterval(refetching);
    };
  }, []);

  const addMinutesToDate = (dateString: string, minutesToAdd: number) => {
    const [day, month, year, time] = dateString.split(/[\s.]/);
    const isoDateString = `${year}-${month}-${day}T${time}`;

    const date = new Date(isoDateString);

    date.setMinutes(date.getMinutes() + minutesToAdd);

    const formattedDate = date
      .toLocaleString("en-GB", { hour12: false })
      .replace(",", "")
      .replace(/\//g, ".");

    return formattedDate;
  };

  const GetPantone = (str: string) => {
    if (str?.includes("TCX")) {
      return PantoneColors[str.substring(4, 11)];
    } else {
      return PantoneColors[str];
    }
  };

  const formatToISO = (dateString: string) => {
    const [day, month, year, time] = dateString.split(/[\s.]/);

    return `${year}-${month}-${day}T${time}`;
  };

  const newData = useMemo(() => {
    const result = list?.length ? list : data ?? [];
    const arr: any = [];
    result?.forEach((element: any) => {
      const group = element.device_group;
      if (
        group.includes("KURU BOLUM") ||
        group.includes("BASKI") ||
        group.includes("BASKI")
      ) {
        const order = element.code_device.replace("-", "");
        let obj: any = {};
        if (element.nres?.[element.nres?.length - 1]) {
          obj.machine = element.nres?.[element.nres?.length - 1];

          obj.machine.date_end = addMinutesToDate(
            obj.machine.date_start,
            obj.machine.process_time
          );
          obj.machine.lasted_date = GetHourAndMinute(
            formatToISO(obj.machine.date_end)
          );

          obj.machine.worked_date = GetHourAndMinute(
            formatToISO(obj.machine.date_start)
          );

          obj.machine.worked_date = GetHourAndMinute(
            formatToISO(obj.machine.date_start),
            "day"
          );

          obj.status = {
            color: "green",
            status: "working",
            text: statusText.working,
          };

          obj.machine.pantone_data = GetPantone(obj.machine.pantone);
        } else {
          obj.status = {
            color: element.ip === "EMPTY" ? "grey" : "blue",
            status: element.ip === "EMPTY" ? "no_connection" : "stopped",
            text: statusText[
              element.ip === "EMPTY" ? "no_connection" : "stopped"
            ],
          };
        }

        obj.status.text = statusText[obj.status.status];

        arr.push({ ...element, ...obj, order });
      }
    });

    return arr.sort((a: any, b: any) => a.order - b.order);
  }, [list?.length, data, type]);

  const FilterUI = () => (
    <div className="flex justify-between space-x-3">
      <GlobalSearch list={data ?? []} setList={setList} />

      <ToggleBtn type={type} setType={setType} />
    </div>
  );

  return (
    <>
      <Header
        filters={FilterUI()}
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        {FilterUI()}
      </Header>
      {isLoading ? (
        <>
          {type === "grid" ? (
            <PaintSkeletons openHeader={openHeader} />
          ) : (
            <PaintListSkeleton openHeader={openHeader} />
          )}
        </>
      ) : (
        ""
      )}
      {type === "grid" ? (
        <PaintList data={newData ?? []} />
      ) : (
        <PaintTable list={newData ?? []} />
      )}
    </>
  );
};

export default DryingPage;
