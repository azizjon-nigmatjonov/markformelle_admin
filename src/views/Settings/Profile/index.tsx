import { useForm } from "react-hook-form";
import CCard from "../../../components/CElements/CCard";
import CImageUpload from "../../../components/CElements/CImageUpload";
import HFTextField from "../../../components/HFElements/HFTextField";
import HFInputMask from "../../../components/HFElements/HFInputMask";
import CustomBtn from "../../../components/CElements/CustomBtn";
import { LogoutIcon } from "../../../components/UI/IconGenerator/Svg";
import { useState } from "react";
import CModal from "../../../components/CElements/CModal";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import { useTranslation } from "react-i18next";
import usePageRouter from "../../../hooks/useObjectRouter";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { breadCrumbItems } from "./Logic";
import CTabs from "../../../components/CElements/CTab";
import WebsiteSettings from "../Website";
import LanguagesPage from "../Languages";
import { useGetQueries } from "../../../hooks/useGetQueries";
import { HFMultipleSelect } from "../../../components/HFElements/HFMultipleSelect";

const TabList = [
  {
    name: "profile",
    id: "profile",
  },
  {
    name: "language_translation",
    id: "translation",
  },
  {
    name: "system_settings",
    id: "system",
  },
];

const Profile = () => {
  const [logout, setLogout] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const { t } = useTranslation();
  const { tab } = useGetQueries();

  const dispatch = useDispatch();
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { navigateTo } = usePageRouter();
  const Logout = () => {
    dispatch(authActions.logout());
    setTimeout(() => {
      navigateTo("/");

      window.location.reload();
    }, 500);
  };

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>

      <form className="p-2">
        <CCard style={{ minHeight: "auto" }}>
          <CTabs tabList={TabList} currentTab={tab} passRouter={true} />

          {tab === "system" ? (
            <WebsiteSettings />
          ) : tab === "translation" ? (
            <LanguagesPage />
          ) : (
            <div className="flex justify-between mt-5">
              <div className="flex items-center space-x-8">
                <div className="w-[150px]">
                  <CImageUpload
                    name="image_id"
                    // setValue={setValue}
                    // defaultValue={user?.image}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 w-[600px]">
                  <HFTextField
                    name="name"
                    control={control}
                    placeholder={t("name")}
                    label={t("name")}
                    setValue={setValue}
                    required={true}
                    defaultValue={user?.name}
                    errors={errors}
                  />
                  <HFInputMask
                    name="phone"
                    control={control}
                    label={t("phone_number")}
                    placeholder={t("phone_number")}
                    required={true}
                    mask={"+\\9\\9\\8 99 999 99 99"}
                    setValue={setValue}
                    defaultValue={user?.phone}
                    errors={errors}
                  />
                  <HFTextField
                    name="email"
                    control={control}
                    placeholder={t("login")}
                    label={t("login")}
                    setValue={setValue}
                    required={true}
                    defaultValue={user?.email}
                    type="email"
                    errors={errors}
                  />
                  <HFMultipleSelect
                    name="roles"
                    control={control}
                    options={user?.roles?.map((item: any) => {
                      return {
                        value: item,
                        label: item,
                      };
                    })}
                    label="Роль пользователя"
                    placeholder="Роль пользователя"
                    required={true}
                    setValue={setValue}
                    defaultValue={user?.roles}
                  />
                </div>
              </div>
              <div>
                <CustomBtn
                  text={t("logout_profile")}
                  icon={<LogoutIcon />}
                  handleClick={() => setLogout(true)}
                  type="button"
                />
              </div>
            </div>
          )}
        </CCard>

        {/* <div className="flex justify-end">
          <div className="mt-5 inline-block">
            <button
              type="submit"
              className={`custom-btn ${
                !checkPermission("edit") ? "unpermit" : ""
              }`}
            >
              <EditIcon />
              <span className="ml-2">{t("edit")}</span>
            </button>
          </div>
        </div> */}

        <CModal
          open={logout}
          handleClose={() => setLogout(false)}
          footerActive={false}
        >
          <p className="text-[var(--danger)] font-medium">
            {t("want_l_account")}
          </p>

          <div className="grid gap-2 grid-cols-2 mt-8">
            <button className="cancel-btn" onClick={() => setLogout(false)}>
              {t("no")}
            </button>
            <button className="custom-btn" onClick={() => Logout()}>
              {t("yes")}
            </button>
          </div>
        </CModal>
      </form>
    </>
  );
};

export default Profile;
