import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  filterParams: any;
}

export const useIrsaliyeFetch = ({
  filterParams = { perPage: 100, page: 1 },
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [irsaliyeData, setIrsaliyeData]: any = useState({});
  useEffect(() => {
    setIsLoading(true);
    if (!filterParams?.page) return;

    axios
      .get(
        `http://10.40.14.193:8000/irsaliye/?skip=${
          filterParams.page < 2
            ? 0
            : (filterParams.page - 1) * filterParams.perPage
        }&limit=${filterParams.perPage}${
          filterParams?.DATE_FROM
            ? `&DATE_FROM=${filterParams.DATE_FROM}&DATE_TO=${filterParams.DATE_TO}`
            : ""
        }${filterParams?.q ? "&" + filterParams?.q : ""}`
      )
      .then((res) => {
        setIrsaliyeData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    irsaliyeData,
    isLoading,
  };
};
