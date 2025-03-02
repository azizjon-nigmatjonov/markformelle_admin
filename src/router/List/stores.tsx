import WarehouseLoaders from "../../views/Warehouse/Loaders";

export const stores = [
  {
    parent: "row",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 612",
    parent_icon: (
      <img width={18} src="/images/wherehouse.png" alt="warehouse" />
    ),
    icon: <img width={22} src="/images/fork-loader.png" alt="loader" />,
    element: <WarehouseLoaders />,
    auth: true,
    permissions: ["view_page"],
  },
];
