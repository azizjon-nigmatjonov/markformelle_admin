import CCard from "../../../../components/CElements/CCard";

const list = [
  {
    value: "1455 КГ",
  },
  {
    value: "1245 КГ",
  },
  {
    value: "1155 КГ",
  },
  {
    value: "1145 КГ",
  },
];

const list2 = [
  {
    value: "120 КГ",
  },
  {
    value: "110 КГ",
  },
  {
    value: "110 КГ",
  },
  {
    value: "70 КГ",
  },
];

export const ThirdColumn = () => {
  return (
    <div className="grid grid-cols-2 h-full space-x-3">
      <CCard title="C начала месяца">
        <ul className="grid grid-cols-1 gap-y-3 mt-2">
          {list.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-2xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </CCard>
      <CCard title="В это смене">
        <ul className="grid grid-cols-1 gap-y-3 mt-2">
          {list2.map((item: any, index: number) => (
            <li key={index} className="flex space-x-2 text-2xl font-medium">
              <p>{item.value}</p>
            </li>
          ))}
        </ul>
      </CCard>
    </div>
  );
};
