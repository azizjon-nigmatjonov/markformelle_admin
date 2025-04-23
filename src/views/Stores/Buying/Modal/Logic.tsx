import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IFilterParams } from "../../../../interfaces";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_TEST_URL;

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`${API_URL}/uruntipi/?skip=0&limit=100`);
  });

  const { data: depo } = useQuery(["DET_DEPO"], () => {
    return axios.get(`${API_URL}/depo/?skip=0&limit=100`);
  });

  return {
    urunType: urunType?.data,
    depo: depo?.data,
  };
};

export const FetchTable = ({
  filterParams = {},
  id,
}: {
  filterParams: any;
  id?: any;
}) => {
  const { data: birimler, isLoading } = useQuery(
    ["GET_BIRIMLER", filterParams],
    () => {
      return axios.get(`${API_URL}/urunbirim/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  return { birimler: birimler?.data, isLoading };
};

export const FetchModal = ({
  formId,
  urunId,
  setFormId,
  getList = () => {},
}: {
  formId?: string;
  urunId?: any;
  getList?: () => void;
  setFormId: (val: string) => void;
}) => {
  const { data: modal, refetch: refetchForm } = useQuery(
    ["GET_IRSALIYE_FOR_MODAL", formId],
    () => {
      return axios.get(`${API_URL}/irsaliye/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );
  const [modalTable, setmodalTable]: any = useState({ data: {} });

  const getModalTable = () => {
    setmodalTable({ data: {} });
    axios
      .get(`${API_URL}/stokdetay/irsaliye/${formId}`)
      .then((res: { data: any }) => {
        setmodalTable(res.data);
      });
  };

  useEffect(() => {
    if (formId) {
      getModalTable();
    }
  }, [formId]);

  const { data: urunData } = useQuery(
    ["GET_URUN_FOR_IRSALIYE", urunId],
    () => {
      return axios.get(`${API_URL}/urun/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const createElement = async (params: Partial<any>) => {
    try {
      const { data } = await axios.post(`${API_URL}/irsaliye/`, params);

      setFormId(data.IRSALIYEID);
      getList();
      toast.success("Created!");
      return data;
    } catch (error) {
      console.error("Error creating element:", error);
      return null;
    }
  };

  const updateElement = async (params: Partial<any>) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/irsaliye/${params.IRSALIYEID}`,
        params
      );
      refetchForm();
      toast.success("Updated!");
      return data;
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };
  const deleteElement = async (id: any) => {
    try {
      const response = await axios.request({
        method: "DELETE",
        url: "http://10.40.14.193:8000/stokdetay/",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id, // Array of IDs
      });
      getModalTable();
      toast.success("Deleted successfully:", response.data);
    } catch (error) {
      getModalTable();
      toast.error(`Error creating element:, ${error}`);
    }
  };

  return {
    formData: modal?.data ?? {},
    tableData: modalTable,
    updateElement,
    createElement,
    urunData: urunData?.data ?? {},
    refetch: getModalTable,
    deleteElement,
  };
};

export const InnerModalLogic = ({
  formId,
  filterParams = {},
  filterParamsWeight = {},
  refetch = () => {},
  setOpen = () => {},
}: {
  formId?: string;
  filterParams?: any;
  filterParamsWeight: any;
  refetch: () => void;
  setOpen: (val: boolean) => void;
}) => {
  const [urunData, setUrunData]: any = useState({});
  const [urunBirim, setUrunBirim]: any = useState([]);

  const { data: formData } = useQuery(
    ["GET_URUNBIRIM_FORM", formId],
    () => {
      return axios.get(`${API_URL}/stokdetay/${formId}`);
    },
    {
      enabled: !!formId,
    }
  );

  const getUrun = (filters: IFilterParams) => {
    axios
      .get(
        `${API_URL}/urun/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setUrunData(res?.data);
      });
  };

  const getUrunBirim = (filters: any) => {
    axios
      .get(
        `${API_URL}/urunbirim/?skip=0&limit=100${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        const obj: any = {};
        const arr = [];
        for (let value of res?.data?.data) {
          if (!(value.BIRIMID in obj)) {
            obj[value.BIRIMID] = "";
            arr.push(value);
          }
        }
        setUrunBirim(arr);
      });
  };

  const createElement = async (params: any) => {
    try {
      const { data } = await axios.post(`${API_URL}/irsaliye/`, params);
      await refetch();

      return data;
    } catch (error) {
      console.error("Error creating element:", error);
      return null;
    }
  };

  const createStokElement = async (params: any) => {
    try {
      const { data } = await axios.post(`${API_URL}/stokdetay/`, params);
      await refetch();
      setOpen(false);
      return data;
    } catch (error) {
      console.error("Error creating element:", error);
      return null;
    }
  };

  const updateElement = (params: any, id: string) => {
    axios.put(`${API_URL}/stokdetay/${id}`, params).then(() => {
      setOpen(false);
      refetch();
    });
  };

  useEffect(() => {
    getUrun(filterParams);
  }, [filterParams]);

  useEffect(() => {
    getUrunBirim(filterParamsWeight);
  }, [filterParamsWeight]);

  return {
    urunData,
    urunBirim,
    createElement,
    createStokElement,
    updateElement,
    formData: formData?.data ?? {},
  };
};
