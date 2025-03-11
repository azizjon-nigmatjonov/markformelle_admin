import axios from "axios";
import { useQuery } from "react-query";

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`http://10.40.14.193:8000/uruntipi/?skip=0&limit=100`);
  });

  return {
    urunType: urunType?.data,
  };
};
