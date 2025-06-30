import { ModalTypes } from "../interfaces";
import { MaterialTable } from "../Tables/Material";
import { PaintTable } from "../Tables/Paint";
import { OrderForm } from "./Form";
import { MaterialForm } from "./Forms/MaterialForm";
import { PaintForm } from "./Forms/PaintForm";
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
  const [modalType, setModalType] = useState<boolean>(false);

  const { createForm, updateForm, formData } = ModalTableLogic({
    formId: formId,
    defaultData,
    setFormId,
  });

  useEffect(() => {
    if (formData?.BOYASIPARISKAYITID) {
      setFormId(formData?.BOYASIPARISKAYITID);
    } else {
    }
  }, [formData]);

  const handleModalActions = (status: string) => {
    if (status === "close") {
      setFormId(undefined);
      setOpen(false);
    }
  };

  const handleActionsTable = (obj: any, status: string, type: string) => {
    if (type === "material") {
      if (status === "view" || status === "edit") {
        setUniqueID("material_form");
        setCurrentMaterial(obj);
      }

      if (status === "modal") {
        setUniqueID("material_form");
        setCurrentMaterial({});
      }
      if (status === "Close") {
        setCurrentMaterial({});
        setUniqueID("main_order_form");
      }
    } else if (type === "paint") {
      if (status === "view" || status === "edit") {
        setUniqueID("paint_form");
        setCurrentPaint(obj);
      }
      if (status === "modal") {
        setUniqueID("paint_form");
        setCurrentPaint({});
      }
      if (status === "Close") {
        setUniqueID("main_order_form");
        setCurrentPaint({});
      }
    }
  };
  console.log("formId", formId);

  return (
    <div className="space-y-4 overflow-y-auto designed-scroll max-h-[calc(100vh-200px)]">
      <OrderForm
        handleModalActions={handleModalActions}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        uniqueID={uniqueID}
      />

      <MaterialTable
        handleActionsTable={(obj: any, status: string, type: string) => {
          handleActionsTable(obj, status, type);
        }}
        uniqueID={uniqueID}
        currentMaterial={currentMaterial}
        formId={formId ?? 0}
      />
      <div className="pt-5 pb-8">
        <PaintTable
          handleActionsTable={(obj: any, status: string) => {
            handleActionsTable(obj, status, "paint");
          }}
          formId={formId ?? 0}
        />
        <div className="grid grid-cols-2 gap-x-2 mt-5">
          <PaintTable
            handleActionsTable={(obj: any, status: string) => {
              handleActionsTable(obj, status, "paint");
            }}
            formId={formId ?? 0}
          />
          <PaintTable
            handleActionsTable={(obj: any, status: string) => {
              handleActionsTable(obj, status, "paint");
            }}
            formId={formId ?? 0}
          />
        </div>
      </div>

      {uniqueID === "paint_form" && (
        <PaintForm
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
    </div>
  );
};
