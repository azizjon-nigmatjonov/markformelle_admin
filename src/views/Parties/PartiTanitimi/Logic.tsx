import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../../../utils/env";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../hooks/useTranslation";

export const breadCrumbs = [
  {
    label: "Parti",
    link: "/parties/list",
  },
];

export const TableData = ({
  filterParams = { page: 1, perPage: 50 },
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState<any[]>([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async (filters: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/parti/?skip=${
          filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
        }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
      return { data: [], count: 0 };
    }
  };

  const { data: listData, refetch } = useQuery(
    ["GET_PARTI_LIST", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.page,
      refetchOnWindowFocus: false,
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
      toast.error(`Error deleting order: ${error}`);
    }
  };

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  useEffect(() => {
    const arr: any = bodyData?.data ?? [];

    if (arr.length > 0) {
      const obj = { ...arr[0] };
      const keys = Object.keys(obj);
      const newColumns: any = [];

      keys.forEach((key: string) => {
        const found = headColumns.find((item: any) => item?.id === key);
        if (found?.id) {
          newColumns.push(found);
        } else {
          newColumns.push({ title: key, id: key });
        }
      });

      setHeadColumns(newColumns);
    }
  }, [bodyData]);

  const bodyColumns = useMemo(() => {
    const data = bodyData?.data ?? [];
    return data;
  }, [bodyData]);

  return {
    headColumns,
    bodyColumns,
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    deleteFn,
  };
};

interface UseTableHeadersProps {
  bodyColumns: any[];
  predefinedColumns?: any[];
}

export const useTableHeaders = ({
  bodyColumns,
  predefinedColumns = [],
}: UseTableHeadersProps) => {
  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) {
      return [];
    }
    const obj = { ...bodyColumns[0] };
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

export const FormLogic = ({
  refetchTable,
  formId,
  defaultData,
  setFormId,
}: {
  refetchTable: () => void;
  formId: number;
  defaultData: any;
  setFormId: (id: number) => void;
}) => {
  const { t } = useTranslationHook();

  const { data: formData } = useQuery(
    ["GET_PARTI_FORM", formId],
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
      toast.success(t("Parti created!"));
      setFormId(data.PARTIID);
      refetchTable();
      return data;
    } catch (error) {
      toast.error(`Error creating parti: ${error}`);
      return null;
    }
  };

  const updateForm = async (params: {}, id: number) => {
    try {
      const { data } = await axios.put(`${API_URL}/parti/${id}`, params);

      refetchTable();
      toast.success(t("Parti updated!"));
      return data;
    } catch (error) {
      toast.error(`Error updating parti: ${error}`);
      return null;
    }
  };

  const deleteForm = async (id: number[]) => {
    try {
      const { data } = await axios.delete(`${API_URL}/parti/`, {
        data: id,
      });
      refetchTable();
      toast.success(t("Parti deleted!"));
      return data;
    } catch (error) {
      toast.error(`Error deleting parti: ${error}`);
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
