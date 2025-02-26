import { useEffect, useMemo, useState } from "react";
import CTable from "../../../components/CElements/CTable";
import CCard from "../../../components/CElements/CCard";
import { GetCurrentDate } from "../../../utils/getDate";
interface Props {
  list: any;
}

export const ChniTable = ({ list }: Props) => {
  const [headColumns, setHeadColumns]: any = useState([]);
  const [filterParams, setFilterParams] = useState({ page: 1, perPage: 10 });
  const bodyColumns = useMemo(() => {
    if (!list?.length) return [];
    const arr: any = [];

    const newList: any = [...list];
    newList.forEach((element: any, index: number) => {
      arr.push({ index, ...element });
    });
    return arr;
  }, [list?.length]);

  useEffect(() => {
    const headCol: any = [{
      title: 'LastDateTime',
      id: 'LastDateTime',
      render: (val: string) => {
        return GetCurrentDate({date: val, type: 'usually'})
      }
    },
    {
      title: 'PrevDateTime',
      id: 'PrevDateTime',
      render: (val: string) => {
        return GetCurrentDate({date: val, type: 'usually'})
      }
    }];

    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headCol.find((item: any) => item.id === key);
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
