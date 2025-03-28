import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useCQuery from "../../../hooks/useCQuery";
import { ITransferCreate } from "../../../interfaces/transfers";

const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "Внутреннее примешенные", link: "/chemical_store/transfers" },
];

export const TableData = ({
  filterParams,
  handleActionsModal = () => {},
}: {
  filterParams: any;
  handleActionsModal?: (val: any, element?: any) => void;
}) => {
  const [headColumns, setHeadColumns] = useState<
    { title: string; id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData] = useState<{ data: any[]; count: number }>({
    data: [],
    count: 0,
  });

  const deleteFn = async (id: string | number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/irsaliye/${id}`);
      toast.success("Muvaffaqiyatli amalga oshirildi!");
      getList(filterParams);
    } catch (error) {
      toast.error("O'chirib bo'lmaydi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleActions = (el: any, status: string) => {
    if (["modal", "edit", "view"].includes(status)) {
      handleActionsModal("edit", el);
    }
    if (status === "delete") {
      deleteFn(el.IRSALIYEID);
    }
    if (status === "delete_multiple") {
      toast.success("Muvaffaqiyatli amalga oshirildi!");
    }
  };

  const getList = async (filters: any) => {
    if (!filters?.page) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}/irsaliye/?skip=${
          filters.page < 2 ? 0 : (filters.page - 1) * filters.perPage
        }&limit=${filters.perPage}${
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

  const createElement = async (params: Partial<ITransferCreate>) => {
    try {
      const { data } = await axios.post(`${API_URL}/irsaliye/`, params);
      await getList(filterParams);
      return data;
    } catch (error) {
      console.error("Error creating element:", error);
      return null;
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
    handleActions,
    bodyColumns: bodyData?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
    createElement,
  };
};

export const ModalLogic = ({
  modalList,
  setModalList,
}: {
  modalList: any[];
  setModalList: (value: any[]) => void;
}) => {
  const { data: depoData } = useCQuery({
    key: "GET_DEPO_LIST_FOR_TRANSFERS",
    endpoint: `${API_URL}/depo/?skip=0&limit=100`,
    params: {},
  });

  const { data: dovizData } = useCQuery({
    key: "GET_DOVIZ_LIST_FOR_TRANSFERS",
    endpoint: `${API_URL}/doviz/?skip=0&limit=100`,
    params: {},
  });

  const reorderItems = (array: any[], fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return array;
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    return newArray.map((item, index) => ({ ...item, order: index + 1 }));
  };

  const handleActionsModal = (val: string, element?: any) => {
    if (val === "edit_modal") {
      setModalList(
        modalList.map((item) => ({
          ...item,
          type: "edit",
          id: element?.IRSALIYEID,
          initial_order: item.order,
          ...element,
        }))
      );
    }
    if (val === "edit") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "edit",
          id: element?.IRSALIYEID,
          ...element,
        },
      ]);
    }
    if (val === "close") {
      setModalList(modalList.filter((item) => item.order !== element.order));
    }
    if (val === "reorder") {
      setModalList(
        reorderItems(modalList, element.order - 1, modalList.length)
      );
    }
    if (val === "add") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "add",
        },
      ]);
    }
  };

  const depoOptions = useMemo(
    () =>
      depoData?.data?.map((item: any) => ({
        label: (
          <div className="flex space-x-2">
            <span className="text-[var(--primary)] w-[20%]">{item.DEPOID}</span>
            <span>-</span>
            <span>{item.ADI}</span>
          </div>
        ),
        title: item.ADI,
        value: item.DEPOID,
      })) ?? [],
    [depoData]
  );

  const dovizOptions = useMemo(
    () =>
      dovizData?.data?.map((item: any) => ({
        label: item.DOVIZID,
        value: item.DOVIZID,
      })) ?? [],
    [dovizData]
  );

  return { handleActionsModal, depoOptions, dovizOptions };
};
