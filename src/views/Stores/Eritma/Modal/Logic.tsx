import axios from "axios";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import { GetCurrentDate } from "../../../../utils/getDate";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IFilterParams } from "../../../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const ModalTableLogic = ({
  setFormId,
  urunId,
  filterParams,
}: {
  urunId?: string;
  filterParams: IFilterParams;
  setFormId: (val: string) => void;
}) => {
  const { t } = useTranslationHook();
  const [bodyData, setBodyData]: any = useState({});

  const headColumns = useMemo(() => {
    return [
      { id: "URUNID", title: "URUNID" },
      { id: "URUNADI", title: "URUNADI" },
      { id: "CARPAN", title: "CARPAN" },
      { id: "BIRIMID", title: "BIRIMID" },
      { id: "BIRIMADI", title: "BIRIMADI" },
      { id: "INSERKULLANICIADI", title: "INSERKULLANICIADI" },
      { id: "KULLANICIID", title: "KULLANICIID" },
      {
        id: "INSERTTARIHI",
        title: "INSERTTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
      {
        id: "DEGISIMTARIHI",
        title: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
    ];
  }, []);

  const { data: formData, refetch } = useQuery(
    ["GET_URUN_DATA_FORM", urunId],
    () => {
      return axios.get(`${API_URL}/urun/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const getTableData = (filters?: IFilterParams) => {
    setBodyData({});
    if (!filters?.page)
      filters = {
        page: 1,
        perPage: 100,
      };

    axios
      .get(
        `${API_URL}/urunbirim/?URUNID=${urunId}&skip=${
          filters.page - 1
        }&limit=${filters.perPage}${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res) => {
        setBodyData(res.data);
      });
  };

  useEffect(() => {
    if (urunId) {
      getTableData(filterParams);
    }
  }, [urunId, filterParams]);

  const testForm = (_: string) => {};

  const createForm = async (params: {}) => {
    try {
      const { data } = await axios.post(`${API_URL}/urun/`, params);

      setFormId(data?.URUNID);
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);

      return null;
    }
  };

  const updateForm = async (params: {}, id: string) => {
    try {
      const { data } = await axios.put(`${API_URL}/urun/${id}`, params);
      refetch();
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urunbirim/`, {
        method: "DELETE",
        url: `${API_URL}/urunbirim/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success(t("deleted_successfully"));
      getTableData();
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  return {
    headColumns,
    tableData: bodyData ?? {},
    refetch: getTableData,
    updateForm,
    createForm,
    deleteFn,
    testForm,
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
    ["GET_URUNBIRIM_FORM", formId],
    () => {
      return axios.get(`${API_URL}/urunbirim/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const createForm = async (params: {}) => {
    try {
      await axios.post(`${API_URL}/urunbirim/`, params);
      toast.success(t("created_successfully"));
      setOpen(false);
      refetch();
    } catch (error) {
      return null;
    }
  };

  const updateForm = async (params: {}, id: string | number) => {
    try {
      await axios.put(`${API_URL}/urunbirim/${id}`, params);
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
