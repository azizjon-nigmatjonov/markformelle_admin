import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { GetCurrentDate } from "../../../../utils/getDate";
import { IFilterParams } from "../../../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`http://10.40.14.193:8000/uruntipi/?skip=0&limit=100`);
  });

  const { data: depo } = useQuery(["DET_DEPO"], () => {
    return axios.get(`http://10.40.14.193:8000/depo/?skip=0&limit=100`);
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
      return axios.get(`http://10.40.14.193:8000/urunbirim/${id}`);
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
      return axios.get(`http://10.40.14.193:8000/irsaliye/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  const { data: modalTable, refetch } = useQuery(
    ["GET_IRSALIYE_TABLE", id],
    () => {
      return axios.get(`http://10.40.14.193:8000/stokdetay/irsaliye/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  const { data: urunData } = useQuery(
    ["GET_URUN_FOR_IRSALIYE", urunId],
    () => {
      return axios.get(`http://10.40.14.193:8000/urun/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const headColumns = useMemo(() => {
    return [
      { id: "STOKDETAYID", title: "STOKDETAYID" },
      { id: "URUNID", title: "URUNID" },
      { id: "URUNBIRIMID", title: "URUNBIRIMID" },
      { id: "KULLANICIID", title: "KULLANICIID" },
      { id: "MIKTAR", title: "MIKTAR" },
      {
        id: "DEGISIMTARIHI",
        title: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
    ];
  }, []);

  return {
    defaultData: modal?.data,
    tableData: modalTable?.data,
    headColumns,
    urunData: urunData?.data ?? {},
    refetch,
  };
};

export const InnerModalLogic = ({
  filterParams = {},
  refetch = () => {},
}: {
  filterParams?: any;
  refetch: () => void;
}) => {
  const [urunData, setUrunData]: any = useState({});
  const [urunBirim, setUrunBirim]: any = useState({});
  const getUrun = (filters: IFilterParams) => {
    axios
      .get(
        `http://10.40.14.193:8000/urun/?skip=${filters.page}&limit=${
          filters.perPage
        }${filters?.q ? "&" + filters.q : ""}}`
      )
      .then((res: any) => {
        setUrunData(res?.data);
      });
  };

  const getUrunBirim = () => {
    axios
      .get(`http://10.40.14.193:8000/urunbirim/?skip=0&limit=100`)
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

  useEffect(() => {
    getUrun(filterParams);
  }, [filterParams]);

  useEffect(() => {
    getUrunBirim();
  }, []);

  return {
    urunData,
    urunBirim,
    createElement,
  };
};
