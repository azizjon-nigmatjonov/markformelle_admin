import { Skeleton } from "@mui/material";
import CCard from "../../../../components/CElements/CCard";
import { CellCardWrapper } from "./Card";

interface Props {
  data: any;
  isLoading: boolean;
}

export const ThirdColumn = ({ data = [], isLoading = true }: Props) => {
  if (isLoading) {
    return (
      <CCard classes="h-full">
        <Skeleton style={{ height: "150px" }} />
      </CCard>
    );
  }

  return <CellCardWrapper data={data} title="Клетки нет в зоне" />;
};
