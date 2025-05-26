import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_TEST_URL;
interface Params {
  enabled?: string;
}
export const useGetFirmList = ({ enabled = "" }: Params) => {
  const [filterParams, setFilterParams] = useState<any>({
    page: 1,
    perPage: 100,
  });
  const [firmaData, setFirmaData] = useState<any>([]);
  const getFirmData = (filters: any) => {
    axios
      .get(
        `${API_URL}/firma/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setFirmaData(res?.data);
      });
  };

  useEffect(() => {
    if (enabled && enabled !== "") {
      if (filterParams?.[enabled]) {
        getFirmData(filterParams);
      } else {
        getFirmData({});
      }
    } else {
      getFirmData(filterParams);
    }
  }, [filterParams]);

  return { firmaData, setFilterParams, filterParams };
};
