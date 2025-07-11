import axios from "axios";
import { useMemo, useState } from "react";
import { IFilterParams } from "../../interfaces";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useRenkDering = (uniqueId?: string) => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });

  const { data: bodyData }: any = useQuery(
    [`GET_LAB_RENK_DERING_LIST_${uniqueId || 'default'}`, filterParams],
    () => {
      return axios.get(
        `${API_URL}/renkderinligi/?skip=${filterParams.page - 1}&limit=${filterParams.perPage
        }${filterParams?.q ? "&" + filterParams.q : ""}`
      );
    },
    {
      enabled: !!filterParams?.page,
    }
  );

  const Options = useMemo(() => {
    return bodyData?.data?.data?.map(
      (item: { ADI: string; RENKDERINLIGIID: number }) => {
        return {
          label: item.ADI,
          value: item.RENKDERINLIGIID,
        };
      }
    );
  }, [bodyData]);

  return { data: bodyData?.data, setFilterParams, filterParams, Options };
};
