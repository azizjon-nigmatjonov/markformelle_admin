import { ListDivider, Typography } from "@mui/joy";

export const OrderList = () => {
  return (
    <div className="flex flex-col overflow-y-scroll designed-scroll h-[500px] space-y-3">
      {Array.from(new Array(20)).map((item: number) => (
        <ul
          key={item}
          className="border border-[var(--border)] py-2 px-3 rounded-[12px] space-y-1"
        >
          <li className="flex items-center justify-between">
            <Typography>Номер заказа</Typography>
            <Typography>9547</Typography>
          </li>
          <ListDivider />
          <li className="flex items-center justify-between">
            <Typography>Артикул</Typography>
            <Typography>9547</Typography>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <Typography>План кг</Typography>
            <Typography>2900 кг</Typography>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <Typography>Артикул</Typography>
            <Typography>9547</Typography>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <Typography>Дата начала</Typography>
            <Typography>13.04.2024</Typography>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <Typography>Дата окончания</Typography>
            <Typography>22.04.2024</Typography>
          </li>
        </ul>
      ))}
    </div>
  );
};
