import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_TEST_URL;

export const breadCrumbs = [
  { label: "Остатки химикатов", link: "/chemical_store/chemical_stock" },
];

export const TableData = ({
  filterParams,
  handleActionsModal = () => {},
}: {
  filterParams: any;
  handleActionsModal?: (val: any, element?: any) => void;
}) => {
  const [headColumns, setHeadColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData]: any = useState({});

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      handleActionsModal("add");
    }
    if (status === "view") {
      handleActionsModal("view", el);
    }
    if (status === "edit") {
      handleActionsModal("edit", el);
    }
    if (status === "delete") {
    }
    if (status === "delete_multiple") {
      toast.success("Muvaffaqiyatli amalga oshirildi!");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!filterParams?.page) return;

    axios
      .get(
        `${API_URL}/reports/stok-envanter-raporu/?ADepoId=D008&skip=${
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
        setBodyData({
          data: res.data.data.map((item: any) => {
            const obj = item.StokHareketleri;
            delete item.StokHareketleri;
            return {
              ...item,
              ...obj,
            };
          }),
          count: res.data.count,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    handleActions,
    bodyColumns: bodyData?.data ?? [],
    isLoading,
    defaultData: {},
    bodyData,
    setBodyData,
  };
};

export const ModalLogic = ({
  modalList,
  setModalList,
}: {
  modalList: any;
  setModalList: any;
}) => {
  const reorderItems = (array: any[], fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return array;

    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);

    return newArray?.map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });
  };
  const handleActionsModal = (val: string, element?: any) => {
    if (val === "edit_modal") {
      setModalList(
        modalList?.map((item: any) => {
          return {
            ...item,
            type: "edit",
            id: element?.URUNID,
            initial_order: item.order,
          };
        })
      );
    }
    if (val === "view") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "view",
          id: element?.URUNID,
        },
      ]);
    }
    if (val === "edit") {
      setModalList([
        ...modalList,
        {
          order: modalList.length + 1,
          initial_order: modalList.length + 1,
          type: "edit",
          id: element?.URUNID,
        },
      ]);
    }

    if (val === "close") {
      setModalList(
        modalList.filter((item: any) => item.order !== element.order)
      );
    }

    if (val === "reorder") {
      const newModalList = reorderItems(
        modalList,
        element.order - 1,
        modalList.length
      );

      setModalList(newModalList);
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
  return {
    handleActionsModal,
  };
};
