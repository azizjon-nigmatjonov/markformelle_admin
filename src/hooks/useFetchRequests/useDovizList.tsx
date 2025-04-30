import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_TEST_URL;
interface Params {
  enabled?: string;
}
export const useGetDovizList = ({ enabled = "" }: Params) => {
  const [filterParams, setFilterParams] = useState<any>({
    page: 1,
    perPage: 100,
  });
  const [dovizData, setDovizData] = useState<any>([]);
  const getFirmData = (filters: any) => {
    axios
      .get(
        `${API_URL}/doviz/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setDovizData(res?.data);
      });
  };

  useEffect(() => {
    if (enabled) {
      if (filterParams?.[enabled]) {
        getFirmData(filterParams);
      } else {
        getFirmData({});
      }
    } else {
      getFirmData(filterParams);
    }
  }, [filterParams]);

  return { dovizData, setFilterParams, filterParams };
};
