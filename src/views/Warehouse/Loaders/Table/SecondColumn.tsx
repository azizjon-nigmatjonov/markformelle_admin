import "./style.scss";
import { CellCardWrapper } from "./Card";

interface Props {
  data: any;
}

export const SecondColumn = ({ data = [] }: Props) => {
  return (
    <CellCardWrapper
      data={data}
      title={`   
          Пустые клетки
        `}
    />
  );
};
