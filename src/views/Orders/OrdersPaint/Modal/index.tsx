import { useState } from "react";
import { OrderForm } from "../../Orders/Modal/Form";
import { OrderModalBaseLogics } from "./Logic";
import { PaintTablesUI } from "./PaintTablesUI";
import { modalsActions } from "../../../../store/modal/modal.slice";
import { useDispatch } from "react-redux";

interface ModalUIProps {
  defaultData?: any;
  refetch: () => void;
}

export const OrderModalPartiCreate = ({
  refetch,
  defaultData = {
    BOYASIPARISKAYITID: 0,
  },
}: ModalUIProps) => {
  const dispatch = useDispatch();
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
    dispatch(
      modalsActions.setModalData({
        id: "order-paint",
        defaultData: {},
      })
    );
  };

  return (
    <div className="space-y-5 overflow-y-auto designed-scroll max-h-[calc(100vh-100px)]">
      <OrderForm
        handleModalActions={handleModalClose}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        formId={formId}
        setFormId={(val: number) => setFormId(val)}
        uniqueID={uniqueID}
      />

      <PaintTablesUI
        handleActionsTable={(obj: any, status: string, type: string) => {
          handleActionsTable(obj, status, type);
        }}
        currentMaterial={currentMaterial}
        setCurrentPaint={setCurrentPaint}
        uniqueID={uniqueID}
        formData={formData}
        currentPaint={currentPaint}
        formId={formId ?? 0}
        handleModalActions={handleModalActions}
      />
    </div>
  );
};
