import React from "react";
import { Card, CardContent, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import useCQuery from "../../../../hooks/useCQuery";
import { Skeleton } from "@mui/material";

interface OrderListProps {
  machineName: string; // Define the type of machineId prop
}

const OrderList: React.FC<OrderListProps> = ({ machineName }) => {
  const { data: orderData, isLoading } = useCQuery({
    key: `GET_ORDER_LIST`,
    endpoint: `https://retoolapi.dev/VLMg5q/machines?machine_name={machineName}`,
    params: {
      // page: 1,
    },
    options: {
      enabled: !!machineName,
    },
  });

  return (
    <Sheet
      sx={{
        maxHeight: 500,
        paddingRight: 2,
        overflow: "auto",
        borderRadius: "sm",
      }}
    >
      {isLoading ? (
        <div>
          <Skeleton style={{ height: "200px" }} />
          <Skeleton style={{ height: "200px" }} />
          <Skeleton style={{ height: "200px" }} />
        </div>
      ) : (
        orderData.map((order: any) => (
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
    </Sheet>
  );
};

export default OrderList;
