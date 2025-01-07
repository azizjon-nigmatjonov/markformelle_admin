import WebsiteSettings from "../../views/Settings/Website";
import Profile from "../../views/Settings/Profile";
import LanguagesPage from "../../views/Settings/Languages";

export const settingList = [
  {
    parent: "settings",
    link: "website",
    sidebar: true,
    title: "Системные настройки",
    icon: "settings",
    parent_icon: <img width={20} src="/images/settings.png" alt="settings" />,
    element: <WebsiteSettings />,
    auth: true,
    permissions: ["view_page"],
  },
  {
    parent: "settings",
    link: "language",
    sidebar: true,
    title: "Языковые настройки",
    icon: "globus",
    parent_icon: <img width={20} src="/images/settings.png" alt="settings" />,
    element: <LanguagesPage />,
    auth: true,
    permissions: ["view_page", "add", "edit"],
  },
  {
    parent: "settings",
    link: "profile",
    sidebar: false,
    title: "Профиль",
    icon: "profile",
    element: <Profile />,
    auth: false,
    permissions: ["view_page"],
  },
  {
    parent: "settings",
    link: "additional_functions",
    sidebar: false,
    title: "additional_functions",
    icon: "",
    element: "",
    auth: true,
    permissions: ["view_page"],
  },
];
