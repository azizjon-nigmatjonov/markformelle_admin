import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import usePageRouter from "../../../../../hooks/useObjectRouter";
import { GetUserInfo } from "../../../../../layouts/MainLayout/Logic";
import useCQuery from "../../../../../hooks/useCQuery";
import axios from "axios";

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
  const [rollData, setRollData]: any = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id !== ":create") {
      axios
        .get(`http://192.168.181.29:3000/rolls/${id}`)
        .then((res) => {
          setRollData(res?.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return {
    rollData: rollData ?? {},
    rollLoadin: loading,
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
