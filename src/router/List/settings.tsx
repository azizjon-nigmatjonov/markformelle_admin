import WebsiteSettings from "../../views/Settings/Website";
import Profile from "../../views/Settings/Profile";

export const settingList = [
  {
    parent: "settings",
    link: "website",
    sidebar: true,
    title: "Системные настройки",
    icon: "settings",
    parent_icon: "settings",
    element: <WebsiteSettings />,
    auth: true,
  },
  {
    parent: "settings",
    link: "language",
    sidebar: true,
    title: "Языковые настройки",
    icon: "globus",
    element: <WebsiteSettings />,
    auth: true,
  },
  {
    parent: "settings",
    link: "profile",
    sidebar: false,
    title: "Profile page",
    icon: "profile",
    element: <Profile />,
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
