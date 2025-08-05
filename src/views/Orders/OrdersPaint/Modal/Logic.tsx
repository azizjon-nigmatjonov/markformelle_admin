import axios from "axios";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
const API_URL = import.meta.env.VITE_TEST_URL;

// FormLogic wrapper function that can use hooks
export const FormLogic = () => {
  const setFormValues = (
    form: any,
    setValue: (name: string, value: any) => void
  ) => {
    setValue("FIRMAID", form.FIRMAID);
    setValue("INSERTKULLANICIADI", form.INSERTKULLANICIADI);
    setValue("NOTU", form.NOTU);
    setValue("SIPARISGRUPADI", form.SIPARISGRUPADI);
    setValue("BOYASIPARISTIPIADI", form.BOYASIPARISTIPIADI);
    setValue("FASON", form.FASON);
    setValue("SIPARISYILI", dayjs(form.SIPARISYILI).format("YYYY"));
    setValue("SIPARISTARIHI", dayjs(form.SIPARISTARIHI).format("DD.MM.YYYY"));
    setValue("BOYASIPARISKAYITID", form.BOYASIPARISKAYITID);
    setValue("BOYASIPARISID", form.BOYASIPARISID);
  };

  const setInitialFormValues = (
    setValue: (name: string, value: any) => void
  ) => {
    setValue("DOVIZID", "USD");
  };

  return { setFormValues, setInitialFormValues };
};

export const ModalTableLogic = ({
  setFormId,
  formId,
  defaultData,
  refetchTable,
}: {
  formId?: number | string;
  setFormId: (val: number) => void;
  defaultData?: any;
  refetchTable: () => void;
}) => {
  const { t } = useTranslationHook();
  const [formData, setFormData]: any = useState({});

  const refetch = () => {
    axios.get(`${API_URL}/boyasiparis/${formId}`).then((res: any) => {
      setFormData(res?.data);
    });
  };

  useEffect(() => {
    if (formId) {
      refetch();
    } else {
      setFormData({});
    }
  }, [formId]);

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/boyasiparis/`, params);

      setFormId(data?.BOYASIPARISKAYITID);
      refetchTable();
      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(`${API_URL}/boyasiparis/${id}`, params);
      refetch();
      refetchTable();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/boyasiparis/`, {
        method: "DELETE",
        url: `${API_URL}/urunbirim/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetchTable();
      toast.success(t("deleted_successfully"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    updateForm,
    createForm,
    deleteFn,
    formData: formData?.BOYASIPARISID ? formData : defaultData,
  };
};

export const OrderModalBaseLogics = ({
  defaultData,
  refetch,
  formId,
  setFormId,
}: {
  defaultData?: any;
  refetch: () => void;
  formId: number;
  setFormId: (val: number) => void;
}) => {
  const [currentMaterial, setCurrentMaterial] = useState<any>({});
  const [currentPaint, setCurrentPaint] = useState<any>({});
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
      setFormId(0);
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
      if (status === "view_single") {
        setCurrentPaint(obj);
        return;
      }
      if (status.includes("yarn")) {
        if (
          status !== "view_single" ||
          status.includes("view") ||
          status.includes("edit")
        ) {
          setUniqueID("paint_form_iplik");
          setCurrentPaint(obj);
        }
        if (status.includes("modal")) {
          setUniqueID("paint_form_iplik");
          setCurrentPaint({});
        }
      } else {
        if (
          status !== "view_single" ||
          status.includes("view") ||
          status.includes("edit")
        ) {
          setUniqueID("paint_form");
          // setCurrentPaint(obj);
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

  return {
    currentMaterial,
    currentPaint,
    setCurrentPaint,
    formId,
    uniqueID,
    createForm,
    updateForm,
    formData,
    handleModalActions,
    handleActionsTable,
  };
};
