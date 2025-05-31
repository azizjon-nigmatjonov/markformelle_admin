import axios from "axios";
import { useState } from "react";
import { IFilterParams } from "../../interfaces";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useFetchType = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 20,
  });

  const {
    data: bodyData,
    refetch,
    isLoading,
  }: any = useQuery(
    [`GET_FETCH_TYPE_${filterParams?.link}`, filterParams],
    () => {
      return axios.get(
        `${API_URL}/${filterParams.link}/?skip=${filterParams.page - 1}&limit=${
          filterParams.perPage
        }${filterParams?.q ? "&" + filterParams.q : ""}`
      );
    },
    {
      enabled: !!filterParams?.link,
    }
  );

  return {
    data: bodyData?.data,
    setFilterParams,
    filterParams,
    isLoading,
    refetch,
  };
};

export const useFetchTypeSingle = () => {
  const [filterParams, setFilterParams] = useState<Partial<any>>({ link: "" });
  const { data: bodyData, isLoading }: any = useQuery(
    [`GET_FETCH_TYPE_${filterParams.link}_SINGLE`, filterParams.link],
    () => {
      return axios.get(`${API_URL}/${filterParams.link}`);
    },
    {
      enabled: !!filterParams?.link,
    }
  );
  return {
    data: bodyData?.data,
    setFilterParams,
    filterParams,
    isLoading,
  };
};
