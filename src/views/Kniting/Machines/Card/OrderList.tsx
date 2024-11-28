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
    },
    {
      title: "Артикул",
      id: "ART",
    },
    {
      title: "План",
      id: "KOL_KNIT",
    },
    {
      title: "Дата начала",
      id: "DATA_START",
      render: (val: string) => {
        return GetCurrentDate({
          date: val,
          type: "date",
        });
      },
    },
    {
      title: "Дата начала",
      id: "DATA_END",
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
    <div className="h-[550px] overflow-y-scroll designed-scroll">
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
          <img width={200} src="/images/no-data.png" alt="data" />
          <p>Нет информации</p>
        </div>
      ) : data.list?.length ? (
        <CTable
          headColumns={headColumns}
          bodyColumns={data.list}
          isResizeble={true}
          isLoading={false}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderList;
