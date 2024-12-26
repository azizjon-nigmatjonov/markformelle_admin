import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { GetUserInfo } from "../../../../../layouts/MainLayout/Logic";
import useCQuery from "../../../../../hooks/useCQuery";
import axios from "axios";
import { useSelector } from "react-redux";
import { StaticPermissions } from "../../../../../constants/permissions";

export const GetRoutes = () => {
  const newRoutes = useSelector((state: any) => state.website.new_routes);
  const [allRoutes, setAllRoutes]: any = useState([]);

  useEffect(() => {
    const arr: any = [];
    for (const key in newRoutes) {
      newRoutes[key].forEach((item: any) => {
        const obj = { ...item };
        obj.permissions.forEach((el: any) => {
          const permission: any =
            StaticPermissions.find((item: any) => item.value === el) ?? {};
          permission.checked = false;
          permission.id = obj.id;
          obj[el] = permission ?? {};
        });

        arr.push(obj);
      });
    }

    setAllRoutes(arr);
  }, [newRoutes]);

  const handleCheckBox = (obj: any) => {
    console.log("1111", obj);
  };

  return { allRoutes, handleCheckBox };
};

export const breadCrumbs = ({ id }: { id: any }) => {
  const breadCrumbsItems = useMemo(() => {
    return [
      {
        label: "Admin",
        link: "/admins/admin",
      },
      {
        label: "Rollar",
        link: "/admins/rolls",
      },
      {
        label: id !== "create" ? "Rolni tahrirlash" : "Yangi rol yaratish",
      },
    ];
  }, [id]);

  return { breadCrumbsItems };
};

export const FetchFunction = ({ id }: { id: any | undefined }) => {
  const fetch = id === ":create" ? false : true;

  const { data: rollData, isLoading: rollLoading } = useCQuery({
    key: `GET_ROLL_DATA`,
    endpoint: `http://192.168.181.29:3000/rolls/${id}`,
    params: {},
    options: {
      enabled: fetch,
    },
  });

  const {
    data: routes,
    isLoading,
    refetch,
  } = useCQuery({
    key: `GET_ROUTES_LIST_FOR_ROLL`,
    endpoint: `http://192.168.181.29:3000/routes`,
    params: {},
  });

  const newRouteList: any = useMemo(() => {
    const list = routes?.map((route: any) => {
      return {
        ...route,
        permissions: route.permissions?.map((permission: any) => {
          return {
            ...permission,
            label: permission?.name?.substring(
              permission.name.indexOf("#") + 1
            ),
            value: permission?.name,
          };
        }),
      };
    });

    return list ?? [];
  }, [routes]);

  return {
    isLoading,
    refetch,
    newRouteList,
    rollData: fetch ? rollData : {},
    rollLoading,
  };
};

export const CreateFunction = ({ reset = () => {} }: { reset?: any }) => {
  const { navigateTo } = usePageRouter();
  const { refetchUserInfo } = GetUserInfo();

  const { mutate: rollCreate, isLoading: rollLoading } = useMutation({
    mutationFn: (data: any) => {
      const result: any = [];
      axios
        .post("http://192.168.181.29:3000/rolls", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          result.push(res);
          reset();
          refetchUserInfo();
          navigateTo("/access/rolls");
        })
        .catch((error) => {
          console.error("Error adding route:", error);
        });

      return result;
    },
  });

  const { mutate: rollUpdate, isLoading: updateRollLoading } = useMutation({
    mutationFn: (data: any) => {
      const result: any = [];
      axios
        .put(`http://192.168.181.29:3000/rolls/${data.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          result.push(res.data);
          reset();
          refetchUserInfo();
          navigateTo("/access/rolls");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });

      return result;
    },
  });

  const createRoll = (data: any) => {
    rollCreate(data);
  };

  const updateRoll = (data: any, id: any) => {
    data.id = id;
    rollUpdate(data);
  };

  return {
    createRoll,
    updateRoll,
    isLoading: rollLoading || updateRollLoading,
  };
};
