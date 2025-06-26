import axios from "axios";
import { useState } from "react";
import { IFilterParams } from "../../interfaces";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
export const useFetchType = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
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

export const useFetchTypeSingle = ({
  setOpenNewModal,
}: {
  setOpenNewModal: (val: string) => void;
}) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const getList = (link: string) => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/${link}`)
      .then((res) => {
        setData(res.data);
        setOpenNewModal("template_ready");
      })
      .catch(() => {
        setOpenNewModal("template_not_ready");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    data: data,
    getList,
    isLoading,
  };
};
