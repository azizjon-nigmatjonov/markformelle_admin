import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IFilterParams } from "../../../../interfaces";
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

export const FetchModal = ({ id, urunId }: { id?: any; urunId?: any }) => {
  const { data: modal } = useQuery(
    ["GET_IRSALIYE_FOR_MODAL", id],
    () => {
      return axios.get(`${API_URL}/irsaliye/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  const [modalTable, setModalTable] = useState({ data: { data: [] } });

  const getTableData = () => {
    axios
      .get(`${API_URL}/stokdetay/irsaliye/${id}`)
      .then((res: { data: any }) => {
        setModalTable(res);
      })
      .catch(() => {
        setModalTable({ data: { data: [] } });
      });
  };

  useEffect(() => {
    if (id) {
      getTableData();
    }
  }, [id]);

  const { data: urunData } = useQuery(
    ["GET_URUN_FOR_IRSALIYE", urunId],
    () => {
      return axios.get(`${API_URL}/urun/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

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
      getTableData();
      console.log("Deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return {
    defaultData: modal?.data,
    tableData: modalTable?.data,
    urunData: urunData?.data ?? {},
    refetch: getTableData,
    deleteElement,
  };
};

export const InnerModalLogic = ({
  filterParams = {},
  filterParamsWeight = {},
  refetch = () => {},
  setOpen = () => {},
}: {
  filterParams?: any;
  filterParamsWeight: any;
  refetch: () => void;
  setOpen: (val: boolean) => void;
}) => {
  const [urunData, setUrunData]: any = useState({});
  const [urunBirim, setUrunBirim]: any = useState([]);
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
  };
};
