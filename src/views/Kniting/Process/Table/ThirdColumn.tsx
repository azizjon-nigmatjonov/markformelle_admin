const list = [
  {
    value: "1455 kg",
  },
  {
    value: "145 kg",
  },
  {
    value: "155 kg",
  },
  {
    value: "145 kg",
  },
];

const list2 = [
  {
    value: "120 kg",
  },
  {
    value: "90 ч",
  },
  {
    value: "10 ч",
  },
  {
    value: "70 ч",
  },
];

export const ThirdColumn = () => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="border-r border-[var(--gray30)] h-full container">
        <h2 className="font-semibold text-2xl pb-3">weight</h2>
        <ul className="grid grid-cols-1 gap-y-3 mt-2">
          {list.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-2xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full container">
        <h2 className="font-semibold text-2xl pb-3">hour</h2>
        <ul className="grid grid-cols-1 gap-y-3 mt-2">
          {list2.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-2xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
