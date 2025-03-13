import axios from "axios";
import { useQuery } from "react-query";

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

export const FetchTable = ({ filterParams = {} }: { filterParams: any }) => {
  const { data: birimler, isLoading } = useQuery(
    ["GET_BIRIMLER", filterParams],
    () => {
      return axios.get(
        `http://10.40.14.193:8000/urunbirim/?skip=${
          filterParams?.page - 1
        }&limit=${filterParams?.perPage}`
      );
    }
  );

  return { birimler: birimler?.data, isLoading };
};
