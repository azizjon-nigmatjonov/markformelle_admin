import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IFilterParams } from "../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useFetchType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 20,
  });
  const [data, setData]: any = useState({});

  const getList = (filters: any) => {
    if (!filters?.page || !filterParams?.link) return;
    setIsLoading(true);
    axios
      .get(
        `${API_URL}/${filterParams.link}/?skip=${filters.page - 1}&limit=${
          filters.perPage
        }${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res: any) => {
        setData(res?.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getList(filterParams);
  }, [filterParams]);

  return { data, setFilterParams, filterParams, isLoading, getList };
};
