import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { ProcessTable } from "./Table";
const breadCrumbs = [{ label: "Дашборд грузчиков 612", link: "/row/loaders" }];
const KnittingProcess = () => {
  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      />
      <ProcessTable />
    </>
  );
};

export default KnittingProcess;
