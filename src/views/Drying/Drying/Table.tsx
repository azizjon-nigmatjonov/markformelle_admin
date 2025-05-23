import { useEffect, useState } from "react";
import CCard from "../../../components/CElements/CCard";

import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
import { useTranslation } from "react-i18next";

interface Props {
  data: any;
}

export const DryTable = ({ data = [] }: Props) => {
  const { t } = useTranslation();
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
        <CNewTable
          title={t("table_chemicals")}
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
