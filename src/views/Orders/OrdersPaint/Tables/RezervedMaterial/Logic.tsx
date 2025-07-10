import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../../../utils/env";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../../hooks/useTranslation";

export const MaterialTableLogic = ({ filterParams }: { filterParams: any }) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/boyasiparisrezerv/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&BOYASIPARISDETAYID=${filters.BOYASIPARISDETAYID}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_REZERVE_LIST", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.BOYASIPARISDETAYID,
    }
  );
  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/ormesiparisdetay/`, {
        method: "DELETE",
        url: `${API_URL}/ormesiparisdetay/`,
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
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = {
      ...arr?.[0],
    };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setTimeout(() => {
      setHeadColumns(newColumns);
    }, 0);
  }, [bodyData]);

  return {
    bodyData,
    isLoading,
    refetch,
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    deleteFn,
  };
};

export const RezervingLogics = ({
  refetch = () => {},
}: {
  refetch: () => void;
}) => {
  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/boyasiparisrezerv/`,
        params
      );
      refetch();
      return data;
    } catch (error) {
      refetch();
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/boyasiparisrezerv/${id}`,
        params
      );
      refetch();
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/boyasiparisrezerv/`, {
        method: "DELETE",
        url: `${API_URL}/boyasiparisrezerv/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    createForm,
    updateForm,
    deleteFn,
  };
};
