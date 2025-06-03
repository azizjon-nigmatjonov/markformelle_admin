import axios from "axios";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
export const TrailFormLogic = ({
  refetchTable,
  formId,
}: // onClose = () => {},
{
  formId?: number;
  onClose?: () => void;
  refetchTable: (val?: number) => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData, refetch } = useQuery(
    ["GET_TRAIL_FORM_", formId],
    () => {
      return axios.get(`${API_URL}/labreceteatis/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/labreceteatis/`, params);

      toast.success(t("created!"));
      refetch();
      refetchTable(data?.LABRECETEATISID);
      return data;
    } catch (error) {
      toast.error(`error!`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/labreceteatis/${id}`,
        params
      );
      refetch();
      toast.success(t("updated!"));
      refetchTable();

      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: number[]) => {
    try {
      await axios.delete(`${API_URL}/labreceteatis/`, {
        method: "DELETE",
        url: `${API_URL}/labreceteatis/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetchTable();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return { createForm, deleteFn, updateForm, formData: formData?.data };
};
