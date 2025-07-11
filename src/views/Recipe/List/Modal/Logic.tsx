import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalTableLogic = ({
  setFormId,
  urunId,
  setOpen,
  defaultData,
}: {
  urunId?: string;
  setFormId: (val: string) => void;
  setOpen: (val: string[]) => void;
  defaultData?: any;
}) => {
  const { t } = useTranslationHook();

  const { data: formData, refetch } = useQuery(
    ["GET_URUN_DATA_FORM", urunId],
    () => {
      return axios.get(`${API_URL}/recete/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const testForm = (_: string) => {};

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/recete/`, params);
      toast.success(t("created!"));
      setFormId(data?.URUNID);
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: string) => {
    try {
      const { data } = await axios.put(`${API_URL}/recete/${id}`, params);
      refetch();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteForm = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/recete/`, {
        method: "DELETE",
        url: `${API_URL}/recete/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      setOpen([]);
      toast.success(t("deleted_successfully"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    updateForm,
    createForm,
    deleteForm,
    testForm,
    formData: formData?.data?.RECETEID ? formData?.data : defaultData,
  };
};

export const DetailsFormLogic = ({
  formId = "",
  setOpen = () => {},
  refetch,
}: {
  formId?: string | number;
  setOpen: (val: boolean) => void;
  refetch: () => void;
}) => {
  const { t } = useTranslationHook();
  const { data: formData } = useQuery(
    ["GET_FORM_RECETE_", formId],
    () => {
      return axios.get(`${API_URL}/recete/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      await axios.post(`${API_URL}/recete/`, params);
      toast.success(t("created_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      return null;
    }
  };

  const updateForm = async (params: {}, id: string | number) => {
    try {
      await axios.put(`${API_URL}/recete/${id}`, params);
      toast.success(t("updated_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return { updateForm, createForm, formData: formData?.data };
};

export const TablesLogic = () => {
  const headColumnsTrail = [
    {
      title: "no",
      id: "no",
    },
  ];

  return { headColumnsTrail };
};
