import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../../../../utils/env";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import toast from "react-hot-toast";

export const PartyTransfersLogic = ({
  PARTIKAYITID,
}: {
  PARTIKAYITID: number;
}) => {
  const { t } = useTranslationHook();
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async () => {
    const response = await axios.get(
      `${API_URL}/partiasamalari/partikayitid/${PARTIKAYITID}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(["GET_PARTY_TRANSFERS", PARTIKAYITID], () => fetchList(), {
    keepPreviousData: true,
    enabled: !!PARTIKAYITID,
  });

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/partiasamalari/`, {
        method: "DELETE",
        url: `${API_URL}/partiasamalari/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      bodyData;
    }
  };

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  return {
    bodyColumns: listData,
    isLoading,
    defaultData: {},
    setBodyData,
    deleteFn,
    refetch,
  };
};

export const TransferFormLogic = ({
  formId,
  refetchTable,
  defaultData,
}: {
  formId: number;
  refetchTable: () => void;
  defaultData: any;
}) => {
  const { t } = useTranslationHook();

  const { data: formData } = useQuery(
    ["GET_PARTY_TRANSFERS_FORM", formId],
    () => {
      return axios.get(`${API_URL}/partiasamalari/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/partiasamalari/`, params);
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
      const { data } = await axios.put(
        `${API_URL}/partiasamalari/${id}`,
        params
      );

      refetchTable();
      toast.success(t("updated!"));
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    formData: formId ? formData?.data : defaultData,
    createForm,
    updateForm,
  };
};
