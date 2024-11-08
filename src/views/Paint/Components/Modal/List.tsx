import { PantoneColors } from "../../../../constants/pantone";
import useDeviceHeight from "../../../../hooks/useDeviceHeight";
import { GetCurrentDate } from "../../../../utils/getDate";
import { ZigzagCard } from "./Card";
import "./style.scss";
import { ListDivider } from "@mui/joy";
export const PaintCardList = ({ element }: { element: any }) => {
  const bgColor = `#${PantoneColors[element.color_id]?.hex}`;
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
          <p>Номер машины</p> <p>{element.name}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Название машины</p> <p>Dilmenler</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Мощность машины</p> <p>{element.capacity}</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Статус машины</p> <p>Работает</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>IP адрес </p> <p>10.40.140.102</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Версия программы </p> <p>V3.8.4one</p>
        </li>

        <ListDivider sx={{ background: "var(--gray)" }} />

        <li className="flex items-center justify-between ">
          <p>Номер заказа </p> <p>{element.order}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Номер партия</p> <p>6236</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Вес партия </p> <p>1756 кг</p>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Артикул </p> <p>SJ-001.01.140</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Лот пряжи </p> <p>L-2</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Рецепт </p>{" "}
          <div className="flex space-x-3 items-center">
            <p>{element.recipt}</p>
            <div className="w-[1.5px] h-[20px] bg-[var(--gray)]"></div>
            <p>M0581-C34132.A</p>
          </div>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>ФИО сотрудника </p> <p>Сардор</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>Время начала</p>{" "}
          <p>{GetCurrentDate({ type: "usually", date: element.start_time })}</p>
        </li>
        <ListDivider />

        <li className="flex items-center justify-between ">
          <p>ФИО сотрудника </p> <p>Азиз</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Время начала</p> <p>2024.11.08 14:14</p>
        </li>

        <ListDivider />
        <li className="flex items-center justify-between ">
          <p>Время окончания</p> <p> 2024.11.08 21:00</p>
        </li>
      </ul>

      <div className="border-l py-3 pr-6 pl-6 w-full">
        <div className="w-[100%] h-full flex justify-center bg-white rounded-[12px] relative shadow-2xl overflow-hidden">
          <div className="h-full w-full flex flex-col items-center">
            <div className="text-2xl h-[100px] bg-white shadow-lg w-full mb-[-10px] relative z-[3] text-center  desktop:py-3">
              <p className="text-2xl font-medium">{element.recipt}</p>
              <p className="text-2xl font-medium">{element.color_id}</p>
              <p className="text-2xl font-medium">
                {PantoneColors[element.color_id]?.name}
              </p>
            </div>
            <ZigzagCard bgColor={bgColor} />
          </div>
        </div>
      </div>
    </div>
  );
};
