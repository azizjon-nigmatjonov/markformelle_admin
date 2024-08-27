import { lazy } from "react";
const WebsiteSettings = lazy(() => import("../../views/Settings/Website"));
const Profile = lazy(() => import("../../views/Settings/Profile"));

export const settingList = [
  {
    parent: "settings",
    link: "website",
    sidebar: true,
    title: "website_settings",
    icon: "settings",
    parent_icon: "price_control",
    element: <WebsiteSettings />,
    auth: true,
  },
  {
    parent: "settings",
    link: "profile",
    sidebar: false,
    title: "Profile page",
    icon: "profile",
    element: <Profile />
  },
  {
    parent: "settings",
    link: "additional_functions",
    sidebar: false,
    title: "additional_functions",
    icon: "",
    element: "",
    permissions: ["notification_sound", "profile_info", "show_notification"],
  },
];
