export const breadCrumbs = [{ label: "Stok", link: "/stores/eritma" }];

export const TableData = () => {
  const headColumns = [
    {
      title: "Название рол",
      id: "name",
    },
    {
      title: "Количество функций",
      id: "count",
      render: (val: any) => {
        return <div>{val ?? 0}</div>;
      },
    },
  ];

  const handleActions = (el: any, status: string) => {
    if (status === "edit") {
    }
    if (status === "delete" && el.id !== "superadmin") {
    }
  };

  const bodyColumns = [
    {
      name: "Azizjon",
      count: 12,
    },
  ];

  return { headColumns, handleActions, bodyColumns };
};
