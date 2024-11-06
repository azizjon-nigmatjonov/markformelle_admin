import { useParams } from "react-router-dom";
import { Header } from "../../../../components/UI/Header";
import CBreadcrumbs from "../../../../components/CElements/CBreadcrumbs";

import CCard from "../../../../components/CElements/CCard";

const knittingMachine = () => {
  const { id } = useParams();

  const breadCrumbItems = [
    { label: "knitting", link: "/knitting/analytics/machines" },
    { label: "knitting_machine", link: "/dashboard/dashboard" },
  ];

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>
      <div className="p-2">
        <CCard title="Статистика по плану">{id}</CCard>
      </div>
    </>
  );
};

export default knittingMachine;
