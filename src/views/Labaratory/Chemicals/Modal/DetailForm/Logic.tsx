import axios from "axios";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
export const DetailFormLogic = ({
  refetchTable,
  formId,
  onClose = () => {},
}: {
  formId?: number;
  refetchTable: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData } = useQuery(
    ["GET_DETAIL_FORM", formId],
    () => {
      return axios.get(`${API_URL}/labreceteurun/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/labreceteurun/`, params);
      refetchTable();
      onClose();
      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(`error!`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/labreceteurun/${id}`,
        params
      );
      refetchTable();
      onClose();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: number[]) => {
    try {
      await axios.delete(`${API_URL}/labreceteurun/`, {
        method: "DELETE",
        url: `${API_URL}/labreceteurun/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success(t("deleted!"));
      refetchTable();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return { createForm, deleteFn, updateForm, formData: formData?.data };
};
