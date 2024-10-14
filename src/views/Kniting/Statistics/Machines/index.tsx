import { Header } from "../../../../components/UI/Header";
import CTabs from "../../../../components/CElements/CTab";
import { TabList } from "./Logic";
import { useState } from "react";
// import { MachineList } from "./Pages/List";
// import { MachineStatus } from "./Pages/Status";
// import { MachinePlans } from "./Pages/Plan";
// import { MachineDefects } from "./Pages/Defects";
// import { CPeriodPicker } from "../../../../components/CElements/CPeriodPicker";

const KnitingdAnalytics = () => {
  const [currentTab, setCurrentTab] = useState({ name: "", id: "list" });

  // const CurrentPage = (tab: string) => {
  //   switch (tab) {
  //     case "list":
  //       return <MachineList />;
  //     case "status":
  //       return <MachineStatus />;
  //     case "plan":
  //       return <MachinePlans />;
  //     case "defects":
  //       return <MachineDefects />;
  //     default:
  //       return <MachineList />;
  //   }
  // };

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
        {/* <CPeriodPicker handleValue={() => {}} placeholder="Время" /> */}
      </Header>

      {/* <div className="container">{CurrentPage(currentTab?.id)}</div> */}
    </div>
  );
};

export default KnitingdAnalytics;
