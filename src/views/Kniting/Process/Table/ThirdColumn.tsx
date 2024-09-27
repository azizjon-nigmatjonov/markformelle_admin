const list = [
  {
    value: "1455 kg",
  },
];

const list2 = [
  {
    value: "120 ч",
  },
];

export const ThirdColumn = () => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="border-r border-[var(--border)] h-full container">
        <h2 className="font-semibold text-2xl pb-3">List of workers</h2>
        <ul className="grid grid-cols-1 gap-y-2">
          {list.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full container">
        <h2 className="font-semibold text-2xl pb-3">List of workers</h2>
        <ul className="grid grid-cols-1 gap-y-2">
          {list2.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
