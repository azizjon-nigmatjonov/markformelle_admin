import WarehouseLoaders from "../../views/Warehouse/Loaders";

export const wareHouse = [
  {
    parent: "row",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 612",
    parent_icon: (
      <img
        width={18}
        src="/images/wherehouse.png"
        alt="warehouse"
        loading="lazy"
      />
    ),
    icon: (
      <img
        width={22}
        src="/images/fork-loader.webp"
        alt="loader"
        loading="lazy"
      />
    ),
    element: <WarehouseLoaders />,
    auth: true,
    permissions: ["view_page"],
  },
];
