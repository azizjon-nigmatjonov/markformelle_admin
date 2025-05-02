import { ChniCardList } from "./List";
import CTabs from "../../../../components/CElements/CTab";
import { useState } from "react";
import { OrderList } from "./Orders";

interface Props {
  element: any;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const TabList = [
  {
    name: "Информация о машине",
    id: "info",
  },
  {
    name: "Заказы в очереди",
    id: "order",
  },
];

export const ChniCardModal = ({ element, open = false }: Props) => {
  if (!open) return;
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });
  const GetUI = (tab: string) => {
    switch (tab) {
      case "order":
        return <OrderList />;
      default:
        return <ChniCardList machine={element} />;
    }
  };
  return (
    <>
      <CTabs
        tabList={TabList}
        currentTab={currentTab}
        handleTabClick={setCurrentTab}
      />
      <div className="h-full">{GetUI(currentTab.id)}</div>
    </>
  );
};
