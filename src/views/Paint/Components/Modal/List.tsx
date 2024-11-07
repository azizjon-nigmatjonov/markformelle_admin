import { PantoneColors } from "../../../../constants/pantone";
import { GetCurrentDate } from "../../../../utils/getDate";
import "./style.scss";
import { ListDivider, Typography } from "@mui/joy";
export const PaintCardList = ({ element }: { element: any }) => {
  return (
    <div className="grid grid-cols-2">
      <ul className="grid grid-cols-1 paintlist text-[var(--gray)]">
        <li className="flex items-center justify-between py-2">
          <Typography>Название машины</Typography>{" "}
          <Typography>{element.name}</Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>capacity </Typography>{" "}
          <Typography>{element.capacity}</Typography>
        </li>

        <ListDivider sx={{ background: "var(--gray)" }} />
        <li className="flex items-center justify-between py-2">
          <Typography>Номер заказа </Typography>{" "}
          <Typography>{element.order}</Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Номер партия</Typography>{" "}
          <Typography>{element.partia_number}</Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Вес партия </Typography>{" "}
          <Typography>{element.partia_weiht} кг</Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Рецепт</Typography>{" "}
          <Typography>{element.recipt}</Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Время начала</Typography>{" "}
          <Typography>
            {GetCurrentDate({ type: "usually", date: element.start_time })}
          </Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Время окончания</Typography>{" "}
          <Typography>
            {" "}
            {GetCurrentDate({ type: "usually", date: element.end_time })}
          </Typography>
        </li>
        <ListDivider />
        <li className="flex items-center justify-between py-2">
          <Typography>Цвет</Typography>{" "}
          <Typography>{element.color_id}</Typography>
        </li>
      </ul>

      <div className="border-l border-[var(--gray30)] p-3 ml-10 flex justify-center flex-col items-center">
        <p className="text-2xl font-semibold leading-3 mb-5">PANTONE</p>
        <div className="w-full h-full flex justify-center">
          <div className="p-3 bg-white w-[80%] h-full border border-[var(--border)]">
            <div
              className="w-full h-[180px] bg-red-500"
              style={{
                backgroundColor: `#${PantoneColors[element.color_id]?.hex}`,
              }}
            ></div>
            <div className="p-3">
              <p className="text-2xl">{element.recipt}</p>
              <p className="text-2xl">{element.color_id}</p>
              <p className="text-2xl">{`${
                PantoneColors[element.color_id]?.name
              }`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
