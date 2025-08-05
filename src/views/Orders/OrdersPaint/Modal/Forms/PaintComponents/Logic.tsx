import { useQuery } from "react-query";
import request from "../../../../../../utils/request";
import { API_URL } from "../../../../../../utils/env";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useCallback, useMemo } from "react";

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
      keepPreviousData: true,
      staleTime: 1 * 60 * 1000,
      cacheTime: 2 * 60 * 1000,
    }
  );

  const createForm = useCallback(
    async (params: {}) => {
      try {
        const { data } = await axios.post(
          `${API_URL}/boyasiparisdetay/`,
          params
        );

        toast.success(t("created!"));
        closeFn();
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

  // Memoize the formData to prevent unnecessary re-renders
  const memoizedFormData = useMemo(() => {
    return formData?.BOYASIPARISDETAYID ? formData : defaultData;
  }, [formData, defaultData]);

  return {
    formData: memoizedFormData,
    isLoading,
    error,
    refetch,
    updateForm,
    createForm,
  };
};
