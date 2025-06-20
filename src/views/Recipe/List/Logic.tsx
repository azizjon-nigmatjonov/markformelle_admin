import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "recipe", link: "/chemical_store/chemicals" },
];

export const TableData = ({
  filterParams,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const { t } = useTranslationHook();
  const [headColumns, setHeadColumns] = useState([]);

  const {
    data: bodyData,
    refetch: refetchTable,
    isLoading,
  }: any = useQuery(
    ["GET_RECIPE_LIST_TABLE", filterParams],
    () => {
      return axios.get(
        `${API_URL}/recete/?skip=${
          filterParams.page < 2
            ? 0
            : (filterParams.page - 1) * filterParams.perPage
        }&limit=${filterParams.perPage}${
          filterParams.q ? "&" + filterParams.q : ""
        }&SABLON=${true}`
      );
    },
    {
      enabled: !!filterParams?.page,
    }
  );

  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/recete/`, {
        method: "DELETE",
        url: `${API_URL}/recete/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      refetchTable();
      toast.success(t("deleted!"));
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

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

    bodyColumns: bodyData?.data?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData: bodyData?.data,
    deleteFn,
  };
};
