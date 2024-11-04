import { CellCardWrapper } from "./Card";
import "./style.scss";

interface Props {
  data: any;
}

export const FirstColumn = ({ data = [] }: Props) => {
  return (
    <CellCardWrapper
      data={data}
      title={`
          Готовые клетки
        `}
    />
  );
};
