import CCard from "../../../../components/CElements/CCard";
import { CellCardWrapper } from "./Card";
import "./style.scss";
import { Skeleton } from "@mui/material";

interface Props {
  data: any;
  isLoading: boolean;
}

export const FirstColumn = ({ data = [], isLoading = true }: Props) => {
  if (isLoading) {
    return (
      <CCard classes="h-full remove-scroll">
        <Skeleton style={{ height: "150px" }} />
      </CCard>
    );
  }

  return (
    <CellCardWrapper
      data={data}
      title={`
          Готовые клетки
        `}
    />
  );
};
