import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/env";
interface IGetBirimList {
  enabled?: string;
}
export const useGetBirimList = ({ enabled = "" }: IGetBirimList) => {
  const [filterParams, setFilterParams] = useState<any>({
    page: 1,
    perPage: 100,
  });
  const [birimData, setBirimData] = useState<any>([]);
  const getBirim = (filters: any) => {
    axios
      .get(
        `${API_URL}/urunbirim/?skip=${filters.page - 1}&limit=${
          filters.perPage
        }${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res: any) => {
        setBirimData(res?.data);
      });
  };

  useEffect(() => {
    if (enabled) {
      if (filterParams?.[enabled]) {
        getBirim(filterParams);
      } else {
        setBirimData({});
      }
    } else {
      getBirim(filterParams);
    }
  }, [filterParams]);

  return { birimData, setFilterParams, filterParams };
};
