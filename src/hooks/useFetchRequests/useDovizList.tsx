import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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

  const Options = useMemo(() => {
    return dovizData?.data?.map((item: { DOVIZID: string; CINSI: string }) => {
      return {
        label: item.DOVIZID,
        value: item.DOVIZID,
      };
    });
  }, [dovizData]);

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

  return { dovizData, setFilterParams, filterParams, Options };
};
