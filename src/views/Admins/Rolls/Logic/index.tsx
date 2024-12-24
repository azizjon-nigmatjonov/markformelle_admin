import { useMutation } from "react-query";
import usePageRouter from "../../../../hooks/useObjectRouter";
import useCQuery from "../../../../hooks/useCQuery";
import axios from "axios";

export const breadCrumbs = [
  { label: "Доступ", link: "/access/rolls" },
  { label: "Ролы" },
];

export const FetchFunction = () => {
  const { data, isLoading, refetch } = useCQuery({
    key: `GET_USERS_LIST`,
    endpoint: `http://localhost:3000/rolls`,
    params: {},
  });

  return { roles: data, isLoading, refetch };
};

export const DeleteFunction = ({ handleClose }: { handleClose: any }) => {
  const { mutate: rollDelete, isLoading: deleteRolLoading } = useMutation({
    mutationFn: (id: any) => {
      const data: any = { id };
      axios
        .delete(`http://localhost:3000/rolls`, {
          params: data,
        })
        .then((res) => {
          handleClose();
          console.log(res);
        })
        .catch((error) => {
          console.error("Error adding route:", error);
        });

      return data;
    },
  });

  const deleteRoll = (id: number) => {
    rollDelete(id);
  };

  return { deleteRoll, deleteRolLoading };
};

export const TableData = ({ deleteRoll }: { deleteRoll: any }) => {
  const { navigateTo } = usePageRouter();
  const headColumns = [
    {
      title: "Название рол",
      id: "name",
    },
    {
      title: "Количество функций",
      id: "permissions",
      render: (val: any) => {
        if (!val) return <></>;

        return <div>{Object.keys(val).length}</div>;
      },
    },
    // {
    //   title: "Активные администраторы",
    //   id: "active_admins",
    // },
    {
      title: "",
      id: "actions",
      width: 90,
      actions: ["edit", "delete"],
    },
  ];

  const handleActions = (el: any, status: string) => {
    console.log("el", el);

    if (status === "edit") {
      navigateTo(`/access/rolls/${el.id}`);
    }
    if (status === "delete" && el.id !== "superadmin") {
      deleteRoll(el.id);
    }
  };

  return { headColumns, handleActions };
};
