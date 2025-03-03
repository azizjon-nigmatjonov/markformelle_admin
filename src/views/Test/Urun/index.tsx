import { useState } from "react";

import CTabs from "../../../components/CElements/CTab";
import CSearchInput from "../../../components/CElements/CSearchInput";
import { UrunTab } from "./Urun";

const TabList = [
  {
    name: "Urun bilgileri",
    id: "info",
  },
  {
    name: "Birimler",
    id: "order",
  },
  {
    name: "Seviye bilgileri va urun notu",
    id: "order",
  },
  {
    name: "kimyasal bilgileri",
    id: "order",
  },
  {
    name: "bakim",
    id: "order",
  },
  {
    name: "donetim belgileri",
    id: "order",
  },
];

export const TanitimUrun = () => {
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });

  const handleSearch = () => {};

  return (
    <div className="min-h-[80vh] p-3">
      <div className="flex items-center space-x-2 mb-3">
        <span>Urun kodu</span>
        <CSearchInput
          handleChange={handleSearch}
          classes="bg-white"
          delay={500}
        />
      </div>
      <CTabs
        tabList={TabList}
        currentTab={currentTab}
        handleTabClick={setCurrentTab}
      />

      {currentTab.id === "urun" ? <UrunTab /> : ""}
    </div>
  );
};
