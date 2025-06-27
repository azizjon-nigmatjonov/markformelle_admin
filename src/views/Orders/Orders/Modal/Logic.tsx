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

  return {
    setFormValues,
    setInitialFormValues,
  };
};

export const ModalTableLogic = ({
  setFormId,
  formId,
  defaultData,
}: {
  formId?: number | string;
  setFormId: (val: number) => void;
  defaultData?: any;
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

      setFormId(data?.LABRECETEID);
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
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urunbirim/`, {
        method: "DELETE",
        url: `${API_URL}/urunbirim/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
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
