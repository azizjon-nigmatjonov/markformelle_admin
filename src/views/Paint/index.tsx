import { useState } from "react";
import { Header } from "../../components/UI/Header";
import { ToggleBtn } from "../../components/UI/ToggleBtn";
import { PaintList } from "./Components/List";
import { MockData } from "./Components/Logic";
import { PaintTable } from "./Components/Table";

const PaintSection = () => {
  const [type, setType] = useState("grid");
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд покраска</h1>}>
        <ToggleBtn type={type} setType={setType} />
      </Header>
      {type === "grid" ? (
        <PaintList data={MockData} />
      ) : (
        <PaintTable list={MockData} />
      )}
    </>
  );
};

export default PaintSection;
