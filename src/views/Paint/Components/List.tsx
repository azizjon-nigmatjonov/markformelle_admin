import { PaintPotCard } from "./Card";

interface Props {
  data: any;
}

export const PaintList = ({ data = [] }: Props) => {
  return (
    <div className="p-2">
      <div
        className="grid grid-cols-6 grid-rows-6 gap-2"
        style={{
          minWidth:
            window?.screen?.width < 940
              ? "1600px"
              : window?.screen?.width - 200,
        }}
      >
        {data?.map((item: any, index: number) => (
          <PaintPotCard key={index} element={item ?? {}} />
        ))}
      </div>
    </div>
  );
};
