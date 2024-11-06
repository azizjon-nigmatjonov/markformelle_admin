import { Header } from "../../components/UI/Header";
import { PaintList } from "./Components/List";

const PaintSection = () => {
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд покраска</h1>} />
      <PaintList />
    </>
  );
};

export default PaintSection;
