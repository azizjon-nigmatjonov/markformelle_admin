import { useMemo } from "react";
import { ModalUIPartiTanitimi } from "../../../../views/Parties/PartiTanitimi/Modal/Modal";
import { useSelector } from "react-redux";
import { OrderModal } from "../../../../views/Orders/Orders/Modal";

export const ModalList = () => {
  const modalData = useSelector((state: any) => state.modals.modalData);

  const modalDataMap = useMemo(() => {
    const map = new Map();
    modalData.forEach((modal: any) => {
      map.set(modal.id, modal.defaultData);
    });
    return map;
  }, [modalData]);

  const modals = useMemo(() => {
    return [
      {
        id: "partitanitimi",
        component: (
          <ModalUIPartiTanitimi
            defaultData={modalDataMap.get("partitanitimi")}
          />
        ),
      },
      {
        id: "boya",
        component: <OrderModal defaultData={modalDataMap.get("boya")} />,
      },
    ];
  }, [modalDataMap]);

  return { modals };
};
