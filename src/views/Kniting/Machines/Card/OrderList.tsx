import React, { useEffect, useState } from "react";
// import { ListDivider } from "@mui/joy";
import axios from "axios";
// import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";
// import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { GetCurrentDate } from "../../../../utils/getDate";
import CTable from "../../../../components/CElements/CTable";

interface OrderListProps {
  machineName: string;
  machineId: number;
}

const OrderList: React.FC<OrderListProps> = ({ machineName }) => {
  const [data, setData] = useState({ loading: true, list: [] });
  // const { getFontSize } = useDeviceHeight();
  // const height = window?.screen?.height ?? 0;
  const [filterParams, setFilterParams]: any = useState({});

  const headColumns: any = [
    {
      title: "index",
      id: "index",
      width: 40,
    },
    {
      title: "Номер заказа",
      id: "PLAN_KNIT_ID",
      remove_sort: true,
    },
    {
      title: "Артикул",
      id: "ART",
      remove_sort: true,
    },
    {
      title: "План",
      id: "KOL_KNIT",
      remove_sort: true,
      render: (val: any) => {
        return <p className="font-semibold">{val} кг</p>;
      },
    },
    {
      title: "Дата начала",
      id: "DATA_START",
      remove_sort: true,
      render: (val: string) => {
        return GetCurrentDate({
          date: val,
          type: "date",
        });
      },
    },
    {
      title: "Дата завершения",
      id: "DATA_END",
      remove_sort: true,
      render: (val: string) => {
        return GetCurrentDate({
          date: val,
          type: "date",
        });
      },
    },
  ];

  useEffect(() => {
    axios
      .get(
        `http://10.10.6.21:8084/get_knitting_orders?NUMBER_ID=${machineName}`
      )
      .then((res) => {
        setData({
          list: res?.data?.dashboard_data ?? [],
          loading: false,
        });
      });
  }, [machineName]);

  return (
    <div className="max-h-[500px] min-h-[440px]">
      {/* {data.loading ? (
        <div>
          <OneSkeleton />
        </div>
      ) : (
      

        data?.list?.map((order: any) => (
          <ul
            key={order.id}
            className="border border-[var(--border)] py-2 px-3 rounded-[12px] space-y-1 text-[var(--black10)] mb-3"
            style={{
              fontSize: getFontSize({
                type: "machine",
                count: 1,
                percent:
                  height > 1200
                    ? 2.5
                    : height < 800 && height > 600
                    ? 1.5
                    : 1.5,
              }),
            }}
          >
            <li className="flex items-center justify-between">
              <p>Номер заказа</p>
              <p>{order.PLAN_KNIT_ID}</p>
            </li>
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Артикул</p>
              <p>{order.ART}</p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>План</p>
              <p>
                {order.KOL_KNIT} {" кг"}
              </p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Дата начала</p>
              <p>
                {" "}
                {GetCurrentDate({
                  date: order.DATA_START,
                  type: "date",
                })}
              </p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Дата окончания</p>
              <p>
                {GetCurrentDate({
                  date: order.DATA_END,
                  type: "date",
                })}
              </p>
            </li>
            {/* <ListDivider />
            <li className="flex items-center justify-between">
              <p>Заказ закрыт</p>
              <p>{order.closed ? "Да" : "Нет"}</p>
            </li> 
          </ul>
        ))
      )} */}
      {!data.loading && !data.list?.length ? (
        <div className="flex justify-center flex-col items-center h-full w-full">
          <img
            width={200}
            src="/images/no-data.png"
            alt="data"
            loading="lazy"
          />
          <p>Нет информации</p>
        </div>
      ) : data.list?.length ? (
        <CTable
          headColumns={headColumns}
          bodyColumns={data.list}
          isResizeble={true}
          isLoading={false}
          filterParams={filterParams}
          tableSetting={false}
          disablePagination={true}
          removeScroll={true}
          removeSearch={true}
          handleFilterParams={setFilterParams}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderList;
