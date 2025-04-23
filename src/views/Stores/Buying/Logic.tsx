import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useCQuery from "../../../hooks/useCQuery";
import { IFilterParams } from "../../../interfaces";

const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "Документ покупки", link: "/chemical_store/buying" },
];

export const TableData = ({ filterParams }: { filterParams: any }) => {
  const [headColumns, setHeadColumns] = useState<
    { title: string; id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData] = useState<{ data: any[]; count: number }>({
    data: [],
    count: 0,
  });

  const getList = async (filters?: IFilterParams) => {
    if (!filters?.page)
      filters = {
        page: 1,
        perPage: 50,
      };
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}/irsaliye/?skip=${
          filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
        }&limit=${filters.perPage}&HAREKETTIPI=1${
          filters?.DATE_FROM
            ? `&DATE_FROM=${filters.DATE_FROM}&DATE_TO=${filters.DATE_TO}`
            : ""
        }${filters?.q ? "&" + filters?.q : ""}`
      );
      setBodyData(data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFn = async (id: [string]) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/irsaliye/`, {
        method: "DELETE",
        url: "http://10.40.14.193:8000/stokdetay/",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      toast.success("Muvaffaqiyatli amalga oshirildi!");
      getList(filterParams);
    } catch (error) {
      toast.error("O'chirib bo'lmaydi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList(filterParams);
  }, [filterParams]);

  useEffect(() => {
    if (!bodyData?.data?.length) return;
    const firstRowKeys = Object.keys(bodyData.data[0] ?? {});
    setHeadColumns(firstRowKeys.map((key) => ({ title: key, id: key })));
  }, [bodyData]);

  return {
    headColumns,
    deleteFn,
    bodyColumns: bodyData?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    getList,
  };
};

export const ModalLogic = ({
  filterParamsDepo = {},
  filterParamsFirma = {},
}: {
  filterParamsDepo?: any;
  filterParamsFirma?: any;
}) => {
  const [depoData, setDepoData]: any = useState({});
  const [firmaData, setFirmaData]: any = useState({});
  const getDepoData = (filters: any) => {
    if (!filters?.page) return;
    axios
      .get(
        `${API_URL}/depo/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setDepoData(res?.data);
      });
  };

  useEffect(() => {
    getDepoData(filterParamsDepo);
  }, [filterParamsDepo?.page, filterParamsDepo]);

  const getFirmaData = (filters: any) => {
    if (!filters?.page) return;
    axios
      .get(
        `${API_URL}/firma/?skip=${filters.page - 1}&limit=${filters.perPage}${
          filters?.q ? "&" + filters.q : ""
        }`
      )
      .then((res: any) => {
        setFirmaData(res?.data);
      });
  };

  useEffect(() => {
    getFirmaData(filterParamsFirma);
  }, [filterParamsFirma?.page, filterParamsFirma]);

  const { data: dovizData } = useCQuery({
    key: "GET_DOVIZ_LIST_FOR_TRANSFERS",
    endpoint: `${API_URL}/doviz/?skip=0&limit=100`,
    params: {},
  });

  const dovizOptions = useMemo(
    () =>
      dovizData?.data?.map((item: any) => ({
        label: item.DOVIZID,
        value: item.DOVIZID,
      })) ?? [],
    [dovizData]
  );

  return {
    depoOptions: depoData?.data,
    dovizOptions,
    firmaData: firmaData?.data,
  };
};
