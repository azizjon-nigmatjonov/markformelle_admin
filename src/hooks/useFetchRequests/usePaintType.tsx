import axios from "axios";
import { useEffect, useState } from "react";
import { IFilterParams } from "../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;
interface IGetUrunList {
  enabled?: string;
}
export const useGetPaintTypeList = ({ enabled = "" }: IGetUrunList) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });

  const [paintTypeData, setPaintTypeData] = useState<any>({});
  const getPaintType = (filters: IFilterParams) => {
    axios
      .get(
        `${API_URL}/boyatipi/?skip=${filters.page - 1}&limit=${
          filters.perPage
        }${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res: any) => {
        setPaintTypeData(res?.data);
      });
  };

  useEffect(() => {
    if (enabled) {
      if (filterParams?.[enabled]) {
        getPaintType(filterParams);
      } else {
        setPaintTypeData({});
      }
    } else {
      getPaintType(filterParams);
    }
  }, [filterParams, enabled]);

  return { paintTypeData, setFilterParams, filterParams };
};
