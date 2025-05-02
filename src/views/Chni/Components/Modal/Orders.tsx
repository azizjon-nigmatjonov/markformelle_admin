import { ListDivider } from "@mui/joy";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";

export const OrderList = () => {
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;
  return (
    <div className="flex flex-col overflow-y-scroll designed-scroll space-y-3 h-[650px] mt-5">
      {Array.from(new Array(20)).map((item: number) => (
        <div
          key={item}
          className="border border-[var(--border)] py-2 px-3 rounded-[12px] space-y-1 text-[var(--black10)]"
          style={{
            fontSize: getFontSize({
              type: "machine",
              count: 1,
              percent:
                height > 1200 ? 2.5 : height < 800 && height > 600 ? 1.5 : 1.5,
            }),
          }}
        >
          <li className="flex items-center justify-between">
            <p>Номер заказа</p>
            <p>9547</p>
          </li>
          <ListDivider />
          <li className="flex items-center justify-between">
            <p>Артикул</p>
            <p>9547</p>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <p>План кг</p>
            <p>2900 кг</p>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <p>Артикул</p>
            <p>9547</p>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <p>Дата начала</p>
            <p>13.04.2024</p>
          </li>{" "}
          <ListDivider />
          <li className="flex items-center justify-between">
            <p>Дата окончания</p>
            <p>22.04.2024</p>
          </li>
        </div>
      ))}
    </div>
  );
};
