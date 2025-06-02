import axios from "axios";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
export const MaterialFormLogic = ({
  refetchMaterial,
  formId,
  onClose = () => {},
}: {
  formId?: number;
  refetchMaterial: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData } = useQuery(
    ["GET_MATERIAL_FORM_", formId],
    () => {
      return axios.get(`${API_URL}/labrecetecalisma/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/labrecetecalisma/`, params);
      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(`error!`);
      refetchMaterial();
      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/labrecetecalisma/${id}`,
        params
      );
      refetchMaterial();
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
      await axios.delete(`${API_URL}/labrecetecalisma/`, {
        method: "DELETE",
        url: `${API_URL}/labrecetecalisma/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success(t("deleted!"));
      refetchMaterial();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    createForm,
    deleteFn,
    updateForm,
    formData: formId ? formData?.data : {},
  };
};
