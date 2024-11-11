import { Header } from "../../components/UI/Header";
import { ChniList } from "./Components/List";

const ChniDashboard = () => {
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд ЧНИ</h1>} />
      <ChniList />
    </>
  );
};

export default ChniDashboard;
