// import { useState } from "react";
import {
  EnglishFlag,
  RussionFlag,
  TurkishFlag,
  UzbekFlag,
} from "../../../components/UI/IconGenerator/Svg/Machines";
import { SettingIcon } from "../../../components/UI/IconGenerator/Svg/Sidebar";
import { useCMutation } from "../../../hooks/useCMutation";
import useCQuery from "../../../hooks/useCQuery";
import axios from "axios";
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
  };

  const AddNewColumn = ({
    listTable,
    setListTable,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
  }) => {
    setListTable([obj, ...listTable]);
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
        <SettingIcon fill="var(--black)" />
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
    id,
    key,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
    id: string;
    value: any;
    key: string;
  }) => {
    if (value) {
      const obj = listTable?.find((el: any) => el.KEYWORD === id);

      obj[key] = value;
      console.log("111", obj, key, id);
      const arr = listTable?.map((item: any) => {
        // delete item.value["error_" + id];

        if (item.KEYWORD === id) {
          return { ...obj };
        } else return { ...item };
      });

      setListTable(arr);
    }
  };

  const onSubmit = (data: any) => {
    axios
      .post(`${API_URL}/translation`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Error adding route:", error);
      });
  };

  const deleteTranslation = (key: string) => {
    axios.delete(`http://192.168.181.29:3000/translations/${key}`).then(() => {
      refetch();
    });
  };

  return {
    AddNewColumn,
    GetTitle,
    WriteValue,
    DeleteColumn,
    onSubmit,
    deleteTranslation,
  };
};

export const GetTranslations = ({
  setListTable,
  setCount,
}: {
  setListTable: (val: any) => void;
  setCount: (val: number) => void;
}) => {
  const { isLoading, refetch } = useCQuery({
    key: "resources_translations",
    endpoint: "http://10.40.14.193:8000/translation/",
    params: { type: "" },
    options: {
      onSuccess: (res: any) => {
        setListTable(res?.data);
        setCount(res?.count);
      },
    },
  });

  return { isLoading, refetch };
};
