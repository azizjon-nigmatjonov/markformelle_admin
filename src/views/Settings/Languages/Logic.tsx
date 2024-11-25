import { useState } from "react";
import {
  EnglishFlag,
  RussionFlag,
  UzbekFlag,
} from "../../../components/UI/IconGenerator/Svg/Machines";
import { SettingIcon } from "../../../components/UI/IconGenerator/Svg/Sidebar";
import { useCMutation } from "../../../hooks/useCMutation";
import useCQuery from "../../../hooks/useCQuery";

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

export const HandleTable = () => {
  const obj: any = {
    key: "",
    id: 0,
    value: {
      uz: "",
      ru: "",
      en: "",
    },
  };

  const AddNewColumn = ({
    listTable,
    setListTable,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
  }) => {
    const id = listTable?.length
      ? listTable.length + "-" + listTable[listTable?.length - 1].id
      : "-";
    obj.id = id;
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
      ) : (
        <EnglishFlag />
      );

    return (
      <div className="flex items-center space-x-2 uppercase w-full justify-center">
        <span>{val}</span>
        <span className="text-2xl">{icon}</span>
      </div>
    );
  };

  const WriteValue = ({
    listTable = [],
    setListTable,
    value,
    key,
    id,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
    id: any;
    value: any;
    key: string;
  }) => {
    if (value) {
      const obj = listTable?.find((el: any) => el.id === id);

      if (key === "key") {
        obj.key = value;
      } else {
        obj.value[key] = value;
      }

      const arr = listTable?.map((item: any) => {
        delete item.value["error_" + key];

        if (item.id === id) {
          return { ...obj };
        } else return { ...item };
      });

      setListTable(arr);
    }
  };

  return { AddNewColumn, GetTitle, WriteValue, DeleteColumn };
};

export const GetTranslations = () => {
  const [data, setData] = useState([]);
  const { isLoading, refetch } = useCQuery({
    key: "resources_translations",
    endpoint: "/resources/translations",
    params: { type: "" },
    options: {
      onSuccess: (data: any) => {
        setData(data);
      },
    },
  });

  return { translations: data ?? [], isLoading, refetch };
};
