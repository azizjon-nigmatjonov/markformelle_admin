import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { API_URL } from "../../../../utils/env";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { t } from "i18next";

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

export const TableData = ({
  filterParams = { page: 1, perPage: 50 },
  formId,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
  formId: number;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async (filters: any) => {
    setIsLoading(true);
    const response = await axios.get(
      `${API_URL}/partistok/?PARTIKAYITID=${formId}${
        filters.q ? "&" + filters.q : ""
      }`
    );
    setIsLoading(false);
    return response.data;
  };

  const fetchListSiparis = async () => {
    const response = await axios.get(`${API_URL}/parti/boyasiparis/${formId}`);

    return response.data;
  };

  const { data: listData, refetch } = useQuery(
    ["GET_ORDERS", filterParams, formId],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!formId,
    }
  );

  const {
    data: siparisData,
    refetch: siparisRefetch,
    isLoading: siparisIsLoading,
  } = useQuery(["GET_ORDERS_SIPARIS", formId], () => fetchListSiparis(), {
    keepPreviousData: true,
    enabled: !!formId,
  });

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/parti/`, {
        method: "DELETE",
        url: `${API_URL}/partistok/`,
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
    siparisData: siparisData ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    deleteFn,
    siparisIsLoading,
    siparisRefetch,
    refetch,
  };
};

export const CreateAsama = ({
  setOpenParti,
}: {
  setOpenParti: (val: boolean) => void;
}) => {
  const createAsama = async (formId: number) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/partiasamalari/partikayitid/${formId}?kullanici_id=1`
      );
      setOpenParti(true);
      toast.success(t("Parti asama!"));
      return data;
    } catch (error) {
      toast.error(`Error creating parti: ${error}`);
      return null;
    }
  };

  return { createAsama };
};

export const ProxyLogic = ({
  setOpenModal,
  setModalData,
  currentSiparis,
  refetchTable,
}: {
  setOpenModal: (val: boolean) => void;
  setModalData: (val: any) => void;
  currentSiparis: any;
  refetchTable: () => void;
}) => {
  const deleteProxy = async (data: any) => {
    const putProxy = async () => {
      const proxyId = currentSiparis?.PROXYID || data?.PROXYID;
      axios
        .get(`${API_URL}/partistok/${currentSiparis.PARTISINIFID}`)
        .then((res) => {
          axios
            .put(`${API_URL}/partistok/${currentSiparis.PARTISINIFID}`, {
              ...res.data,
              PROXYID: proxyId,
            })
            .then(() => {
              toast.success(
                t(`${proxyId} ${t("proxy_submitted_to_partistok")}`)
              );
              setModalData([]);
              setOpenModal(false);
              refetchTable();
            });
        });
    };

    if (data?.PARTIKAYITID) {
      axios.get(`${API_URL}/partistok/${data.PARTISINIFID}`).then((res) => {
        axios
          .put(`${API_URL}/partistok/${data.PARTISINIFID}`, {
            ...res.data,
            PROXYID: null,
          })
          .then(() => {
            putProxy();
          });
      });
    } else {
      putProxy();
    }
  };

  const checkProxy = async (value: string) => {
    axios
      .get(`${API_URL}/proxy/${value}`)
      .then(() => {})
      .catch((err) => {
        if (err.status === 404) {
          axios.post(`${API_URL}/proxy/`, {
            PROXYID: value,
          });
          toast.success(t("proxy_created_successfully"));
        }
      });

    axios.get(`${API_URL}/partistok/?PROXYID=${value}`).then((res) => {
      if (res?.data?.data?.length) {
        setOpenModal(true);
        setModalData(res?.data?.data);
        toast.error(t("proxy_used_inside_another_partistok"));
      } else {
        deleteProxy({ PROXYID: value });
      }
    });
  };

  return { checkProxy, deleteProxy };
};
