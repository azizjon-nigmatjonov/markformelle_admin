import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { OneSkeleton } from "../../../../components/CElements/CSkeleton/OneSkeleton";

interface OrderListProps {
  machineName: number; // Define the type of machineId prop
}

const OrderList: React.FC<OrderListProps> = ({ machineName }) => {
  const [data, setData] = useState({ loading: true, list: [] });

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
          <Card key={order.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography>{`Order No: ${order.order_no}`}</Typography>
              <Typography>{`Artikul: ${order.artikul}`}</Typography>
              <Typography>{`Plan Kg: ${order.plan_kg}`} кг</Typography>
              <Typography>{`Starting Date: ${order.starting_date}`}</Typography>
              <Typography>{`Finishing Date: ${order.finishing_date}`}</Typography>
              <Typography>{`Closed: ${order.closed}`}</Typography>
            </CardContent>
          </Card>
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
