import { useState } from "react";
import { ModalTypes } from "../interfaces";
import { MaterialTable } from "../Tables/Material";
import { OrderForm } from "./Form";
import { OrderModalBaseLogics } from "./Logic";
import { PaintTablesUI } from "./PaintTablesUI";

interface ModalUIProps {
  defaultData?: ModalTypes;
}

export const OrderModal = ({
  defaultData = {
    BOYASIPARISKAYITID: 0,
  },
}: ModalUIProps) => {
  const [formId, setFormId] = useState<number>(0);
  const [currentKnitting, setCurrentKnitting] = useState<any>({});
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
    refetch: () => {},
    formId,
    setFormId,
  });

  const handleModalClose = (status: string) => {
    handleModalActions(status);
  };

  return (
    <div className="space-y-5 overflow-y-auto designed-scroll max-h-[calc(100vh-100px)]">
      <OrderForm
        handleModalActions={handleModalClose}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        uniqueID={uniqueID}
        formId={formId}
        setFormId={setFormId}
      />
      <div className="space-y-4">
        <MaterialTable
          title="Orme Siparis Detay Girisi"
          handleActionsTable={(obj: any, status: string, type: string) => {
            if (status === "view_single") {
              setCurrentKnitting(obj);
            } else {
              handleActionsTable(obj, status, type);
            }
          }}
          currentKnitting={currentKnitting}
          uniqueID={uniqueID}
          currentMaterial={currentMaterial}
          formId={formId ?? 0}
        />

        <PaintTablesUI
          title="Boya Siparis Detay Girisi"
          handleActionsTable={(obj: any, status: string, type: string) => {
            handleActionsTable(obj, status, type);
          }}
          currentKnitting={currentKnitting}
          setCurrentPaint={setCurrentPaint}
          uniqueID={uniqueID}
          currentPaint={currentPaint}
          formId={formId ?? 0}
        />
      </div>
    </div>
  );
};
