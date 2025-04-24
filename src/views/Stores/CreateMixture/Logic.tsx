import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "chemicals_mixture_create", link: "/chemical_store/create_mixture" },
];

export const TableData = ({
  filterParams,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [headColumns, setHeadColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData]: any = useState({});

  const getList = (filters: IFilterParams) => {
    setIsLoading(true);
    axios
      .get(
        `${API_URL}/urunrecete-create/?skip=${
          filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
        }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
      )
      .then((res) => {
        setBodyData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getList(filterParams);
  }, [filterParams]);

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

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urunrecete/`, {
        method: "DELETE",
        url: `${API_URL}/urunrecete-create/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      getList(filterParams);
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`${t("error")}:, ${error}`);
      return null;
    }
  };

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

export const ModalTableLogic = ({
  urunId,
  setFormId,
}: {
  urunId?: string;
  setFormId: (val: string) => void;
}) => {
  const { t } = useTranslation();
  const { data: formData } = useQuery(
    ["GET_URUNRECETE_CREATE_FORM", urunId],
    () => {
      return axios.get(`${API_URL}/urunrecete-create/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/urunrecete/`, params);

      setFormId(data?.URUNRECETEURUNID);
      return data;
    } catch (error) {
      toast.error(`${t("error")}:, ${error}`);
      return null;
    }
  };

  return {
    createForm,
    formData: formData?.data ?? {},
  };
};

export const DetailsFormLogic = ({
  formId = "",
  setOpen = () => {},
  refetch,
}: {
  formId?: string | number;
  setOpen: (val: boolean) => void;
  refetch: () => void;
}) => {
  const { t } = useTranslationHook();
  const { data: formData } = useQuery(
    ["GET_URUNRECETEDETAY_FORM", formId],
    () => {
      return axios.get(`${API_URL}/urunrecetedetay/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      await axios.post(`${API_URL}/urunrecetedetay/`, params);
      toast.success(t("created_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      setOpen(false);
      refetch();
      return null;
    }
  };

  const updateForm = async (params: {}, id: string | number) => {
    try {
      await axios.put(`${API_URL}/urunrecetedetay/${id}`, params);
      toast.success(t("updated_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return { updateForm, createForm, formData: formData?.data };
};
