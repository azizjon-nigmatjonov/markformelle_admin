import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { GetCurrentDate } from "../../../../utils/getDate";

export const FetchFunction = () => {
  const { data: urunType } = useQuery(["GET_URUN_TIPI"], () => {
    return axios.get(`http://10.40.14.193:8000/uruntipi/?skip=0&limit=100`);
  });

  const { data: depo } = useQuery(["DET_DEPO"], () => {
    return axios.get(`http://10.40.14.193:8000/depo/?skip=0&limit=100`);
  });

  return {
    urunType: urunType?.data,
    depo: depo?.data,
  };
};

export const FetchTable = ({
  filterParams = {},
  id,
}: {
  filterParams: any;
  id?: any;
}) => {
  const { data: birimler, isLoading } = useQuery(
    ["GET_BIRIMLER", filterParams],
    () => {
      return axios.get(`http://10.40.14.193:8000/urunbirim/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  return { birimler: birimler?.data, isLoading };
};

export const FetchModal = ({ id, urunId }: { id?: any; urunId?: any }) => {
  const { data: modal } = useQuery(
    ["GET_IRSALIYE", id],
    () => {
      return axios.get(`http://10.40.14.193:8000/irsaliye/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  const { data: modalTable } = useQuery(
    ["GET_IRSALIYE_TABLE", id],
    () => {
      return axios.get(`http://10.40.14.193:8000/stokdetay/irsaliye/${id}`);
    },
    {
      enabled: !!id,
    }
  );

  const { data: urunData } = useQuery(
    ["GET_URUN_FOR_IRSALIYE", urunId],
    () => {
      return axios.get(`http://10.40.14.193:8000/urun/${urunId}`);
    },
    {
      enabled: !!urunId,
    }
  );

  const headColumns = useMemo(() => {
    return [
      { id: "STOKDETAYID", title: "STOKDETAYID" },
      { id: "URUNID", title: "URUNID" },
      { id: "URUNBIRIMID", title: "URUNBIRIMID" },
      { id: "KULLANICIID", title: "KULLANICIID" },
      { id: "MIKTAR", title: "MIKTAR" },
      {
        id: "DEGISIMTARIHI",
        title: "DEGISIMTARIHI",
        render: (val: string) => {
          return GetCurrentDate({ type: "usually", date: val });
        },
      },
    ];
  }, []);

  return {
    defaultData: modal?.data,
    tableData: modalTable?.data,
    headColumns,
    urunData: urunData?.data ?? {},
  };
};
