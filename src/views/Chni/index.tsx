import { useState } from "react";
import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";
import { ChniTable } from "./Components/Table";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { MachineConstantList } from "../../constants/machines";

const ChniDashboard = () => {
  const [type, setType] = useState("grid");
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд ЧНИ</h1>}>
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {type === "grid" ? (
        <ChniList />
      ) : (
        <ChniTable list={MachineConstantList.slice(0, 62)} />
      )}
    </>
  );
};

export default ChniDashboard;
