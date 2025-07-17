import { useMemo, useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { RezerveTableLogic } from "./Logic";
import { useTableHeaders } from "../Logic";

export const RezervTable = ({ PARTIKAYITID }: { PARTIKAYITID: number }) => {
  const [filterParams, setFilterParams] = useState({});
  const { bodyColumns, isLoading } = RezerveTableLogic({
    PARTIKAYITID,
  });

  const predefinedColumns = useMemo(() => {
    return [
      {
        title: "ASAMAID",
        id: "ASAMAID",
      },
    ];
  }, []);

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });

  return (
    <CNewTable
      title="Rezerve"
      headColumns={newHeadColumns?.length ? newHeadColumns : []}
      innerTable={true}
      bodyColumns={bodyColumns?.length ? bodyColumns : []}
      handleActions={() => {}}
      isLoading={isLoading}
      autoHeight="250px"
      disablePagination={true}
      handleFilterParams={(params: any) => {
        setFilterParams(params);
      }}
      filterParams={filterParams}
    />
  );
};
