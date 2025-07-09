export const breadCrumbs = [
  {
    label: "Parti Asamalari",
    link: "/paint/orders",
  },
];

export const TableData = ({
  filterParams = { page: 1, perPage: 50 },
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/parti/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_PARTY_ORDERS", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.page,
    }
  );

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/parti/`, {
        method: "DELETE",
        url: `${API_URL}/parti/`,
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

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = { ...arr?.[0] };
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
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    deleteFn,
  };
};

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

interface UseTableHeadersProps {
  bodyColumns: any[];
  predefinedColumns?: any[];
}

export const useTableHeaders = ({
  bodyColumns,
  predefinedColumns = [],
}: UseTableHeadersProps) => {
  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [...predefinedColumns];

    keys.forEach((key: string) => {
      const found = newColumns.find((item: any) => item.id === key);
      if (!found?.id) {
        newColumns.push({ title: key, id: key });
      }
    });

    return newColumns;
  }, [bodyColumns, predefinedColumns]);

  return { newHeadColumns };
};

import axios from "axios";
import { API_URL } from "../../../utils/env";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../hooks/useTranslation";

export const FormLogic = ({
  refetchTable,
  formId,
  defaultData,
}: {
  refetchTable: () => void;
  formId: number;
  defaultData: any;
}) => {
  const { t } = useTranslationHook();

  const { data: formData } = useQuery(
    ["GET_PARTY_ORDERS_FORM", formId],
    () => {
      return axios.get(`${API_URL}/parti/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/parti/`, params);
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
      const { data } = await axios.put(`${API_URL}/parti/${id}`, params);

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
      const { data } = await axios.delete(`${API_URL}/parti/`, {
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

  return {
    updateForm,
    createForm,
    deleteForm,
    formData: formId ? formData?.data : defaultData,
  };
};
