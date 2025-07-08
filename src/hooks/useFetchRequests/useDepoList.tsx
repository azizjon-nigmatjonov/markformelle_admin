import axios from "axios";
import { useEffect, useState } from "react";
import { IFilterParams } from "../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useGetDepoList = (_?: string) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });
  const [depoData, setDepoData]: any = useState({});
  const getDepoData = (filters: any) => {
    if (!filters?.page) return;
    axios
      .get(
        `${API_URL}/depo/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setDepoData(res?.data);
      });
  };

  useEffect(() => {
    getDepoData(filterParams);
  }, [filterParams]);

  return { depoData, setFilterParams, filterParams };
};
