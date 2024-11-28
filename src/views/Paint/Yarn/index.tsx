import { useEffect, useMemo, useState } from "react";
import { Header } from "../../../components/UI/Header";
import { ToggleBtn } from "../../../components/UI/ToggleBtn";
import { PaintList } from "../Components/List";
import { PaintTable } from "../Components/Table";
import useCQuery from "../../../hooks/useCQuery";
import { PaintListSkeleton, PaintSkeletons } from "../Components/Skeleton";
import { useSelector } from "react-redux";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../../components/UI/GlobalSearch";
import { useCalculateTime } from "../../../hooks/useCalucaleTime";
const breadCrumbs = [{ label: "Дашборд покраски", link: "/paint/dashboard" }];

const statusText: any = {
  no_connection: "Нет соединения",
  working: "Работает",
  stopped: "Нет Задании",
};

const PaintSectionYarn = () => {
  const { GetTime } = useCalculateTime();
  const [type, setType] = useState("grid");
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_PAINT_LIST`,
    endpoint: `http://srv-nav.praktik.loc:1991/WEB_ALL`,
    params: {
      // page: 1,
    },
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

  const convertToMinutes = (timeString: string) => {
    // Split the time into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Calculate total minutes
    return hours * 60 + minutes;
  };

  const formatToISO = (dateString: string) => {
    // Split the old_time string into components
    const [day, month, year, time] = dateString.split(/[\s.]/);
    // Construct an ISO-compliant string
    return `${year}-${month}-${day}T${time}`;
  };

  const newData = useMemo(() => {
    const result = list?.length ? list : data ?? [];
    const arr: any = [];
    result?.forEach((element: any) => {
      if (
        element.boya_kazan.toLowerCase().includes("yes") &&
        element.device_group?.includes("IPLIK BOYA")
      ) {
        const order = element.code_device.replace("-", "");
        let obj: any = {};
        if (element.nres?.[0]) {
          obj.machine = element.nres?.[0];

          obj.machine.date_end = addMinutesToDate(obj.machine.date_start, 175);
          obj.machine.lasted_date = GetTime(
            formatToISO(obj.machine.date_start)
          );
          obj.machine.lasted_minutes = convertToMinutes(
            obj.machine.lasted_date
          );

          obj.status = {
            color: "green",
            status: "working",
            text: statusText.working,
          };
        } else {
          obj.status = {
            color: element.ip === "EMPTY" ? "grey" : "blue",
            status: element.ip === "EMPTY" ? "no_connection" : "stopped",
          };
        }
        // console.log("element", element);

        obj.status.text = statusText[obj.status.status];

        arr.push({ ...element, ...obj, order });
      }
    });

    return arr.sort((a: any, b: any) => a.order - b.order);
  }, [list?.length, data]);

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mr-3">
          <GlobalSearch list={data ?? []} setList={setList} />
        </div>
        <ToggleBtn type={type} setType={setType} />
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

export default PaintSectionYarn;
