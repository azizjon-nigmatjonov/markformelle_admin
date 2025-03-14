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

export const FetchTable = ({
  filterParams = {},
  id,
}: {
  filterParams: any;
  id?: any;
}) => {
  console.log("id", id);

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
