import { ModalDialog, ModalClose } from "@mui/joy";
import CTabs from "../../../components/CElements/CTab";
import { useState } from "react";
import useDeviceHeight from "../../../hooks/useDeviceHeight";
import { PaintCardList } from "../../Paint/Components/Modal/List";
import { OrderList } from "../../Chni/Components/Modal/Orders";

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

export const DryModal = ({ element, open = false }: Props) => {
  if (!open) return;
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });
  const { getFontSize } = useDeviceHeight();
  const GetUI = (tab: string) => {
    switch (tab) {
      case "order":
        return <OrderList />;
      default:
        return <PaintCardList element={element} />;
    }
  };

  return (
    <ModalDialog
      sx={{
        width:
          window?.screen?.height > 600 && window?.screen?.height < 800
            ? "70vw"
            : window?.screen?.width < 1440
            ? (90 / 100) * window?.screen?.width
            : window?.screen?.height > 1200
            ? (60 / 100) * window?.screen?.width
            : 1200,
        minHeight: getFontSize({
          count: 1,
          percent: window?.screen?.height > 1200 ? 100 : 60,
          type: "machine",
        }),
      }}
    >
      <ModalClose />

      <CTabs
        tabList={TabList}
        currentTab={currentTab}
        handleTabClick={setCurrentTab}
      />
      <div className="h-full">{GetUI(currentTab.id)}</div>
    </ModalDialog>
  );
};
