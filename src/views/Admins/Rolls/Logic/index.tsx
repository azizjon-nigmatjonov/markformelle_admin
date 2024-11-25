import { useMutation, useQuery } from "react-query";
import roleService from "../../../../services/rolls";
import usePageRouter from "../../../../hooks/useObjectRouter";

export const breadCrumbs = [
  { label: "Доступ", link: "/access/rolls" },
  { label: "Ролы" },
];

export const FetchFunction = () => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ROLLS_TABLE_LIST"],
    () => {
      return roleService.getList();
    },
    {
      enabled: true,
    }
  );

  return { roles: data, isLoading, refetch };
};

export const DeleteFunction = ({ handleClose }: { handleClose: any }) => {
  const { mutate: rollDelete, isLoading: deleteRolLoading } = useMutation({
    mutationFn: (id: number) => {
      return roleService.deleteElement(id).then(() => {
        handleClose();
      });
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
      id: "permissions_count",
    },
    {
      title: "Активные администраторы",
      id: "active_admins",
    },
    {
      title: "",
      id: "actions",
      width: 90,
      actions: ["edit", "delete"],
    },
  ];

  const handleActions = (el: any, status: string) => {
    if (status === "edit") {
      navigateTo(`/admins/rolls/${el.id}`);
    }
    if (status === "delete" && el.name !== "super") {
      deleteRoll(el.id);
    }
  };

  return { headColumns, handleActions };
};
