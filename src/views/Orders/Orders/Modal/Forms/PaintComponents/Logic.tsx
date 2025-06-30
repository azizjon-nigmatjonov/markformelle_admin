import { useQuery } from "react-query";
import request from "../../../../../../utils/request";
import { API_URL } from "../../../../../../utils/env";

export const PaintFormLogic = ({
  formId,
  defaultData,
}: {
  formId: number;
  defaultData: any;
}) => {
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

  return {
    formData: formData?.BOYASIPARISDETAYID ? formData : defaultData,
    isLoading,
    error,
    refetch,
  };
};
