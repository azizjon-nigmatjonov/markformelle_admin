import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { EyeIcon } from "../../../../../components/UI/IconGenerator/Svg";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { useGetQueries } from "../../../../../hooks/useGetQueries";
import { useTranslation } from "react-i18next";
import { StaticPermissions } from "../../../../../constants/permissions";
import axios from "axios";
import useCQuery from "../../../../../hooks/useCQuery";

export const CreateFunction = ({
  handleClose,
  reset,
}: {
  handleClose?: any;
  reset?: any;
}) => {
  const { mutate: routeCreate, isLoading: createLoading } = useMutation({
    mutationFn: (data: any) => {
      const result: any = [];
      axios
        .post("http://localhost:3000/routes", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          result.push(res);
          handleClose();
          reset();
        })
        .catch((error) => {
          console.error("Error adding route:", error);
        });

      return result;
    },
  });
  const { mutate: permissionCreate, isLoading: permissionLoading } =
    useMutation({
      mutationFn: (data: any) => {
        const result: any = [];
        axios
          .put(`http://localhost:3000/permissions`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            handleClose();
            reset();
            result.push(res.data);
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });

        return result;
      },
    });

  const createRoute = (data: any) => {
    routeCreate(data);
  };

  const createPermission = (name: any, id: number, path: string) => {
    const params: any = {};
    params.name = path + "#" + name;
    params.id = id;

    // const isEqual = checkEquality(list, data);

    permissionCreate(params);
  };

  return {
    createRoute,
    isLoading: createLoading || permissionLoading,
    createPermission,
  };
};

export const DeleteFunction = ({ handleClose }: { handleClose: any }) => {
  const { mutate: permissionDelete, isLoading: permissionLoading } =
    useMutation({
      mutationFn: (data: any) => {
        const result: any = [];
        axios
          .delete(`http://localhost:3000/permissions`, {
            params: data,
          })
          .then((res) => {
            handleClose();
            result.push(res.data);
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });

        return result;
      },
    });

  const deleteRoute = (id: any) => {
    const data: any = { id };
    axios
      .delete(`http://localhost:3000/routes`, {
        params: data,
      })
      .then((res) => {
        handleClose();
        console.log(res);
      })
      .catch((error) => {
        console.error("Error adding route:", error);
      });
  };

  const deletePermission = (data: any) => {
    permissionDelete(data);
  };

  return {
    deletePermission,
    deleteRoute,
    isLoading: permissionLoading,
  };
};

const allRoutes = (list: any) => {
  const arr: any = [];
  for (const key in list) {
    list[key].forEach((item: any) => {
      if (!item.single_page) {
        arr.push(item);
      }
    });
  }

  return arr;
};

export const GetOptions = ({ newRouteList }: { newRouteList: any }) => {
  const newRoutes = useSelector((state: any) => state.website.new_routes);
  const [options, setOptions] = useState([]);
  const { navigateTo, navigateQuery } = usePageRouter();
  const { active } = useGetQueries();
  const { t } = useTranslation();

  const handViewClick = (element: any, index: number) => {
    navigateQuery({ active: index });
    setTimeout(() => {
      navigateTo(`/${element.path}?fromRoutes=/admins/routes`);
    }, 0);
  };

  useEffect(() => {
    const arr = allRoutes(newRoutes);

    const newArr: any = [];
    arr.forEach((element: any, index: number) => {
      const found = newRouteList.find(
        (item: any) => item.path === element.path
      );

      if (!found) {
        const obj = {
          title: `${t(element.parent)} > ` + element.title || element.path,
          label: (
            <div className="flex w-full justify-between items-center">
              <p
                className={
                  active == index ? "font-[600] text-[var(--primary)]" : ""
                }
              >
                <span className="font-[600]">{t(element.parent)}</span>
                {" > "}
                {element.title || "Sarlavha mavjud emas"}{" "}
              </p>
              <button
                onClick={() => handViewClick(element, index)}
                className={`duration-200 hover:scale-[1.5] ${
                  active == index ? "scale-[1.3]" : ""
                }`}
              >
                <EyeIcon
                  fill={active == index ? "var(--primary)" : "var(--gray90)"}
                />
              </button>
            </div>
          ),
          value: element.path,
        };
        newArr.push(obj);
      }
    });
    setOptions(newArr);
  }, [newRouteList]);

  return { options };
};

export const FetchFunction = () => {
  const {
    data: routes,
    isLoading,
    refetch,
  } = useCQuery({
    key: `GET_ROUTES_LIST`,
    endpoint: `http://localhost:3000/routes`,
    params: {},
  });

  const newRouteList: any = useMemo(() => {
    const list = routes?.map((route: any) => {
      const permissions = route.permissions?.map((permission: any) => {
        return {
          label: permission.name.substring(permission.name.indexOf("#") + 1),
          value: permission.name.substring(permission.name.indexOf("#") + 1),
        };
      });
      return {
        ...route,
        permissions: permissions ?? [],
      };
    });

    return list ?? [];
  }, [routes]);

  return { isLoading, refetch, newRouteList };
};

export const getPermissionList = ({
  list,
  path,
}: {
  list: any;
  path: string;
}) => {
  const newRoutes = useSelector((state: any) => state.website.new_routes);

  const permissionsList = useMemo(() => {
    const arr: any = [];
    const oldRoutes = allRoutes(newRoutes);

    const routePermissions =
      oldRoutes
        .find((item: any) => item.path === path)
        ?.permissions?.map((item: any) => {
          return {
            label: item,
            value: item,
          };
        }) ?? [];

    const permissions = [...routePermissions, ...StaticPermissions];

    permissions.forEach((element: any) => {
      const found = list.find((item: any) => item.value === element.value);

      if (!found) arr.push(element);
    });

    return arr;
  }, [list]);

  return { permissionOptions: permissionsList ?? [] };
};
