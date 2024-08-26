import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems } from "./Logic";

const DashboardAnalytics = () => {
  return (
    <div>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>
    </div>
  );
};

export default DashboardAnalytics;
