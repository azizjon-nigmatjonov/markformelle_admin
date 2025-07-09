import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GetCurrentDate } from "../../../utils/getDate";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../hooks/useTranslation";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "chemicals_mixtures", link: "/chemical_store/mixtures" },
];

export const TableData = ({
  filterParams,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/urunrecete/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
    );
    return response.data;
  };

  const { data, refetch, isLoading } = useQuery(
    ["GET_MIXTURES_LIST", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data) setBodyData(data);
  }, [data]);

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
        url: `${API_URL}/urunrecete/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success("Muvaffaqiyatli amalga oshirildi!");
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
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
  const { t } = useTranslationHook();
  const headColumns = useMemo(() => {
    return [
      { id: "URUNID", title: "URUNID" },
      { id: "URUNADI", title: "URUNADI" },
      { id: "MIKTAR", title: "MIKTAR" },
      { id: "URUNBIRIMADI", title: "URUNBIRIMADI" },
      { id: "DEPOID", title: "DEPOID" },
      { id: "URUNRECETEURUNID", title: "URUNRECETEURUNID" },
      { id: "KULLANICIID", title: "KULLANICIID" },
      {
        id: "DEGISIMTARIHI",
        title: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
    ];
  }, []);

  const [bodyData, setBodyData]: any = useState({});
  const getDetay = () => {
    setBodyData({});
    axios
      .get(`${API_URL}/urunrecetedetay/?URUNRECETEURUNID=${urunId}`)
      .then((res) => {
        setBodyData(res.data);
      });
  };

  useEffect(() => {
    if (urunId) {
      getDetay();
    }
  }, [urunId]);

  const { data: formData } = useQuery(
    ["GET_URUNRECETE_FORM", urunId],
    () => {
      return axios.get(`${API_URL}/urunrecete/${urunId}`);
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
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const updateForm = async (params: {}, id: string) => {
    try {
      const { data } = await axios.put(`${API_URL}/urunrecete/${id}`, params);

      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urunrecetedetay/`, {
        method: "DELETE",
        url: `${API_URL}/urunrecetedetay/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success(t("deleted_successfully"));
      getDetay();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    headColumns,
    tableData: bodyData ?? {},
    refetch: getDetay,
    updateForm,
    createForm,
    deleteFn,

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
