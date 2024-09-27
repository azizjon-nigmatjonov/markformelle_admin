const list = [
  {
    name: "Azizjon Nigmatjonov",
  },
];

export const SecondColumn = () => {
  return (
    <div className="border-r border-[var(--border)] h-full container">
      <h2 className="font-semibold text-2xl pb-3">List of workers</h2>
      <ul className="grid grid-cols-1 gap-y-2">
        {list.map((item: any, index: number) => (
          <li key={index} className="flex space-x-2 text-xl font-medium">
            <span>{index + 1}.</span>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
