const list = [
  {
    name: "Azizjon Nigmatjonov",
  },
  {
    name: "Sardor",
  },
  {
    name: "Sardor",
  },
  {
    name: "Sardor",
  },
  {
    name: "Sardor",
  },
];

export const SecondColumn = () => {
  return (
    <div className="border-r border-[var(--border)] h-full container">
      <h2 className="font-semibold text-2xl pb-3">List of workers</h2>
      <ul className="grid grid-cols-1 gap-y-2">
        {list.map((item: any, index: number) => (
          <li
            key={index}
            className="flex space-x-2 text-xl font-medium items-center"
          >
            <div>
              {index === 0 ? (
                <img
                  className="w-[40px]"
                  src="/images/medal_1.png"
                  alt="first"
                />
              ) : index === 1 ? (
                <img
                  className="w-[40px]"
                  src="/images/medal_2.png"
                  alt="second"
                />
              ) : index === 2 ? (
                <img
                  className="w-[40px]"
                  src="/images/medal_3.png"
                  alt="third"
                />
              ) : (
                <img
                  className="w-[40px]"
                  src="/images/danger.png"
                  alt={`last ${index}`}
                />
              )}
            </div>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
