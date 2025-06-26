import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useTranslationHook } from "../../../hooks/useTranslation";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [{ label: "articul", link: "/lists/articules" }];

export const TableData = ({
  filterParams,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);
  const [bodyData, setBodyData]: any = useState({});

  const fetchList = async (filters: any) => {
    const response = await axios.get(
      `${API_URL}/kalite/?skip=${
        filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
      }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
    );
    return response.data;
  };

  const {
    data: listData,
    isLoading,
    refetch,
  } = useQuery(["GET_ARTICULES", filterParams], () => fetchList(filterParams), {
    keepPreviousData: true,
  });

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/kalite`, {
        method: "DELETE",
        url: `${API_URL}/kalite/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetch();
      toast.success(t("deleted!"));
    } catch (error) {
      refetch();
      toast.error(t("error"));
      return null;
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
