import { Skeleton } from "@mui/material";
import CCard from "../../../../components/CElements/CCard";

interface Props {
  data: any;
  isLoading: boolean;
}

export const ThirdColumn = ({ data = [], isLoading = true }: Props) => {
  console.log(data);
  
  if (isLoading) {
    return (
      <CCard classes="h-full">
        <div className="grid grid-cols-1 gap-y-3">
          <Skeleton style={{ height: "150px" }} />
          <Skeleton style={{ height: "150px" }} />
        </div>
      </CCard>
    );
  }

  return <CCard classes="h-full">3</CCard>;
};
