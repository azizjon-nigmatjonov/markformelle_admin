import { useParams } from "react-router-dom";
import { Header } from "../../../../components/UI/Header";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";

import CCard from "../../../../components/CElements/CCard";

const KnitingMachine = () => {
  const { id } = useParams();

  const breadCrumbItems = [
    { label: "kniting", link: "/kniting/analytics/machines" },
    { label: "kniting_machine", link: "/dashboard/dashboard" },
  ];

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true}  />}
      ></Header>
      <div className="container">
        <CCard title="Статистика по плану">{id}</CCard>
      </div>
    </>
  );
};

export default KnitingMachine;