import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utils/env";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";

export const MaterialStokLogic = ({
  filterParams,
  currentId,
}: {
  filterParams: any;
  currentId: number;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${API_URL}/hamstokmaster/rezervicin/${currentId}`
    );
    setIsLoading(false);
    return response.data;
  };

  const { data: listData, refetch } = useQuery(
    ["GET_REZERVE_LIST", currentId],
    () => fetchList(),
    {
      keepPreviousData: true,
      enabled: !!currentId,
    }
  );

  useEffect(() => {
    if (!filterParams?.BOYASIPARISDETAYID) {
      setIsLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/ormesiparisdetay/`, {
        method: "DELETE",
        url: `${API_URL}/ormesiparisdetay/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      bodyData;
    }
  };

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = {
      ...arr?.[0],
    };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        title: "HAMSTOKDETAYID",
        id: "HAMSTOKDETAYID",
      },
      {
        title: "HAMSTOKMASTERID",
        id: "HAMSTOKMASTERID",
      },
      {
        title: "KALITEID",
        id: "KALITEID",
      },
      {
        title: "HAMID",
        id: "HAMID",
      },
      {
        title: "HAMADI",
        id: "HAMADI",
      },
      {
        title: "IRSALIYENO",
        id: "IRSALIYENO",
      },
      {
        title: "ORMECIMAKINANO",
        id: "ORMECIMAKINANO",
      },
      {
        title: "TOPLAMKILO",
        id: "TOPLAMKILO",
      },
      {
        title: "KAPADEDI",
        id: "KAPADEDI",
      },
      {
        title: "KALANKILO",
        id: "KALANKILO",
      },
      {
        title: "FIRMAID",
        id: "FIRMAID",
      },
      {
        title: "FIRMAADI",
        id: "FIRMAADI",
      },
      {
        title: "URETICIID",
        id: "URETICIID",
      },
      {
        title: "URETICIADI",
        id: "URETICIADI",
      },
      {
        title: "KALITEADI",
        id: "KALITEADI",
      },
      {
        title: "IRSALIYETARIHI",
        id: "IRSALIYETARIHI",
      },
      {
        title: "EVRAKTIPI",
        id: "EVRAKTIPI",
      },
      {
        title: "SINIF",
        id: "SINIF",
      },
      {
        title: "LOT",
        id: "LOT",
      },
      {
        title: "RENK",
        id: "RENK",
      },
      {
        title: "PUS",
        id: "PUS",
      },
      {
        title: "FEINE",
        id: "FEINE",
      },
      {
        title: "EN",
        id: "EN",
      },
      {
        title: "GRM2",
        id: "GRM2",
      },
      {
        title: "MELANJKODU",
        id: "MELANJKODU",
      },
      {
        title: "BOBINGRAMAJI",
        id: "BOBINGRAMAJI",
      },
      {
        title: "MUSTERIPARTINO",
        id: "MUSTERIPARTINO",
      },
      {
        title: "MUSTERISIPARISNO",
        id: "MUSTERISIPARISNO",
      },
      {
        title: "REFERANSSIPARISNO",
        id: "REFERANSSIPARISNO",
      },
      {
        title: "TUPACIKENMAYLI",
        id: "TUPACIKENMAYLI",
      },
      {
        title: "REFERANSFIRMAADI",
        id: "REFERANSFIRMAADI",
      },
      {
        title: "IPLIKUZUNLUGU1",
        id: "IPLIKUZUNLUGU1",
      },
      {
        title: "IPLIKUZUNLUGU2",
        id: "IPLIKUZUNLUGU2",
      },
      {
        title: "IPLIKUZUNLUGU3",
        id: "IPLIKUZUNLUGU3",
      },
      {
        title: "ESKIPARTINO",
        id: "ESKIPARTINO",
      },
      {
        title: "TAMIR",
        id: "TAMIR",
      },
      {
        title: "ACIKLAMA",
        id: "ACIKLAMA",
      },
      {
        title: "TOPLAMMIKTAR",
        id: "TOPLAMMIKTAR",
      },
      {
        title: "TOPLAMMETRE",
        id: "TOPLAMMETRE",
      },
      {
        title: "TOPLAMADET",
        id: "TOPLAMADET",
      },
      {
        title: "REZERVEMIKTAR",
        id: "REZERVEMIKTAR",
      },
      {
        title: "REFERANSFIRMAID",
        id: "REFERANSFIRMAID",
      },
      {
        title: "REZERVEKILO",
        id: "REZERVEKILO",
      },
      {
        title: "REZERVEMETRE",
        id: "REZERVEMETRE",
      },
      {
        title: "REZERVEADET",
        id: "REZERVEADET",
      },
      {
        title: "KULLANILANMIKTAR",
        id: "KULLANILANMIKTAR",
      },
      {
        title: "KULLANILANKILO",
        id: "KULLANILANKILO",
      },
      {
        title: "KULLANILANMETRE",
        id: "KULLANILANMETRE",
      },
      {
        title: "KULLANILANADET",
        id: "KULLANILANADET",
      },
      {
        title: "KALANMIKTAR",
        id: "KALANMIKTAR",
      },
      {
        title: "KALANMETRE",
        id: "KALANMETRE",
      },
      {
        title: "KALANADET",
        id: "KALANADET",
      },
      {
        title: "BOYASIPARISDETAYID",
        id: "BOYASIPARISDETAYID",
      },
      {
        title: "STATUS",
        id: "STATUS",
      },
    ];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setTimeout(() => {
      setHeadColumns(
        newColumns.map((item: any) => {
          return {
            ...item,
            render: (val: any) => {
              return (
                <span
                  className={
                    Number(val) && !item.title.includes("ID")
                      ? "text-right w-full pr-2"
                      : ""
                  }
                >
                  {val}
                </span>
              );
            },
          };
        })
      );
    }, 0);
  }, [bodyData]);

  return {
    bodyData,
    isLoading,
    refetch,
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    deleteFn,
  };
};

export const MaterialTableLogic = ({ filterParams }: { filterParams: any }) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async (filters: any) => {
    setIsLoading(true);
    const response = await axios.get(
      `${API_URL}/boyasiparisrezerv/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&BOYASIPARISDETAYID=${filters.BOYASIPARISDETAYID}`
    );
    setIsLoading(false);
    return response.data;
  };

  const { data: listData, refetch } = useQuery(
    ["GET_REZERVE_LIST", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.BOYASIPARISDETAYID,
    }
  );

  useEffect(() => {
    if (!filterParams?.BOYASIPARISDETAYID) {
      setIsLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/boyasiparisrezerv/`, {
        method: "DELETE",
        url: `${API_URL}/boyasiparisrezerv/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      bodyData;
    }
  };

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = {
      ...arr?.[0],
    };
    const keys = Object.keys(obj);
    const newColumns: any = [];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setTimeout(() => {
      setHeadColumns(newColumns);
    }, 0);
  }, [bodyData]);

  return {
    bodyData,
    isLoading,
    refetch,
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    deleteFn,
  };
};

export const PaintTableLogic = ({ filterParams }: { filterParams: any }) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async (filters: any) => {
    setIsLoading(true);
    const response = await axios.get(
      `${API_URL}/boyasiparisdetay/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&BOYASIPARISKAYITID=${filters.BOYASIPARISKAYITID}`
    );
    setIsLoading(false);
    return response.data;
  };

  const { data: listData, refetch } = useQuery(
    ["GET_PAINT_TABLE", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.BOYASIPARISKAYITID,
    }
  );

  useEffect(() => {
    if (!filterParams?.BOYASIPARISKAYITID) {
      setIsLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/boyasiparisdetay/`, {
        method: "DELETE",
        url: `${API_URL}/boyasiparisdetay/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      bodyData;
    }
  };

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = {
      ...arr?.[0],
    };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        id: "RECETEGIRISTARIHI",
        title: "RECETEGIRISTARIHI",
        render: (value: any) => {
          return value ? dayjs(value).format("DD.MM.YYYY") : "";
        },
      },
    ];

    keys.forEach((key: string) => {
      const found = headColumns.find((item: any) => item.id === key);

      if (found?.id) {
        newColumns.push(found);
      } else {
        newColumns.push({ title: key, id: key });
      }
    });

    setTimeout(() => {
      setHeadColumns(newColumns);
    }, 0);
  }, [bodyData]);

  return {
    bodyData,
    isLoading: isLoading,
    refetch,
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    deleteFn,
  };
};
