import { useState } from "react";
import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";
import { ChniTable } from "./Components/Table";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { MachineConstantList } from "../../constants/machines";
import { ChniMachines } from "./Logic";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import GlobalSearch from "../../components/UI/GlobalSearch";
const breadCrumbs = [{ label: "Дашборд ЧНИ", link: "/chni/dashboard" }];
const ChniDashboard = () => {
  const [type, setType] = useState("grid");
  const [list, setList] = useState([...ChniMachines]);
  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <div className="mr-3">
          <GlobalSearch list={ChniMachines ?? []} setList={setList} />
        </div>
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {type === "grid" ? (
        <ChniList list={list} />
      ) : (
        <ChniTable list={MachineConstantList.slice(0, 62)} />
      )}
    </>
  );
};

export default ChniDashboard;
