import { useState } from "react";
import CTabs from "../../../components/CElements/CTab";
import { WebsiteColors } from "./Colors";
import { WebsiteImages } from "./Images";

const tabList = [
  {
    name: "Rasmlar",
    id: "images",
  },
  {
    name: "Ranglar",
    id: "colors",
  },
];

const WebsiteSettings = () => {
  const [tab, setTab] = useState({ id: "images" });

  const currentTabComponent = (tab: string) => {
    switch (tab) {
      case "images":
        return <WebsiteImages />;
      case "colors":
        return <WebsiteColors />;
      default:
        return "";
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="inline-block">
          <CTabs
            tabList={tabList}
            currentTab={tab}
            setCurrentTab={setTab}
            passRouter={false}
          />
        </div>

        {currentTabComponent(tab.id)}
      </div>
    </>
  );
};

export default WebsiteSettings;
