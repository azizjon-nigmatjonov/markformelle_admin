import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { ZigzagCard } from "./Card";
import "./style.scss";
import { ListDivider } from "@mui/joy";
export const PaintCardList = ({ element = {} }: { element: any }) => {
  let bgColor = element.machine?.pantone_data?.hex ?? "not_found";
  bgColor = "#" + bgColor;
  const { getFontSize } = useDeviceHeight();
  const height = window?.screen?.height ?? 0;

  return (
    <div className="grid grid-cols-2">
      <ul
        className={`grid grid-cols-1 paintlist text-[var(--black10)] mr-6 space-y-1 desktop:space-y-2`}
        style={{
          fontSize: getFontSize({
            type: "machine",
            count: 1,
            percent:
              height > 1200 ? 2.5 : height < 800 && height > 600 ? 1.5 : 1.5,
          }),
        }}
      >
        <li className="flex items-center justify-between ">
          <p>Номер машины</p> <p>{element.code_device}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Название машины</p> <p>{element.name_device}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Мощность машины</p> <p>-</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Статус машины</p> <p>{element.status.text}</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>IP адрес </p>{" "}
          <p>{element.ip === "EMPTY" ? element.status.text : element.ip}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Версия программы </p> <p>-</p>
        </li>

        <ListDivider sx={{ background: "var(--gray)" }} />

        <li className="flex items-center justify-between ">
          <p>Номер заказа </p> <p>{element.machine?.BoyaSiparisIDStr}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Номер партия</p> <p>{element.machine?.PartiIDStr}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Вес партия </p> <p>{element.machine?.pkol_knit} кг</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Артикул </p>{" "}
          <p className="w-3/4 text-right">{element.machine?.name}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Лот пряжи </p> <p>-</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Рецепт </p>{" "}
          <div className="flex space-x-3 items-center">
            {/* <p>{element.recipt}</p> */}
            {/* <div className="w-[1.5px] h-[20px] bg-[var(--gray)]"></div> */}
            <p>{element.machine?.ReceteId}</p>
          </div>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>ФИО сотрудника </p> <p>{element.machine?.GirisPersonelAdi}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Время начала</p> <p>{element.machine?.date_start}</p>
        </li>
        <ListDivider />

        {/* <li className="flex items-center justify-between ">
          <p>ФИО сотрудника </p> <p>Азиз</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Время начала</p> <p>2024.11.08 14:14</p>
        </li>
           <ListDivider />
        */}

        <li className="flex items-center justify-between ">
          <p>Время окончания</p> <p> {element.machine?.date_end}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Рабочее время</p> <p> {element.machine?.worked_date}</p>
        </li>
      </ul>

      <div className="border-l py-3 pr-6 pl-6 w-full">
        {element.machine?.pantone && (
          <div className="w-[100%] h-full flex justify-center bg-white rounded-[12px] relative shadow-2xl overflow-hidden">
            <div className="h-full w-full flex flex-col items-center">
              <div className="text-2xl h-[100px] bg-white shadow-lg w-full mb-[-10px] relative z-[3] text-center  desktop:py-3">
                <p className="text-2xl font-medium">
                  {element.machine?.ReceteId}
                </p>
                <p className="text-2xl font-medium">
                  {element.machine?.pantone}
                </p>
                <p className="text-2xl font-medium">
                  {element?.machine?.pantone_data?.name || "-"}
                </p>
              </div>
              <ZigzagCard bgColor={bgColor} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
