// import Admins from "../../views/Admins/Admins";
import Rolls from "../../views/Admins/Rolls";
import NewRolls from "../../views/Admins/Rolls/AddRolls";
// import RoutePage from "../../views/Admins/RoutePage";
import Users from "../../views/Admins/Users";

export const adminList = [
  {
    parent: "access",
    link: "users",
    sidebar: true,
    title: "users",
    icon: "users",
    parent_icon: "/images/access.webp",
    element: <Users />,
    auth: true,
    permissions: ["view_page", "add", "delete", "edit"],
  },
  {
    parent: "access",
    link: "rolls",
    sidebar: true,
    title: "rolls",
    icon: "rolls_icon",
    parent_icon: "/images/access.webp",
    element: <Rolls />,
    auth: true,
    permissions: ["view_page", "add", "delete", "edit"],
  },
  {
    parent: "access",
    link: "rolls/create",
    sidebar: false,
    title: "rolls",
    icon: "",
    element: <NewRolls />,
    auth: true,
    permissions: ["view_page", "add", "delete", "edit"],
  },
  {
    parent: "access",
    link: "rolls/:id",
    sidebar: false,
    title: "edit_roll",
    icon: "",
    element: <NewRolls />,
    auth: true,
    permissions: ["view_page", "add", "delete", "edit"],
  },
];
