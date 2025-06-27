import { ModalTypes } from "../interfaces";
import { MaterialTable } from "../Tables/Material";
import { PaintTable } from "../Tables/Paint";
import { OrderForm } from "./Form";
import { ModalTableLogic } from "./Logic";
import { useEffect, useState } from "react";

interface ModalUIProps {
  defaultData?: ModalTypes;
  setOpen: (open: boolean) => void;
}

export const OrderModal = ({
  defaultData = { BOYASIPARISKAYITID: 0 },
  setOpen,
}: ModalUIProps) => {
  const [formId, setFormId] = useState<number | undefined>(undefined);
  const { createForm, updateForm, formData } = ModalTableLogic({
    formId: formId,
    defaultData,
    setFormId,
  });

  useEffect(() => {
    if (defaultData?.BOYASIPARISKAYITID) {
      setFormId(defaultData?.BOYASIPARISKAYITID);
    }
  }, [defaultData]);

  const handleModalActions = (status: string) => {
    if (status === "close") {
      setFormId(undefined);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-5 overflow-y-auto designed-scroll h-[calc(100vh-200px)]">
      <OrderForm
        defaultData={defaultData}
        handleModalActions={handleModalActions}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
      />

      <MaterialTable />
      <div className="pt-10">
        <PaintTable />
      </div>
    </div>
  );
};
