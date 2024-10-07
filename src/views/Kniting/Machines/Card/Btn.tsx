import { useState } from "react";
import CCheck from "../../../../components/CElements/CCheck";

const list = [
  {
    title: "Ремонт машины",
    value: 1,
  },
  {
    title: "Замена игла",
    value: 2,
  },
  {
    title: "Замена пряжи",
    value: 3,
  },
  {
    title: "Чистка машины",
    value: 4,
  },
  {
    title: "Нет пряжи",
    value: 5,
  },
  {
    title: "Нет плана",
    value: 6,
  },
];

export const ModalBtn = () => {
  const [checked, setCheked] = useState(1);
  return (
    <div className="grid grid-cols-2 gap-2">
      {list.map((item: any) => (
        <CCheck
          key={item.value}
          label={item.title}
          value={item.value}
          checked={checked}
          onClick={() => setCheked(item.value)}
        />
      ))}
    </div>
  );
};
