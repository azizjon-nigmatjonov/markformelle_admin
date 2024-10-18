import WarehouseLoaders from "../../views/Kniting/Process";

export const wareHouse = [
  {
    parent: "warehouse",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчики 612",
    parent_icon: (
      <img width={18} src="/images/wherehouse.png" alt="warehouse" />
    ),
    icon: <img width={22} src="/images/fork-loader.png" alt="loader" />,
    element: <WarehouseLoaders />,
    auth: false,
  },
];
