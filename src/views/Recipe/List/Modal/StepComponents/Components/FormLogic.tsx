import axios from "axios";
import { API_URL } from "../../../../../../utils/env";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../../../../hooks/useTranslation";

export const FormLogic = ({ refetchTable }: { refetchTable: () => void }) => {
  const { t } = useTranslationHook();
  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/recetedetay/`, params);
      toast.success(t("created!"));
      refetchTable();
      return data;
    } catch (error) {
      toast.error(`error!`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(`${API_URL}/recetedetay/${id}`, params);

      refetchTable();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteForm = async (id: number[]) => {
    try {
      const { data } = await axios.delete(`${API_URL}/recetedetay/`, {
        data: id,
      });
      refetchTable();
      toast.success(t("deleted!"));
      return data;
    } catch (error) {
      toast.error(`Error deleting element:, ${error}`);
      return null;
    }
  };

  return { updateForm, createForm, deleteForm };
};
