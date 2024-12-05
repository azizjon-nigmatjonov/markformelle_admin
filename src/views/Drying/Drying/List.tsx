import { DryCard } from "../Components/Card";

export const DryList = () => {
  const list = [
    {
      pkol_knit: "123",
      color: "green",
      npan: "1111",
      ReceteId: "24-3434.32323",
      date_start: "13:00",
      date_end: "15:00",
      pantone_data: {
        name: "Spun Sugar",
        hex: "d9dbde",
      },
      nplan: "532",
      worked_date: "02:00",
    },
  ];
  return (
    <div className="p-2 grid grid-cols-5">
      {list.map((item, index: number) => (
        <DryCard key={index} element={item} />
      ))}
    </div>
  );
};
