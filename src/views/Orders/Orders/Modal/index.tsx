import { CollapseUI } from "../../../../components/CElements/CCollapse";
import { ModalTypes } from "../interfaces";
import { MaterialTable } from "../Tables/Material";
import { PaintTable } from "../Tables/Paint";
import { OrderForm } from "./Form";
import { ModalTableLogic } from "./Logic";
import { useEffect, useState } from "react";

interface ModalUIProps {
  defaultData?: ModalTypes;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export const OrderModal = ({
  refetch,
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
    refetchTable: refetch,
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
      if (status.includes("yarn")) {
        if (status.includes("view") || status.includes("edit")) {
          setUniqueID("paint_form_iplik");
          setCurrentPaint(obj);
        }
        if (status.includes("modal")) {
          setUniqueID("paint_form_iplik");
          setCurrentPaint({});
        }
      } else {
        if (status.includes("view") || status.includes("edit")) {
          setUniqueID("paint_form");
          setCurrentPaint(obj);
        }
        if (status.includes("modal")) {
          setUniqueID("paint_form");
          setCurrentPaint({});
        }
      }

      if (status.includes("Close")) {
        setUniqueID("main_order_form");
        setCurrentPaint({});
      }
    }
  };

  return (
    <div className="space-y-5 overflow-y-auto designed-scroll max-h-[calc(100vh-200px)]">
      <OrderForm
        handleModalActions={handleModalActions}
        createForm={createForm}
        updateForm={updateForm}
        formData={formData}
        uniqueID={uniqueID}
      />
      <div>
        <CollapseUI title="Orme Siparis Detay Girisi" disabled>
          <MaterialTable
            handleActionsTable={(obj: any, status: string, type: string) => {
              handleActionsTable(obj, status, type);
            }}
            uniqueID={uniqueID}
            currentMaterial={currentMaterial}
            formId={formId ?? 0}
          />
        </CollapseUI>
        <CollapseUI title="Boya Siparis Detay Girisi" disabled>
          <PaintTable
            title="Boya Siparis Detay Girisi"
            handleActionsTable={(obj: any, status: string) => {
              handleActionsTable(obj, status, "paint");
            }}
            uniqueID={uniqueID}
            currentPaint={currentPaint}
            formId={formId ?? 0}
          />
          <div className="grid grid-cols-2 gap-x-2 mt-3">
            <PaintTable
              handleActionsTable={(obj: any, status: string) => {
                handleActionsTable(obj, status, "paint");
              }}
              uniqueID={uniqueID}
              currentPaint={currentPaint}
              formId={formId ?? 0}
            />
            <PaintTable
              handleActionsTable={(obj: any, status: string) => {
                handleActionsTable(obj, status, "paint");
              }}
              uniqueID={uniqueID}
              currentPaint={currentPaint}
              formId={formId ?? 0}
            />
          </div>
        </CollapseUI>
      </div>
    </div>
  );
};
