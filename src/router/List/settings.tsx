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
  },
  {
    parent: "settings",
    link: "language",
    sidebar: true,
    title: "Языковые настройки",
    permissions: ["search", "test"],
    icon: "globus",
    parent_icon: <img width={20} src="/images/settings.png" alt="settings" />,
    element: <LanguagesPage />,
    auth: true,
  },
  {
    parent: "settings",
    link: "profile",
    sidebar: false,
    title: "Профиль",
    icon: "profile",
    element: <Profile />,
    auth: false,
  },
  {
    parent: "settings",
    link: "additional_functions",
    sidebar: false,
    title: "additional_functions",
    icon: "",
    element: "",
    auth: true,
  },
];
