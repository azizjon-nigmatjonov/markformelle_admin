import { useMutation, useQuery } from "react-query";
import adminService from "../../../../services/admins";
import roleService from "../../../../services/rolls";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { websiteActions } from "../../../../store/website";
import usePageRouter from "../../../../hooks/useObjectRouter";
import axios from "axios";
import useCQuery from "../../../../hooks/useCQuery";

export const FetchFunction = ({ userId }: { userId: string }) => {
  const { data: rolls } = useQuery(["GET_ROLLS_LIST"], () => {
    return roleService.getList();
  });

  const { data: users } = useCQuery({
    key: `GET_USERS_LIST`,
    endpoint: `http://localhost:3000/users`,
    params: {},
  });

  const SelectOptions = useMemo(() => {
    if (!rolls) return [];
    const arr = rolls?.data ?? [];
    return arr.map((item: any) => {
      return {
        ...item,
        label: item.name,
        value: item.id,
      };
    });
  }, [rolls]);

  const defaultValues: any = useMemo(() => {
    if (users?.length) {
      return users.find((item: any) => item.id == userId);
    } else {
      return {};
    }
  }, [users]);

  return { rolls: SelectOptions, defaultValues };
};

export const SubmitFunction = ({
  refetch,
  reset,
}: {
  reset: any;
  refetch: () => void;
}) => {
  const { navigateQuery } = usePageRouter();
  const dispatch = useDispatch();

  const HandleSuccess = (title: string) => {
    dispatch(
      websiteActions.setAlertData({
        title: title,
        translation: "common",
      })
    );

    navigateQuery({ id: "" });
    refetch();
    reset();
  };

  const { mutate: adminCreate, isLoading: updateCreating } = useMutation({
    mutationFn: (user: any) => {
      const data: any = [];
      axios
        .post("http://localhost:3000/users", user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          HandleSuccess("Пользователь создан");
          data.push(res.data);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });

      return data;
    },
  });

  const { mutate: adminUpdate, isLoading: updateLoading } = useMutation({
    mutationFn: (data: any) => {
      const result: any = [];
      axios
        .put(`http://localhost:3000/users/${data.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          HandleSuccess("Пользователь создан");
          result.push(res.data);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });

      return result;
    },
  });

  const submitForm = (data: any) => {
    data.phone = data.phone.substring(1).replace(/\s+/g, "");
    const params = data;

    adminCreate(params);
  };

  const updateForm = (data: any, id: string) => {
    data.phone = data.phone.substring(1).replace(/\s+/g, "");
    const params = data;
    params.id = id;

    adminUpdate(params);
  };
  return { submitForm, updateForm, isLoading: updateLoading || updateCreating };
};
