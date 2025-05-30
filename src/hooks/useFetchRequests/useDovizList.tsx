import axios from "axios";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;
interface Params {
  enabled?: string;
}
export const useGetDovizList = ({ enabled = "" }: Params) => {
  const [filterParams, setFilterParams] = useState<any>({
    page: 1,
    perPage: 100,
  });

  const { data: bodyData }: any = useQuery(
    ["GET_DOVIZ_LIST__", filterParams],
    () => {
      return axios.get(
        `${API_URL}/doviz/?skip=${filterParams.page - 1}&limit=${
          filterParams.perPage
        }${filterParams?.q ? "&" + filterParams.q : ""}`
      );
    },
    {
      enabled: enabled.length ? filterParams?.[enabled] : !!filterParams?.page,
    }
  );

  const Options = useMemo(() => {
    return bodyData?.data?.data?.map(
      (item: { DOVIZID: string; CINSI: string }) => {
        return {
          label: item.DOVIZID,
          value: item.DOVIZID,
        };
      }
    );
  }, [bodyData]);

  return { dovizData: bodyData?.data, setFilterParams, filterParams, Options };
};
