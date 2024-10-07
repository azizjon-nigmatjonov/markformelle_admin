import { useState } from "react";

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
        <div
          key={item}
          className={`border rounded-[8px] px-3 h-[40px] flex items-center justify-center cursor-pointer ${
            checked === item.value
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-[var(--gray30)]"
          }`}
          onClick={() => setCheked(item.value)}
        >
          <p
            className={`${
              checked === item.value ? "text-white" : "text-[var(--gray)]"
            }`}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};
