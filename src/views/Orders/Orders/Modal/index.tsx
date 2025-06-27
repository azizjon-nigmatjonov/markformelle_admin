import { ModalTypes } from "../interfaces";
import { MaterialTable } from "../Tables/Material";
import { PaintTable } from "../Tables/Paint";
import { OrderForm } from "./Form";
import { MaterialForm } from "./Forms/MaterialForm";
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
  const [currentMaterial, setCurrentMaterial] = useState<any>({});
  const [currentPaint, setCurrentPaint] = useState<any>({});
  const [formId, setFormId] = useState<number | undefined>(undefined);
  const [uniqueID, setUniqueID] = useState("main_order_form");
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

  const handleActionsTable = (status: string, type: string) => {
    console.log(status, type);

    if (type === "material") {
      if (status === "modal") {
        setUniqueID("material_form");
      }
      if (status === "Close") {
        setUniqueID("main_order_form");
      }
      setCurrentMaterial(status);
    } else if (type === "paint") {
      setCurrentPaint(status);
    }
  };

  return (
    <div className="space-y-4 overflow-y-auto designed-scroll max-h-[calc(100vh-200px)]">
      <OrderForm
        defaultData={defaultData}
        handleModalActions={handleModalActions}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        uniqueID={uniqueID}
      />

      <MaterialTable
        handleActionsTable={(val: any, status: string) => {
          handleActionsTable(status, "material");
        }}
      />
      <div className="pt-8">
        <PaintTable
          handleActionsTable={(val: any) => {
            handleActionsTable(val, "paint");
          }}
        />
        <div className="grid grid-cols-2 gap-x-2 mt-12">
          <PaintTable
            handleActionsTable={(val: any) => {
              handleActionsTable(val, "paint");
            }}
          />
          <PaintTable
            handleActionsTable={(val: any) => {
              handleActionsTable(val, "paint");
            }}
          />
        </div>
      </div>

      {uniqueID === "material_form" && (
        <MaterialForm
          handleActions={(val: string) => {
            handleActionsTable(val, "material");
          }}
        />
      )}
    </div>
  );
};
