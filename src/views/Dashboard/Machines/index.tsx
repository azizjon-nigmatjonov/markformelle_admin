import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import { breadCrumbItems } from "./Logic";
import CTabs from "../../../components/CElements/CTab";
import { TabList } from "./Logic";
import { useState } from "react";
import { MachineList } from "./Pages/List";
import { MachineStatus } from "./Pages/Status";
import { MachinePlans } from "./Pages/Plan";
import { MachineDefects } from "./Pages/Defects";

const DashboardAnalytics = () => {
  const [currentTab, setCurrentTab] = useState({ name: "", id: "list" });

  const CurrentPage = (tab: string) => {
    switch (tab) {
      case "status":
        return <MachineStatus />;
      case "plan":
        return <MachinePlans />;
      case "defects":
        return <MachineDefects />;
      default:
        return <MachineList />;
    }
  };

  return (
    <div>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <div className="container">
        <div className="inline-block">
          <CTabs
            tabList={TabList}
            currentTab={currentTab}
            handleTabClick={setCurrentTab}
          />
        </div>

        {CurrentPage(currentTab.id)}
        {/* <CCard>
          <StatisticsGender />
        </CCard>

        <CCard classes="mt-5">
          <Calendar />
        </CCard> */}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
