import { useState } from "react";
// import { ModalTypes } from "../interfaces";
import { OrderForm } from "../../Orders/Modal/Form";
import { OrderModalBaseLogics } from "./Logic";
import { PaintTablesUI } from "./PaintTablesUI";

interface ModalUIProps {
  defaultData?: any;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export const OrderModal = ({
  refetch,
  defaultData = {
    BOYASIPARISKAYITID: 0,
  },
  setOpen,
}: ModalUIProps) => {
  const [formId, setFormId] = useState<number>(0);
  const {
    currentMaterial,
    currentPaint,
    uniqueID,
    createForm,
    updateForm,
    formData,
    handleModalActions,
    handleActionsTable,
    setCurrentPaint,
  } = OrderModalBaseLogics({
    defaultData,
    refetch,
    formId,
    setFormId,
  });

  const handleModalClose = (status: string) => {
    handleModalActions(status);
    if (status === "close") {
      setOpen(false);
    }
  };

  return (
    <div className="space-y-3 overflow-y-auto designed-scroll max-h-[calc(100vh-200px)]">
      <OrderForm
        handleModalActions={handleModalClose}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        formId={formId}
        setFormId={(val: number) => {
          setFormId(val);
        }}
        uniqueID={uniqueID}
      />

      <PaintTablesUI
        handleActionsTable={(obj: any, status: string, type: string) => {
          handleActionsTable(obj, status, type);
        }}
        currentMaterial={currentMaterial}
        setCurrentPaint={setCurrentPaint}
        uniqueID={uniqueID}
        currentPaint={currentPaint}
        formId={formId ?? 0}
      />
    </div>
  );
};
