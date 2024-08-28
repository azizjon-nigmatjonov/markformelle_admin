import { lazy } from "react";
const Admins = lazy(() => import("../../views/Admins/Admins"));
const Users = lazy(() => import("../../views/Admins/Users"));
const Rolls = lazy(() => import("../../views/Admins/Rolls"));
const NewRolls = lazy(() => import("../../views/Admins/Rolls/AddRolls"));
const RoutePage = lazy(() => import("../../views/Admins/RoutePage"));

export const adminList = [
  {
    parent: "access",
    link: "admin",
    sidebar: true,
    title: "admins",
    icon: "admins",
    element: <Admins />,
    auth: true,
  },
  {
    parent: "access",
    link: "users",
    sidebar: true,
    title: "users",
    icon: "users",
    element: <Users />,
    auth: true,
  },
  {
    parent: "access",
    link: "rolls",
    sidebar: true,
    title: "rolls",
    icon: "rolls_icon",
    element: <Rolls />,
    auth: true,
  },
  {
    parent: "access",
    link: "rolls/create",
    sidebar: false,
    title: "rolls",
    icon: "",
    element: <NewRolls />,
    single_page: true,
  },
  {
    parent: "access",
    link: "rolls/:id",
    sidebar: false,
    title: "edit_roll",
    icon: "",
    element: <NewRolls />,
    single_page: true,
  },
  {
    parent: "access",
    link: "routes",
    sidebar: true,
    title: "pages",
    icon: "pages",
    element: <RoutePage />,
    permissions: ["add_permission", "delete_permisson"],
    auth: true,
  },
];
