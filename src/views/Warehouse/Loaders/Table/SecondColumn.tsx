import "./style.scss";
import CCard from "../../../../components/CElements/CCard";
import { Skeleton } from "@mui/material";
import { CellCardWrapper } from "./Card";

interface Props {
  isLoading: boolean;
  data: any;
}

export const SecondColumn = ({ isLoading = true, data = [] }: Props) => {
  if (isLoading) {
    return (
      <CCard classes="h-full">
        <Skeleton style={{ height: "150px" }} />
      </CCard>
    );
  }

  return <CellCardWrapper data={data} title="Пустые клетки" />;
};
