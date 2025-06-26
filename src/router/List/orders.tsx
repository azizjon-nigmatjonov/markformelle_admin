import { OrderList } from "../../views/Orders/Chemicals";

export const ordersSection = [
  {
    parent: "orders",
    link: "list",
    sidebar: true,
    title: "orders",
    parent_icon: "/images/chemical.webp",
    icon: "/images/addchemical.webp",
    element: <OrderList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
