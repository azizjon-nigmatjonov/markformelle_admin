import toast from "react-hot-toast";
import { API_URL } from "../../../../../utils/env";
import axios from "axios";
import { useTranslationHook } from "../../../../../hooks/useTranslation";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../../../store/modal/modal.slice";

export const PartiCreateLogics = ({ refetch }: { refetch: () => void }) => {
  const { t } = useTranslationHook();
  const dispatch = useDispatch();
  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/parti/`, params);
      dispatch(
        modalsActions.setModalData({ id: "partitanitimi", defaultData: data })
      );
      refetch();
      toast.success(t("created!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(`${API_URL}/parti/${id}`, params);

      refetch();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    createForm,
    updateForm,
  };
};
