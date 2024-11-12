import React, { useEffect, useState } from "react";
import { ListDivider } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

interface OrderListProps {
  machineName: number;
}

const OrderList: React.FC<OrderListProps> = ({ machineName }) => {
  const [data, setData] = useState({ loading: true, list: [] });
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;
  useEffect(() => {
    axios
      .get(
        `https://retoolapi.dev/VLMg5q/machines?machine_id=${machineName - 70}`
      )
      .then((res: any) => {
        setData({ list: res?.data ?? [], loading: false });
      })
      .catch(() => {
        setData({ list: [], loading: false });
      });
  }, []);

  return (
    <Sheet
      sx={{
        maxHeight: 500,
        paddingRight: 2,
        overflow: "auto",
        borderRadius: "sm",
      }}
    >
      {data.loading ? (
        <div>
          <OneSkeleton />
        </div>
      ) : (
        data.list?.map((order: any) => (
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
              <p>{order.order_no}</p>
            </li>
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Артикул</p>
              <p>{order.artikul}</p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>План кг</p>
              <p>{order.plan_kg}</p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Дата начала</p>
              <p>{order.starting_date}</p>
            </li>{" "}
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Дата окончания</p>
              <p>{order.finishing_date}</p>
            </li>
            <ListDivider />
            <li className="flex items-center justify-between">
              <p>Заказ закрыт</p>
              <p>{order.closed ? "Да" : "Нет"}</p>
            </li>
          </ul>
        ))
      )}
      {!data.loading && !data.list?.length ? (
        <div className="flex justify-center flex-col items-center h-full w-full">
          <img width={200} src="/images/no-data.png" alt="data" />
          <p>Нет информации</p>
        </div>
      ) : (
        ""
      )}
    </Sheet>
  );
};

export default OrderList;
