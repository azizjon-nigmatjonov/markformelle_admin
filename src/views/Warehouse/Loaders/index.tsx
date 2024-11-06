import { Header } from "../../../components/UI/Header";
import { ProcessTable } from "./Table";

const KnittingProcess = () => {
  return (
    <>
      <Header extra={<h1 className="title-header">Дашборд грузчиков 612</h1>} />
      <ProcessTable />
    </>
  );
};

export default KnittingProcess;
