import CBreadcrumbs from "../../components/CElements/CBreadcrumbs";
import CCard from "../../components/CElements/CCard";
import { Header } from "../../components/UI/Header";
import { breadCrumbItems } from "./Logic";

const Dashboard = () => {
  return (
    <>
      <Header
        sticky={true}
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="container">
        <CCard title="statistics"></CCard>
      </div>
    </>
  );
};

export default Dashboard;
