import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import toast from "react-hot-toast";
import { ModalTypes } from "../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalTableLogic = ({
  setFormId,
  KALITEID,
  defaultData,
  setOpen,
  refetchTable,
}: {
  KALITEID?: string;
  defaultData?: ModalTypes;
  setFormId: (val: string) => void;
  setOpen: (val: boolean) => void;
  refetchTable: () => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData, refetch } = useQuery(
    ["GET_ARTICUL_DATA_FORM", KALITEID],
    () => {
      return axios.get(`${API_URL}/kalite/${KALITEID}`);
    },
    {
      enabled: !!KALITEID,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/kalite/`, params);

      setFormId(data?.KALITEID);
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
      const { data } = await axios.put(`${API_URL}/kalite/${id}`, params);
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
