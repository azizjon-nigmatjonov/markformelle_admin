import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../../../../utils/env";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../../hooks/useTranslation";
import dayjs from "dayjs";

export const MaterialTableLogic = ({ filterParams }: { filterParams: any }) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/ormesiparisdetay/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&BOYASIPARISKAYITID=${filters.BOYASIPARISKAYITID}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_MATERIAL_TABLE", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.BOYASIPARISKAYITID,
    }
  );
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

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/boyasiparisdetay/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&ORMESIPARISDETAYID=${filters?.ORMESIPARISDETAYID}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_Paint_table_by_orme", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.ORMESIPARISDETAYID,
    }
  );
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
    isLoading,
    refetch,
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    deleteFn,
  };
};

export const PaintVariantTableLogic = ({
  filterParams,
}: {
  filterParams: any;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/desenvaryant/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}&DESENID=${
        filters.DESENID
      }`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_PAINT_VARIANT_TABLE", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.DESENID,
    }
  );
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
    bodyColumns: filterParams?.DESENID ? bodyData?.data : [],
    deleteFn,
  };
};

export const IslemTipiTableLogic = ({
  filterParams,
}: {
  filterParams: any;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/siparisilaveislemler/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${
        filters.q ? "&" + filters.q : ""
      }&BOYASIPARISDETAYID=${filters.BOYASIPARISDETAYID}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(
    ["GET_ILAVA_TABLE_PAINT" + filterParams?.BOYASIPARISDETAYID, filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.BOYASIPARISDETAYID,
    }
  );

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/siparisilaveislemler/`, {
        method: "DELETE",
        url: `${API_URL}/siparisilaveislemler/`,
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
    bodyColumns: filterParams?.BOYASIPARISDETAYID ? bodyData?.data : [],
    deleteFn,
  };
};
