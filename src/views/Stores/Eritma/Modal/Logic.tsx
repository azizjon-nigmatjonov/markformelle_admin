import axios from "axios";
import { useQuery } from "react-query";

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`http://10.40.14.193:8000/uruntipi/?skip=0&limit=100`);
  });

  const { data: depo } = useQuery(["DET_DEPO"], () => {
    return axios.get(`http://10.40.14.193:8000/depo/?skip=0&limit=100`);
  });

  const { data: boyaTipi } = useQuery(["GET_BOYA_TIPI_FOR_URUN"], () => {
    return axios.get(`http://10.40.14.193:8000/boyatipi/?skip=0&limit=100`);
  });

  const { data: unite } = useQuery(["GET_INITE_FOR_URUN"], () => {
    return axios.get(`http://10.40.14.193:8000/unite/?skip=0&limit=100`);
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
      return axios.get(`http://10.40.14.193:8000/urunbirim/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  return { birimler: birimler?.data, isLoading };
};
