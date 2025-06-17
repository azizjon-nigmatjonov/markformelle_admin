import WarehouseLoaders from "../../views/Warehouse/Loaders";

export const wareHouse = [
  {
    parent: "row",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 612",
    parent_icon: "/images/wherehouse.png",
    icon: "/images/fork-loader.webp",
    element: <WarehouseLoaders />,
    auth: true,
    permissions: ["view_page"],
  },
];
