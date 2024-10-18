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
    icon: "couriers",
    element: <WarehouseLoaders />,
    auth: false,
  },
];
