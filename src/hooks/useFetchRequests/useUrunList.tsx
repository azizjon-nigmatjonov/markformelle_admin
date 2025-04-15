import axios from "axios";
import { useEffect, useState } from "react";
import { IFilterParams } from "../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;
interface IGetUrunList {
  enabled?: string;
}
export const useGetUrunList = ({ enabled = "" }: IGetUrunList) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });
  const [urunData, setUrunData] = useState<any>({});
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

  useEffect(() => {
    if (enabled) {
      if (filterParams?.[enabled]) {
        getUrun(filterParams);
      } else {
        setUrunData({});
      }
    } else {
      getUrun(filterParams);
    }
  }, [filterParams, enabled]);

  return { urunData, setFilterParams, filterParams };
};
