import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const usePermissions = () => {
  const userInfo = useSelector((state: any) => state.auth.user);
  const userRolls = useSelector((state: any) => state.auth.rolls);
  const location = useLocation();

  const Permissions = useMemo(() => {
    if (!userRolls?.length) return {};
    let permissions: any = {};
    userRolls?.forEach((el: any) => {
      const permissionObj = el.permissions;

      for (let pKey in permissionObj) {
        if (pKey in permissions) {
          for (let pWord of permissionObj[pKey]) {
            if (!permissions[pKey].includes(pWord)) {
              permissions[pKey].push(pWord);
            }
          }
        } else {
          permissions[pKey] = permissionObj[pKey];
        }
      }
    });

    return permissions;
  }, [userRolls]);

  const CurrentList = useMemo(() => {
    if (!Object.values(Permissions)?.length) return [];
    let locationName = location.pathname.substring(1);
    const arr = locationName.split("/");
    if (arr.length > 2) {
      if (arr[2] !== "add") {
        locationName = arr[0] + "/" + arr[1] + "/:id";
      }
    }

    return Permissions[locationName] ?? [];
  }, [location, Permissions]);

  const checkAdditionals = (permission: string) => {
    if (userInfo?.roles?.includes("superadmin")) return true;
    const current = Permissions["settings/additional_functions"];
    return current?.includes(permission);
  };

  const checkPermission = (permission: string) => {
    if (userInfo?.roles?.includes("superadmin")) return true;
    if (!userRolls?.length) return true;
    return CurrentList?.includes(permission);
  };
  return {
    routePermissions: CurrentList ?? [],
    checkPermission,
    checkAdditionals,
  };
};
