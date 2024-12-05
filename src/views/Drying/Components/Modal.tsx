import { ModalDialog, ModalClose } from "@mui/joy";
import useDeviceHeight from "../../../hooks/useDeviceHeight";
import CTabs from "../../../components/CElements/CTab";
import { useState } from "react";
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
export const DryModal = () => {
  const { getFontSize } = useDeviceHeight();
  const [currentTab, setCurrentTab] = useState({ name: "", id: "info" });
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
      <div></div>
    </ModalDialog>
  );
};
