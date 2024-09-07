import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import CCard from "../../../components/CElements/CCard";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems } from "./Logic";
import StatisticsGender from "./GenderRegions";
import Calendar from "./Calendar";

const DashboardAnalytics = () => {
  return (
    <div>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="container">
        <CCard>
          <StatisticsGender />
        </CCard>

       

        <CCard classes="mt-5">
          <Calendar />
        </CCard>

        {/* <CCard>
          <LineChart data={[]} />
        </CCard> */}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
