import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "Химикаты", link: "/chemical_store/chemicals" },
];

export const TableData = ({
  filterParams,
}: {
  filterParams: any;
  setOpen?: (val: boolean) => void;
}) => {
  const [headColumns, setHeadColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData]: any = useState({});

  const getList = (filters: any) => {
    setIsLoading(true);
    axios
      .get(
        `${API_URL}/urun/?skip=${
          filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
        }&limit=${filters.perPage}${filters.q ? "&" + filters.q : ""}`
      )
      .then((res) => {
        setBodyData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const deleteFn = async (id: string[]) => {
    try {
      await axios.delete(`${API_URL}/urun/`, {
        method: "DELETE",
        url: `${API_URL}/urun/`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: id,
      });
      getList(filterParams);
      toast.success("Muvaffaqiyatli amalga oshirildi!");
    } catch (error) {
      toast.error(`Error creating element:, ${error}`);
      return null;
    }
  };

  useEffect(() => {
    getList(filterParams);
  }, [filterParams]);

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
  };
};
