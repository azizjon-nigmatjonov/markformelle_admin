import { useEffect, useState } from "react";
import { IFilterParams } from "../../interfaces";
import axios from "axios";
const API_URL = import.meta.env.VITE_TEST_URL;
export const useGetUniteList = (uniqueId?: string) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });
  const [uniteData, setUniteData]: any = useState({});

  const getUniteData = (filters: any) => {
    if (!filters?.page) return;
    axios
      .get(
        `${API_URL}/unite/?skip=${filters.page - 1}&limit=${filters.perPage}${filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setUniteData(res?.data);
      });
  };

  useEffect(() => {
    getUniteData(filterParams);
  }, [filterParams]);

  return {
    uniteData,
    setFilterParams,
    filterParams,
  };
};
