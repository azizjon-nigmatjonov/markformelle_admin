import { ModalDialog, ModalClose } from "@mui/joy";
import { PaintCardList } from "./List";
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

export const PaintCardModal = ({
  // setOpen = () => {},
  element,
  open = false,
}: Props) => {
  if (!open) return;
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });
  const GetUI = (tab: string) => {
    switch (tab) {
      case "order":
        return <OrderList />;
      default:
        return <PaintCardList element={element} />;
    }
  };
  return (
    <ModalDialog sx={{ minWidth: 800, minHeight: 430 }}>
      <ModalClose />

      <CTabs
        tabList={TabList}
        currentTab={currentTab}
        handleTabClick={setCurrentTab}
      />
      <div>{GetUI(currentTab.id)}</div>
    </ModalDialog>
  );
};
