import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { useQuery } from "react-query";
import { ModalTypes } from "./interfaces";

const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [{ label: "orders", link: "/orders/orders-paint" }];

export const TableData = ({
  filterParams = { page: 1, perPage: 50 },
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchList = async (filters: any) => {
    setIsLoading(true);
    const response = await axios.get(
      `${API_URL}/boyasiparis/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
    );
    setIsLoading(false);
    return response.data;
  };

  const { data: listData, refetch } = useQuery(
    ["GET_BOYASIPARIS_LIST_ORDERS", filterParams],
    () => fetchList(filterParams),
    {
      keepPreviousData: true,
      enabled: !!filterParams?.page,
    }
  );

  const deleteFn = async (id: number[]): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/boyasiparis/`, {
        method: "DELETE",
        url: `${API_URL}/boyasiparis/`,
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
    }
  };

  useEffect(() => {
    if (listData) {
      setBodyData(listData);
    }
  }, [listData]);

  useEffect(() => {
    const headColumns: any = [];
    const arr: any = bodyData?.data ?? [];

    const obj = { ...arr?.[0] };
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
    headColumns,
    bodyColumns: bodyData?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    deleteFn,
    refetch,
  };
};

export const OrderListBaseLogics = ({
  children,
  deleteFn,
  setOpen,
  setModalInitialData,
}: {
  children: (props: {
    handleActions: (el: any, status: string) => void;
    handleModal: (status: string, id: number) => void;
  }) => React.ReactNode;
  deleteFn: (id: number[]) => Promise<void>;
  setOpen: (val: boolean) => void;
  setModalInitialData: (data: ModalTypes | null) => void;
}) => {
  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);
      setModalInitialData(el);
    }

    if (status === "delete") {
      deleteFn([el.BOYASIPARISKAYITID]);
    }

    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { BOYASIPARISKAYITID: number }) => {
          return item.BOYASIPARISKAYITID;
        })
      );
    }
  };

  const handleModal = (status: string, id: number) => {
    if (status === "delete") {
      deleteFn([id]);
    } else if (status === "close") {
      setOpen(false);
      setModalInitialData(null);
    }
  };

  return <>{children({ handleActions, handleModal })}</>;
};
