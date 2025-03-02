import { useState } from "react";
import CCard from "../../../components/CElements/CCard";
import CTable from "../../../components/CElements/CTable";

export const AllViewTable = () => {
  const [filterParams, setFilterParams]: any = useState({});
  const headColumns: any = [
    {
      title: "111",
      id: "name",
    },
    {
      title: "222",
      id: "age",
    },
  ];

  const bodyColumns = [
    {
      name: "Azizjon",
      age: 123,
    },
  ];

  const handleActions = () => {};

  return (
    <div>
      {" "}
      <CCard>
        <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          isResizeble={true}
          handleActions={handleActions}
          isLoading={false}
          filterParams={filterParams}
          tableSetting={false}
          handleFilterParams={setFilterParams}
        />
      </CCard>
    </div>
  );
};
