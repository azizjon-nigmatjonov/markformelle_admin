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

const defObj: any = {
  KEYWORD: "",
  UZ: "",
  RU: "",
  EN: "",
  TU: "",
  status: "new",
};

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
  const AddNewColumn = ({
    listTable,
    setListTable,
  }: {
    listTable: any;
    setListTable: (val: any) => void;
  }) => {
    const newArr = [defObj, ...listTable].map((item: {}, index: number) => {
      return {
        ...item,
        index: index + 1,
      };
    });
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
            ? "KEYWORD"
            : val === "tu"
            ? "Turkish"
            : "English"}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
    );
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

  const handleDelete = async (KEYWORD: string[]) => {
    axios
      .delete(`${API_URL}`)
      .then(() => {})
      .catch((error) => {
        console.error("Error adding route:", error);
      });

    try {
      await axios.delete(`${API_URL}/translation/batch`, {
        method: "DELETE",
        url: `${API_URL}/translation/batch`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          keywords: KEYWORD,
        },
      });
      toast.success("Muvaffaqiyatli amalga oshirildi!");
      refetch();
      dispatch(translateActions.setTranslation([]));
    } catch (error) {
      toast.error("O'chirib bo'lmaydi");
    }
  };

  return {
    AddNewColumn,
    GetTitle,
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
      .get(`${API_URL}/translation/?limit=1000&page=0`)
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
        const newData = [...newArr, ...data.data].map(
          (item: {}, index: number) => {
            return {
              ...item,
              index: index + 1,
            };
          }
        );

        setListTable(newData);
        setCount(data?.count);

        localStorage.setItem("translations", JSON.stringify(newData));
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
