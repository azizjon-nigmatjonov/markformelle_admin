import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import useCQuery from "../../../../hooks/useCQuery";

interface Order {
  id: number;
  order_no: number;
  machine_id: number;
  artikul: string;
  pkol_knit: number;
  starting_date: string;
  finishing_date: string;
  closed: string;
}

interface OrderListProps {
  machineId: number; // Define the type of machineId prop
}

const OrderList: React.FC<OrderListProps> = ({ machineId }) => {
  // const [orderData, setOrderData] = useState<Order[]>([]);

  const { data: orderData, isLoading } = useCQuery({
    key: `GET_DRIVER_HOME`,
    endpoint: `https://retoolapi.dev/qAMz9q/data`,
    params: {
      // page: 1,
    },
    options: {
      enabled: !!machineId,
    },
  });

  // useEffect(() => {
  //   fetchOrderData(machineId); // Pass the machineId to fetchOrderData
  // }, [machineId]); // Re-fetch data when machineId changes

  // const fetchOrderData = async (machineId: number) => {
  //   try {
  //     const response = await fetch(
  //       `https://retoolapi.dev/VLMg5q/machines?machine_id=${machineId}`
  //     );
  //     const data: Order[] = await response.json();
  //     setOrderData(data);
  //   } catch (error) {
  //     console.error("Error fetching order data:", error);
  //   }
  // };

  return (
    <Sheet
      sx={{
        maxHeight: 500,
        paddingRight: 2,
        overflow: "auto",
        borderRadius: "sm",
      }}
    >
      {orderData.map((order: any) => (
        <Card key={order.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography>{`Order No: ${order.order_no}`}</Typography>
            <Typography>{`Artikul: ${order.artikul}`}</Typography>
            <Typography>{`Plan Kg: ${order.pkol_knit}`}</Typography>
            <Typography>{`Starting Date: ${order.starting_date}`}</Typography>
            <Typography>{`Finishing Date: ${order.finishing_date}`}</Typography>
            <Typography>{`Closed: ${order.closed}`}</Typography>
          </CardContent>
        </Card>
      ))}
    </Sheet>
  );
};

export default OrderList;
