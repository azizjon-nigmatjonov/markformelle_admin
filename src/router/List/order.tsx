import { OrderList } from "../../views/Orders/Orders";

export const oderList = [
  {
    parent: "orders",
    link: "orders",
    sidebar: true,
    title: "lists",
    parent_icon: "/images/order.png",
    icon: "/images/documents.webp",
    element: <OrderList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
