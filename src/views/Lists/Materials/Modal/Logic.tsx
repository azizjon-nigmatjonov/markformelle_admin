import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import toast from "react-hot-toast";
import { ModalTypes } from "../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalTableLogic = ({
  setFormId,
  hamId,
  defaultData,
  setOpen,
  refetchTable,
}: {
  hamId?: string;
  defaultData?: ModalTypes;
  setFormId: (val: string) => void;
  setOpen: (val: boolean) => void;
  refetchTable: () => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData, refetch } = useQuery(
    ["GET_HAM_DATA_FORM", hamId],
    () => {
      return axios.get(`${API_URL}/ham/${hamId}`);
    },
    {
      enabled: !!hamId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/ham/`, params);

      setFormId(data?.HAMID);
      setOpen(false);
      refetchTable();
      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(t("error"));

      return null;
    }
  };

  const updateForm = async (params: {}, id: string) => {
    try {
      const { data } = await axios.put(`${API_URL}/ham/${id}`, params);
      refetch();
      setOpen(false);
      refetchTable();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    updateForm,
    createForm,
    formData: formData?.data ? formData?.data : defaultData,
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
    ["GET_URUNBIRIM_FORM", formId],
    () => {
      return axios.get(`${API_URL}/urunbirim/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      await axios.post(`${API_URL}/urunbirim/`, params);
      toast.success(t("created_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      return null;
    }
  };

  const updateForm = async (params: {}, id: string | number) => {
    try {
      await axios.put(`${API_URL}/urunbirim/${id}`, params);
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
