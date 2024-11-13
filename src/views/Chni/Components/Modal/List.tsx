import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { Divider, ListDivider } from "@mui/joy";
import CircularProgress from "../../../../components/CElements/CCircularProgress";
import "./style.scss";
export const ChniCardList = ({ machine }: { machine: any }) => {
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;

  const getWeight = (item: any) => {
    const num: any = Number(item.pkol_knit) - Number(item.fkol_knit) || 0;

    return Number(num.toFixed(2));
  };

  return (
    <div className="grid grid-cols-2">
      <ul
        className="grid grid-cols-1 paintlist text-[var(--black10)] mr-6 space-y-1 desktop:space-y-2"
        style={{
          fontSize: getFontSize({
            type: "machine",
            count: 1,
            percent:
              height > 1200 ? 2.5 : height < 800 && height > 600 ? 1.5 : 1.5,
          }),
        }}
      >
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Номер машины</p>
          <p>
            {machine.name} ({machine.id})
          </p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Название машины</p>
          <p>{machine.model}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Статус машины</p>
          <p>{machine.reason}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>IP адрес </p>
          <p>{machine.ip_address}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Версия программы </p>
          <p>{machine.soft_version}</p>
        </li>
        <ListDivider sx={{ background: "var(--gray)" }} />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Номер заказа </p>
          <p>{machine.zakaz}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Артикул </p>
          <p>{machine.art}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Лот пряжи </p>
          <p>{machine.lotno}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Мощность машины </p>
          <p>{machine.capacity}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>План </p>
          <p>№ {machine.nplan == undefined ? "0" : machine.nplan}</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Факт </p>
          <p>{machine.fkol_knit} кг</p>
        </li>
        <ListDivider />
        <li style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Остатка </p>
          <p>{getWeight(machine)} кг</p>
        </li>
        <ListDivider />
      </ul>

      <div className="border-l py-3 pr-6 pl-6 w-full flex justify-center items-center">
        <div
          className={`inline-block p-3 rounded-[12px] ${machine.new_status.color}`}
        >
          <CircularProgress
            strokeWidth={getFontSize({
              count: 6,
              percent: 6,
              type: "machine",
            })}
            value={
              Number(machine.fakt_percentage) > 100
                ? 100
                : Number(machine.fakt_percentage)
            }
            maxValue={100}
            size={getFontSize({
              count: 3,
              percent: 80,
              type: "machine",
            })}
          >
            <div
              className="flex flex-col items-center justify-center"
              style={{
                fontSize: getFontSize({
                  type: "machine",
                  count: 1,
                  percent: 2,
                }),
              }}
            >
              <p>{machine.fkol_knit}</p>
              <Divider
                orientation="horizontal"
                sx={{
                  height: 2,
                  backgroundColor: "gray",
                  opacity: 0.5,
                }}
                style={{ background: "black" }}
              />
              <p>{machine.pkol_knit + " Kg"}</p>
            </div>
          </CircularProgress>
        </div>
      </div>
    </div>
  );
};
