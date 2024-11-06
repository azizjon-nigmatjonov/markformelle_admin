import { Header } from "../../components/UI/Header";
import { PaintList } from "./Components/List";
import { MockData } from "./Components/Logic";

const PaintSection = () => {
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд покраска</h1>} />
      <PaintList data={MockData} />
    </>
  );
};

export default PaintSection;
