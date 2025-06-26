import { ModalTypes } from "../interfaces";
import { OrderForm } from "./Form";
import { ModalTableLogic } from "./Logic";
import { useState } from "react";

interface ModalUIProps {
  defaultData?: ModalTypes;
}

export const ModalUI = ({ defaultData = {} }: ModalUIProps) => {
  const [formId, setFormId] = useState<number | string | undefined>(undefined);
  const { createForm, updateForm, formData } = ModalTableLogic({
    formId: formId,
    defaultData,
    setFormId,
  });

  return (
    <>
      <OrderForm
        defaultData={defaultData}
        handleModalActions={handleModalActions}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
      />
    </>
  );
};
