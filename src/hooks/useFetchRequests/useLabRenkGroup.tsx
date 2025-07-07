import axios from "axios";
import { useMemo, useState } from "react";
import { IFilterParams } from "../../interfaces";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useLabRenkGroupList = (uniqueId?: string) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });

  const { data: bodyData }: any = useQuery(
    [`GET_LAB_RANK_GRUP_LIST_${uniqueId || 'default'}`, filterParams],
    () => {
      return axios.get(
        `${API_URL}/labrenkgrup/?skip=${filterParams.page - 1}&limit=${filterParams.perPage
        }${filterParams?.q ? "&" + filterParams.q : ""}`
      );
    },
    {
      enabled: !!filterParams?.page,
    }
  );

  const Options = useMemo(() => {
    return bodyData?.data?.data?.map(
      (item: { ADI: string; LABRENKGRUPID: number }) => {
        return {
          label: item.ADI,
          value: item.LABRENKGRUPID,
        };
      }
    );
  }, [bodyData]);

  return {
    labRenkData: bodyData?.data,
    setFilterParams,
    filterParams,
    Options,
  };
};
