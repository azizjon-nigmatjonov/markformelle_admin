import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useCQuery from "../../../hooks/useCQuery";

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
  const [headColumns, setHeadColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyData, setBodyData]: any = useState({});

  // const deleteFn = (id: string | number) => {
  //   setIsLoading(true);
  //   axios
  //     .delete(`http://10.40.14.193:8000/irsaliye/${id}`)
  //     .then((_: any) => {
  //       toast.success("Muvaffaqiyatli amalga oshirildi!");
  //     })
  //     .catch(() => {
  //       toast.error("O'chirib bo'lmaydi");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      handleActionsModal("add");
    }
    if (status === "view") {
      handleActionsModal("edit", el);
    }
    if (status === "edit") {
      handleActionsModal("edit", el);
    }

    if (status === "delete") {
      console.log("el", el.IRSALIYEID);
      toast.success("Muvaffaqiyatli amalga oshirildi!");
      // deleteFn(el.IRSALIYEID)
    }
    if (status === "delete_multiple") {
      console.log(el);

      toast.success("Muvaffaqiyatli amalga oshirildi!");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!filterParams?.page) return;

    axios
      .get(
        `http://10.40.14.193:8000/irsaliye/?skip=${
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
        setBodyData(res.data);
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
            id: element?.IRSALIYEID,
            initial_order: item.order,
            ...element,
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
          ...element,
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

  const { data: depoData } = useCQuery({
    key: `GET_DEPO_LIST_FOR_TRANSFERS`,
    endpoint: `http://10.40.14.193:8000/depo/?skip=0&limit=100`,
    params: {},
  });

  const { data: dovizData } = useCQuery({
    key: `GET_DOVIZ_LIST_FOR_TRANSFERS`,
    endpoint: `http://10.40.14.193:8000/doviz/?skip=0&limit=100`,
    params: {},
  });

  const depoOptions = useMemo(() => {
    return depoData?.data?.map((item: any) => {
      return {
        label: (
          <div className="flex space-x-2">
            <span className="text-[var(--primary)]">{item.DEPOID}</span>,{" "}
            <span>{item.ADI}</span>
          </div>
        ),
        title: item.ADI,
        value: item.DEPOID,
      };
    });
  }, [depoData]);

  const dovizOptions = useMemo(() => {
    return dovizData?.data?.map((item: any) => {
      return {
        label: item.DOVIZID,
        value: item.DOVIZID,
      };
    });
  }, [dovizData]);

  const createElement = (params: any) => {
    axios
      .post("http://10.40.14.193:8000/irsaliye/", params)
      .then((res: any) => {
        console.log("res", res);
      });
  };

  return {
    handleActionsModal,
    depoOptions,
    dovizOptions,
    createElement,
  };
};
