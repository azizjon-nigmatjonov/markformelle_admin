import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { GetUserInfo } from "../../../../../layouts/MainLayout/Logic";
import useCQuery from "../../../../../hooks/useCQuery";
import axios from "axios";
import { useSelector } from "react-redux";
import { StaticPermissions } from "../../../../../constants/permissions";
import _ from "lodash";

export const GetRoutes = ({ rollData = {} }: { rollData: any }) => {
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
          permission.id = item.id;
          obj[el] = permission;
        });

        arr.push(obj);
      });
    }

    setAllRoutes(arr);
  }, [newRoutes]);

  useEffect(() => {
    if (rollData?.id) {
      const newData: any = allRoutes?.map((item: any) => {
        const obj = { ...item };
        const foundRoute = rollData.routes?.find(
          (route: any) => route.id === item.id
        );
        obj.permissions.forEach((el: any) => {
          const permission: any = foundRoute?.permissions?.[el];
          obj[el] = permission
            ? permission
            : {
                checked: false,
                id: item.id,
                value: el,
              };
        });
        return obj;
      });

      setAllRoutes(newData);
    }
  }, [rollData]);

  const handleCheckBox = (obj: any) => {
    const newArr = allRoutes.map((item: any) => {
      const newObj = _.cloneDeep(item);

      if (newObj.path === obj.id) {
        if ("newPermissions" in newObj) {
          newObj.newPermissions[obj.value] = {
            ...obj,
            checked: !obj.checked,
          };
        } else {
          newObj.newPermissions = {
            [obj.value]: {
              ...obj,
              checked: !obj.checked,
            },
          };
        }
        newObj[obj.value].checked = !item[obj.value].checked;
      }

      return newObj;
    });

    setAllRoutes(newArr);
  };

  return { allRoutes, handleCheckBox };
};

export const breadCrumbs = ({ id }: { id: any }) => {
  const breadCrumbsItems = useMemo(() => {
    return [
      {
        label: "Ролы",
        link: "/access/rolls",
      },
      {
        label: id !== ":create" ? "Изменить роль" : "Создать новую роль",
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

  return {
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
