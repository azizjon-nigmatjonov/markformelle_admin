import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const usePermissions = () => {
  const userInfo = useSelector((state: any) => state.auth.user);
  const userRolls = useSelector((state: any) => state.auth.rolls);
  const location = useLocation();

  const Permissions = useMemo(() => {
    if (!userRolls?.length) return {};
    let permissions: any = [];
    userRolls?.forEach((el: any) => {
      const arr = el.routes;

      for (let obj of arr) {
        permissions.push(obj);
      }
    });

    return permissions;
  }, [userRolls]);

  const CurrentList: any = useMemo(() => {
    if (!Permissions?.length) return [];
    let locationName = location.pathname.substring(1);
    const arr = locationName.split("/");
    if (arr.length > 2) {
      if (arr[2] !== "add") {
        locationName = arr[0] + "/" + arr[1] + "/:id";
      }
    }

    return (
      Permissions.find((item: { id: string }) => item.id === locationName) ?? []
    );
  }, [location, Permissions]);
  const checkAdditionals = (permission: string) => {
    return true;
    if (userInfo?.roles?.includes("superadmin")) return true;
    const current =
      Permissions?.permissions?.["settings/additional_functions"]?.checked;
    return current?.includes(permission);
  };

  const checkPermission = (permission: string) => {
    return true;
    if (userInfo?.roles?.includes("superadmin")) return true;
    if (!userRolls?.length) return true;
    return CurrentList?.permissions?.[permission]?.checked;
  };
  return {
    routePermissions: CurrentList ?? [],
    checkPermission,
    checkAdditionals,
  };
};
