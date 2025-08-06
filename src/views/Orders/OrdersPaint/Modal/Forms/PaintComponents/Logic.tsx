import { useQuery } from "react-query";
import request from "../../../../../../utils/request";
import { API_URL } from "../../../../../../utils/env";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useCallback } from "react";

export const PaintFormLogic = ({
  formId,
  defaultData,
  closeFn,
}: {
  formId: number | null;
  defaultData: any;
  closeFn: () => void;
}) => {
  const { t } = useTranslation();
  const {
    data: formData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["paintOrderDetail", formId],
    async () => {
      if (!formId) return null;
      const response: any = await request.get(
        `${API_URL}/boyasiparisdetay/${formId}`
      );
      return response;
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = useCallback(
    async (params: {}) => {
      try {
        const { data } = await axios.post(
          `${API_URL}/boyasiparisdetay/`,
          params
        );
        closeFn();
        toast.success(t("created!"));

        // refetchTable(data?.LABRECETEATISID);
        return data;
      } catch (error) {
        toast.error(`error!`);

        return null;
      }
    },
    [closeFn, t]
  );

  const updateForm = useCallback(
    async (params: {}, id: number) => {
      try {
        const { data } = await axios.put(
          `${API_URL}/boyasiparisdetay/${id}`,
          params
        );
        toast.success(t("updated!"));
        closeFn();
        // refetchTable(data?.LABRECETEATISID);

        return data;
      } catch (error) {
        toast.error(`Error creating element:, ${error}`);
        return null;
      }
    },
    [closeFn, t]
  );

  return {
    formData: formData?.BOYASIPARISDETAYID ? formData : defaultData,
    isLoading,
    error,
    refetch,
    updateForm,
    createForm,
  };
};
