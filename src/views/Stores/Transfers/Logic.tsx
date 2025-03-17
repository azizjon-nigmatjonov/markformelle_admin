import { useEffect, useState } from "react";
import axios from "axios";

export const breadCrumbs = [
  { label: "Внутреннее примешенные", link: "/chemical_store/transfers" },
];

export const TableData = ({
  filterParams,
  handleActionsModal = () => {},
  setOpen = () => {},
}: {
  filterParams: any;
  handleActionsModal?: (val: any, element?: any) => void;
  setOpen?: (val: boolean) => void;
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
    if (status === "delete" && el.id !== "superadmin") {
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (filterParams?.search?.length) {
      if (filterParams?.search?.length >= 5) {
        axios
          .get(
            `http://10.40.14.193:8000/urun/${filterParams.search.toUpperCase()}`
          )
          .then((res) => {
            setBodyData({ data: [res.data] });
            setOpen(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      axios
        .get(
          `http://10.40.14.193:8000/irsaliye?skip=${
            filterParams.page < 2
              ? 0
              : (filterParams.page - 1) * filterParams.perPage
          }&limit=${filterParams.perPage}`
        )
        .then((res) => {
          setBodyData(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [filterParams.page, filterParams.perPage]);

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
            id: element?.IRSALIYEID,
            initial_order: item.order,
          };
        })
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
