import { useGetQueries } from "../../../hooks/useGetQueries";
import usePageRouter from "../../../hooks/useObjectRouter";
import { ArrowLeftIcon } from "@mui/x-date-pickers-pro";
import { useQuery } from "react-query";
import authService from "../../../services/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useMemo } from "react";
import { authActions } from "../../../store/auth/auth.slice";
import { getThemeColors } from "../../../constants/theme";
import CModal from "../../../components/CElements/CModal";
import Login from "../../../views/Auth/Login";
import { RootState } from "../../../store/types";

export const BackButtonRoute = () => {
  const { fromRoutes } = useGetQueries();
  const { progmatic } = usePageRouter();

  if (!fromRoutes) return "";

  return (
    <div
      className="fixed z-[100] left-[250px] top-[340px]"
      id="breathing-button"
    >
      <button
        onClick={() => progmatic()}
        className="custom-btn form text-2xl hover:bg-[var(--primary)] duration-200"
      >
        <ArrowLeftIcon style={{ fontSize: "40px" }} />
        Возвращаться
      </button>
    </div>
  );
};

export const GetUserInfo = () => {
  const dispatch = useDispatch();
  const { data: userInfo, refetch } = useQuery(["GET_USER"], () => {
    return authService.getUserInfo();
  });
  const userInfoStored = useSelector((state: any) => state.auth.user);

  const permissions = useMemo(() => {
    const roles = userInfo?.data?.roles;
    if (!roles?.length) return [];
    const list: any = [];

    roles.forEach((role: any) => {
      role.permissions.forEach((permission: any) => {
        list.push({
          ...permission,
          value: permission?.name?.substring(0, permission.name.indexOf("#")),
          permission: permission?.name?.substring(
            permission.name.indexOf("#") + 1
          ),
          permissions: [],
        });
      });
    });

    const combinedObjects: any = {};

    list.forEach((obj: any) => {
      if (combinedObjects[obj.value]) {
        combinedObjects[obj.value].permissions.push(obj.permission);
      } else {
        combinedObjects[obj.value] = { ...obj, permissions: [obj.permission] };
        delete combinedObjects[obj.value].permission;
      }
    });

    const result = Object.values(combinedObjects);

    return result;
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo?.data) return;
    dispatch(authActions.setUser({ ...userInfo?.data, permissions }));
  }, [userInfo]);

  return {
    userInfo: userInfo?.data || userInfoStored,
    refetchUserInfo: refetch,
  };
};

export const ColorData = memo(() => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const currentColors = getThemeColors(isDarkMode);

    // Set theme attribute
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );

    // Set CSS variables
    (Object.keys(currentColors) as (keyof typeof currentColors)[]).forEach(
      (key) => {
        document.documentElement.style.setProperty(
          "--" + key,
          currentColors[key]
        );
      }
    );
  }, [isDarkMode]);

  return "";
});

export const CheckLogin = () => {
  const link = useSelector((state: any) => state.auth.link);
  const dispatch = useDispatch();

  return (
    <CModal
      open={!!link}
      footerActive={false}
      handleClose={() => dispatch(authActions.setLink(""))}
    >
      <Login />
    </CModal>
  );
};
