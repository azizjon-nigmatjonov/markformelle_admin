import { Header } from "../../../../components/UI/Header";
import CTabs from "../../../../components/CElements/CTab";
import { TabList } from "./Logic";
import { useState } from "react";
import { MachineList } from "./Pages/List";
import { MachineStatus } from "./Pages/Status";
import { MachinePlans } from "./Pages/Plan";
import { MachineDefects } from "./Pages/Defects";
import { CPeriodPicker } from "../../../../components/CElements/CPeriodPicker";

const knittingdAnalytics = () => {
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
        extra={
          <div className="inline-block">
            <CTabs
              tabList={TabList}
              currentTab={currentTab}
              handleTabClick={setCurrentTab}
            />
          </div>
        }
      >
        <CPeriodPicker handleValue={() => {}} placeholder="Время" />
      </Header>

      <div className="p-2">{CurrentPage(currentTab.id)}</div>
    </div>
  );
};

export default knittingdAnalytics;
