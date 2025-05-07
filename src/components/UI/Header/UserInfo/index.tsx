import cls from "./style.module.scss";
import ImageFrame from "../../ImageFrame";
import { useTranslation } from "react-i18next";
// import { usePermissions } from "../../../../hooks/usePermissions";
interface Props {
  userInfo: any;
  collapsed: boolean;
  wideSidebar: boolean;
  handleNavigate: (val: any) => void;
}

const UserInfo = ({
  userInfo = [],
  collapsed = false,
  wideSidebar = false,
  handleNavigate,
}: Props) => {
  const { t } = useTranslation();
  const locationName = location.pathname.substring(1);
  // const { checkAdditionals } = usePermissions();

  // if (!checkAdditionals("profile_info")) return <></>;

  return (
    <div
      className={cls.wrapper}
      onClick={() => handleNavigate({ auth: true, path: "/settings/profile" })}
    >
      <div
        className={`flex items-center ${
          wideSidebar
            ? "px-3 space-x-4"
            : collapsed
            ? "justify-center w-full"
            : "space-x-[10px]"
        }`}
      >
        <div className={cls.image}>
          <ImageFrame gender="m" image={userInfo?.image} />
        </div>
        {wideSidebar && (
          <div className={cls.content}>
            <p
              className={`${
                locationName === "settings/profile" ? "text-[var(--main)]" : ""
              }`}
            >
              {t("settings")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
