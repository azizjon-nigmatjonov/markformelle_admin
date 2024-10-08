import { useForm } from "react-hook-form";
import CCard from "../../../components/CElements/CCard";
import CImageUpload from "../../../components/CElements/CImageUpload";
import HFTextField from "../../../components/HFElements/HFTextField";
import HFInputMask from "../../../components/HFElements/HFInputMask";
import CustomBtn from "../../../components/CElements/CustomBtn";
import { EditIcon, LogoutIcon } from "../../../components/UI/IconGenerator/Svg";
import { useState } from "react";
import CModal from "../../../components/CElements/CModal";
import CancelButton from "../../../components/UI/Buttons/Cancel";
import { usePermissions } from "../../../hooks/usePermissions";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth.slice";
import { useTranslation } from "react-i18next";
import usePageRouter from "../../../hooks/useObjectRouter";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { breadCrumbItems } from "./Logic";

const Profile = () => {
  const [logout, setLogout] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const { checkPermission } = usePermissions();
  const { navigateTo } = usePageRouter();
  const Logout = () => {
    dispatch(authActions.logout());
    navigateTo("/");
    sessionStorage.removeItem("has_route");
    window.location.reload();
  };

  return (
    <>
      <Header
        extra={<CBreadcrumbs items={breadCrumbItems} progmatic={true} />}
      ></Header>
      <form className="container">
        <CCard style={{ minHeight: "auto" }}>
          <div className="flex justify-between">
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
                  // defaultValue={user?.name}
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
                  // defaultValue={user?.phone}
                  errors={errors}
                />
                <HFTextField
                  name="email"
                  control={control}
                  placeholder={t("login")}
                  label={t("login")}
                  setValue={setValue}
                  required={true}
                  // defaultValue={user?.email}
                  type="email"
                  errors={errors}
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

          <h2 className="mt-10 font-medium mb-2 text-2xl">
            {t("set_new_password")}
          </h2>
          <div className="w-1/2 grid grid-cols-2 gap-4">
            <HFTextField
              name="old_password"
              control={control}
              placeholder={t("password")}
              label={t("password")}
              setValue={setValue}
            />
            <HFTextField
              name="new_password"
              control={control}
              placeholder={t("new_password")}
              label={t("new_password")}
              setValue={setValue}
            />
          </div>
        </CCard>

        <div className="flex justify-end">
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
        </div>

        <CModal
          open={logout}
          handleClose={() => setLogout(false)}
          footerActive={false}
        >
          <p className="text-[var(--danger)] font-medium">
            {t("do_you_want_to_leave_account")}
          </p>

          <div className="grid gap-2 grid-cols-2 mt-8">
            <CancelButton text="no" onClick={() => setLogout(false)} />
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
