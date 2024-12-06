import { DryCard } from "../Components/Card";

interface Props {
  data: any;
}

export const DryList = ({ data = [] }: Props) => {
  return (
    <div className="p-2 grid grid-cols-6">
      {data.map((item: any, index: number) => (
        <DryCard key={index} element={item} />
      ))}
    </div>
  );
};
