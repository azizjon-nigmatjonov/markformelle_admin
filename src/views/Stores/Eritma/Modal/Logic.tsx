import axios from "axios";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`${API_URL}/uruntipi/?skip=0&limit=100`);
  });

  const { data: depo } = useQuery(["DET_DEPO"], () => {
    return axios.get(`${API_URL}/depo/?skip=0&limit=100`);
  });

  const { data: boyaTipi } = useQuery(["GET_BOYA_TIPI_FOR_URUN"], () => {
    return axios.get(`${API_URL}/boyatipi/?skip=0&limit=100`);
  });

  const { data: unite } = useQuery(["GET_INITE_FOR_URUN"], () => {
    return axios.get(`${API_URL}/unite/?skip=0&limit=100`);
  });

  return {
    urunType: urunType?.data,
    depo: depo?.data,
    boyaTypes:
      boyaTipi?.data?.data?.map((item: any) => {
        return {
          label: item.ADI,
          value: item.BOYATIPIID,
        };
      }) ?? [],
    uniteOptions:
      unite?.data?.data?.map((item: any) => {
        return {
          label: item.ADI,
          value: item.UNITEID,
        };
      }) ?? [],
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
