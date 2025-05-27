import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { IFilterParams } from "../../interfaces";
const API_URL = import.meta.env.VITE_TEST_URL;

export const useRenkDering = () => {
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 100,
  });
  const [data, setData]: any = useState({});
  const getList = (filters: any) => {
    if (!filters?.page) return;
    axios
      .get(
        `${API_URL}/renkderinligi/?skip=${filters.page - 1}&limit=${
          filters.perPage
        }${filters?.q ? "&" + filters.q : ""}`
      )
      .then((res: any) => {
        setData(res?.data);
      });
  };

  const Options = useMemo(() => {
    return data?.data?.map((item: { ADI: string; RENKDERINLIGIID: number }) => {
      return {
        label: item.ADI,
        value: item.RENKDERINLIGIID,
      };
    });
  }, [data]);

  useEffect(() => {
    getList(filterParams);
  }, [filterParams]);

  return { data, setFilterParams, filterParams, Options };
};
