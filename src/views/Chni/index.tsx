import { useState } from "react";
import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";
import { ChniTable } from "./Components/Table";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { MachineConstantList } from "../../constants/machines";
import { ChniMachines } from "./Logic";
import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
const breadCrumbs = [{ label: "Дашборд ЧНИ", link: "/chni/dashboard" }];
const ChniDashboard = () => {
  const [type, setType] = useState("grid");

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      >
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {type === "grid" ? (
        <ChniList list={ChniMachines} />
      ) : (
        <ChniTable list={MachineConstantList.slice(0, 62)} />
      )}
    </>
  );
};

export default ChniDashboard;
