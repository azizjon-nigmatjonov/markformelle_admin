import { CellCardWrapper } from "./Card";

interface Props {
  data: any;
}

export const ThirdColumn = ({ data = [] }: Props) => {
  return (
    <CellCardWrapper
      data={data}
      title={`
          Нет в зоне
        `}
    />
  );
};
