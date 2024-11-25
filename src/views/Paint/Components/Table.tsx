import { useEffect, useState } from "react";
import CTable from "../../../components/CElements/CTable";
import CCard from "../../../components/CElements/CCard";

interface Props {
  list: any;
}

export const PaintTable = ({ list = [] }: Props) => {
  const [headColumns, setHeadColumns]: any = useState([
    {
      title: "index",
      id: "index",
      width: 40,
    },
  ]);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 10 });
  const [bodyColumns, setBodyColumns] = useState([]);

  useEffect(() => {
    if (!list?.length) return;

    setBodyColumns(list);
  }, [list]);

  useEffect(() => {
    if (!bodyColumns?.length) return;

    const obj: any = bodyColumns?.find((item: any) => item?.nres?.length) ?? {};
    delete obj.nres;
    const keys = Object.keys(obj);
    const newColumns: any = [...headColumns];
    keys?.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);
      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });
    setHeadColumns(newColumns);
  }, [bodyColumns]);
  return (
    <div className="p-2">
      <CCard classes="border-0" childClasses="p-0">
        <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          meta={{ totalCount: 60, pageCount: 5 }}
          isResizeble={true}
          isLoading={false}
          disablePagination={true}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
        />
      </CCard>
    </div>
  );
};
