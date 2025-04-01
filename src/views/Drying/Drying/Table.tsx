import { useEffect, useState } from "react";
import CCard from "../../../components/CElements/CCard";
import CTable from "../../../components/CElements/CTable";
import { IFilterParams } from "../../../interfaces";

interface Props {
  data: any;
}

export const DryTable = ({ data = [] }: Props) => {
  const [headColumns, setHeadColumns]: any = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 10,
    title: "Дашборд покраски",
  });

  useEffect(() => {
    if (!data?.length) return;

    const obj: any = data?.[0];

    const keys = Object.keys(obj);
    const newColumns: any = [];
    keys?.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);
      if (found?.id) {
        newColumns.push(found);
      } else {
        // newColumns.push({ title: key, id: key });
      }
    });
    setHeadColumns(newColumns);
  }, [data]);

  return (
    <div className="p-2">
      <CCard classes="border-0" childClasses="p-0">
        <CTable
          headColumns={headColumns}
          bodyColumns={data}
          meta={{ totalCount: 60, pageCount: 5 }}
          isResizeble={true}
          isLoading={false}
          disablePagination={true}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          clickable={true}
        />
      </CCard>
    </div>
  );
};
