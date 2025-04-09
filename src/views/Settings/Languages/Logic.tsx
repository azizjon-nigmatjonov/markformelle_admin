// import { useState } from "react";

import toast from "react-hot-toast";
import {
  EnglishFlag,
  RussionFlag,
  TurkishFlag,
  UzbekFlag,
} from "../../../components/UI/IconGenerator/Svg/Machines";
import { SettingIcon } from "../../../components/UI/IconGenerator/Svg/Sidebar";
import { useCMutation } from "../../../hooks/useCMutation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { translateActions } from "../../../store/translation/translate.slice";
const API_URL = import.meta.env.VITE_TEST_URL;
export const CreateTranslasion = () => {
  const { mutate: create } = useCMutation({
    key: "resources_translations_create",
    method: "POST",
    endpoint: "/resources/translations",
  });

  const createTranslation = ({
    listTable,
    setListTable,
    restart,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
    restart: () => void;
  }) => {
    let is_error = false;
    const arr = listTable.map((item: any) => {
      if (!item.key || !item.value.uz || !item.value.ru || !item.value.en) {
        if (!item.key) item.value.error_key = true;
        if (!item.value.uz) item.value.error_uz = true;
        if (!item.value.ru) item.value.error_ru = true;
        if (!item.value.en) item.value.error_en = true;
        is_error = true;
      } else {
        delete item.id;
      }
      return { ...item };
    });
    if (is_error) {
      setListTable(arr);
      return;
    }

    create(
      {
        payload: arr,
      },
      {
        onSuccess: () => {
          restart();
        },
      }
    );
  };

  return { createTranslation };
};

export const HandleTable = ({ refetch }: { refetch: () => void }) => {
  const obj: any = {
    KEYWORD: "",
    UZ: "",
    RU: "",
    EN: "",
    TU: "",
    status: "new",
  };

  const AddNewColumn = ({
    listTable,
    setListTable,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
  }) => {
    const newArr = [obj, ...listTable];
    setListTable(newArr);
  };

  const DeleteColumn = ({
    listTable,
    setListTable,
    id,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
    id: any;
  }) => {
    const arr = listTable?.filter((item: any) => item.id !== id);
    setListTable(arr);
  };

  const GetTitle = ({ val = "" }: any) => {
    if (!val) return;
    const icon =
      val === "key" ? (
        <SettingIcon fill="var(--gray)" />
      ) : val === "uz" ? (
        <UzbekFlag />
      ) : val === "ru" ? (
        <RussionFlag />
      ) : val === "tu" ? (
        <TurkishFlag />
      ) : (
        <EnglishFlag />
      );

    return (
      <div className="flex items-center space-x-2 uppercase w-full justify-center">
        <span className="font-medium">
          {val === "ru"
            ? "Русский"
            : val === "uz"
            ? "O'zbekcha"
            : val === "key"
            ? "Key"
            : val === "tu"
            ? "Turkish"
            : "English"}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
    );
  };

  const WriteValue = ({
    listTable = [],
    setListTable,
    value,
    ID,
    key,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
    ID: number;
    value: any;
    key: string;
  }) => {
    const newObj: any = listTable?.find((el: any) => el.ID === ID);
    if (!newObj.KEYWORD.trim()) newObj.status = "new";

    newObj[key] = value;

    if (newObj?.status !== "new") newObj.status = "update";
    const arr = listTable?.map((item: any) => {
      if (item.ID === ID) {
        return { ...newObj };
      } else return { ...item };
    });

    setListTable(arr);
  };

  const onSubmit = (data: any) => {
    axios
      .post(
        `${API_URL}/translation/batch`,
        { translations: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.error("Error adding route:", error);
      })
      .finally(() => refetch());
  };

  const onUpdate = (data: any) => {
    axios
      .put(
        `${API_URL}/translation/batch`,
        { translations: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.error("Error adding route:", error);
      })
      .finally(() => refetch());
  };

  const dispatch = useDispatch();
  const handleDelete = (KEYWORD: string) => {
    axios
      .delete(`${API_URL}/translation/${KEYWORD}`)
      .then(() => {
        refetch();
        dispatch(translateActions.setTranslation([]));
      })
      .catch((error) => {
        console.error("Error adding route:", error);
      });
  };

  return {
    AddNewColumn,
    GetTitle,
    WriteValue,
    DeleteColumn,
    onSubmit,
    onUpdate,
    handleDelete,
  };
};

export const GetTranslations = ({
  setListTable,
  setCount = () => {},
  storedTranslation = [],
  editFields,
}: {
  setListTable: (val: any) => void;
  setCount: (val: number) => void;
  storedTranslation: object[];
  editFields: () => void;
}) => {
  const [isLoading, setisLoading] = useState(false);

  const refetch = () => {
    setisLoading(true);
    axios
      .get("http://10.40.14.193:8000/translation/")
      .then((res: any) => {
        const data = res?.data;
        const newArr: any = [];
        if (!data?.data?.length) return;

        storedTranslation?.forEach((el: any) => {
          if (
            !data.data.find(
              (item: { KEYWORD: string }) => item.KEYWORD === el.KEYWORD
            )
          ) {
            newArr.push({ ...el, status: "new" });
          }
        });

        if (newArr.length) editFields();
        const newData = [...newArr, ...data.data];
        setListTable(newData);
        setCount(data?.count);
      })
      .catch(() => {
        toast.error("Ошибка из бэкэнда");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return { isLoading, refetch };
};
