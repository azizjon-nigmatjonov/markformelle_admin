import { useMemo, useRef, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { GetTranslations, HandleTable } from "./Logic";
import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
import {
  DeleteIcon,
  EditIcon,
  SaveIcon,
} from "../../../components/UI/IconGenerator/Svg";
import { useDispatch, useSelector } from "react-redux";
import { translateActions } from "../../../store/translation/translate.slice";

const defaults = {
  RU: "",
  TU: "",
  EN: "",
  UZ: "",
  KEYWORD: "",
};

const LanguagesPage = () => {
  const dispatch = useDispatch();
  const [listTable, setListTable]: any = useState([]);
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const storedTranslation = useSelector(
    (state: any) => state.translation.translation
  );
  const [lastUpdaters, setLastUpdaters] = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    edit: false,
    page: 1,
    perPage: 200,
    title: "Таблица языки",
  });
  const { isLoading, refetch } = GetTranslations({
    setListTable,
    setCount,
    storedTranslation,
  });

  const {
    AddNewColumn,
    GetTitle,
    WriteValue,
    onSubmit,
    onUpdate,
    handleDelete,
    deleteTranslation,
  } = HandleTable({
    refetch,
  });
  const handleValue = useDebounce((value: any, id: string, key: string) => {
    WriteValue({
      listTable,
      setListTable,
      value,
      id,
      key,
      setLastUpdaters,
      lastUpdaters,
    });
  }, 300);
  const handleSubmit = () => {
    const newErrors: string[] = [];
    const newArr = listTable.map((element: any) => {
      element.errors = [];
      for (let key in defaults) {
        if (!element[key]?.trim()) {
          element[key] = "";
          element.errors.push(key);
          newErrors.push(element.KEYWORD);
        } else {
          newErrors.filter((el: string) => el !== element.KEYWORD);
          element[key] = element[key];
        }
      }
      return element;
    });

    setListTable(newArr);
    console.log("lastUpdaters", lastUpdaters);
    // if (!newErrors.length) {
    const currObj = listTable.find(
      (_: any, index: number) => index + 1 === filterParams.currentIndex
    );

    if (filterParams.currentIndex !== 1) {
      onUpdate(currObj);
    } else {
      onSubmit(lastUpdaters);
    }
    setFilterParams({
      ...filterParams,
      edit: false,
      currentIndex: undefined,
    });
    // dispatch(translateActions.setTranslation(newArr));
    localStorage.setItem("translations", JSON.stringify(newArr));
    // }
  };

  const headColumns = useMemo(() => {
    const list: any = [
      {
        renderHead: () => <GetTitle val="key" />,
        id: ["KEYWORD", "index", "errors"],
        width: 260,
        render: ([key, index, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              <div className="w-full flex justify-center">
                {(filterParams.edit && index === filterParams.currentIndex) ||
                errors?.includes("KEYWORD") ? (
                  <input
                    className={`input-design font-medium ${
                      errors?.includes("KEYWORD") ? "error" : ""
                    }`}
                    onChange={(e) => {
                      handleValue(e.target.value, key, "KEYWORD");
                    }}
                    ref={inputRef}
                    defaultValue={key}
                  />
                ) : (
                  key
                )}
              </div>
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="ru" />,
        id: ["KEYWORD", "RU", "index", "errors"],
        width: 260,
        render: ([id, val, index, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {(filterParams.edit && index === filterParams.currentIndex) ||
              errors?.includes("RU") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("RU") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, id, "RU");
                  }}
                  defaultValue={val}
                />
              ) : (
                val
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="uz" />,
        id: ["KEYWORD", "UZ", "index", "errors"],
        width: 260,
        render: ([id, val, index, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {(filterParams.edit && index === filterParams.currentIndex) ||
              errors?.includes("UZ") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("UZ") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, id, "UZ");
                  }}
                  defaultValue={val}
                />
              ) : (
                val
              )}
            </div>
          );
        },
      },

      {
        renderHead: () => <GetTitle val="en" />,
        id: ["KEYWORD", "EN", "index", "errors"],
        width: 260,
        render: ([id, val, index, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {(filterParams.edit && index === filterParams.currentIndex) ||
              errors?.includes("EN") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("EN") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, id, "EN");
                  }}
                  defaultValue={val}
                />
              ) : (
                val
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="tu" />,
        id: ["KEYWORD", "TU", "index", "errors"],
        width: 260,
        render: ([id, val, index, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {(filterParams.edit && index === filterParams.currentIndex) ||
              errors?.includes("TU") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("TU") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, id, "TU");
                  }}
                  defaultValue={val}
                />
              ) : (
                val
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => "Actions",
        id: ["index", "KEYWORD", "actions"],
        width: 260,
        render: ([index, key]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center space-x-5">
              <button
                type="button"
                onClick={() => {
                  if (filterParams.currentIndex === index) {
                    handleSubmit();
                  } else {
                    setFilterParams({
                      ...filterParams,
                      edit: false,
                    });
                    setTimeout(() => {
                      setFilterParams({
                        ...filterParams,
                        edit: true,
                        currentIndex: index,
                      });
                    }, 0);
                  }
                }}
              >
                {filterParams.currentIndex === index ? (
                  <SaveIcon fill="var(--primary)" />
                ) : (
                  <EditIcon fill="var(--main)" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(key);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          );
        },
      },
    ];
    return list;
  }, [listTable, filterParams.edit]);

  const handleActions = (el: any, type: string) => {
    if (type === "delete") {
      deleteTranslation(el.key);
    }
    if (type === "modal") {
      AddNewColumn({ listTable, setListTable });
    }
  };
  const openHeader = useSelector((state: any) => state.sidebar.openHeader);
  return (
    <>
      <div className="p-2">
        <CNewTable
          key={filterParams.edit ? "edit" : "view"}
          isLoading={isLoading}
          headColumns={headColumns}
          title="Таблица языки"
          defaultFilters={["excel_upload", "excel_download"]}
          bodyColumns={listTable}
          filterParams={filterParams}
          isResizeble={false}
          handleFilterParams={setFilterParams}
          handleActions={handleActions}
          autoHeight={window.innerHeight - (openHeader ? 210 : 160) + "px"}
          animation={false}
          meta={{
            totalCount: count,
            pageCount: count ? Math.ceil(count / filterParams?.perPage) : 0,
          }}
          extra={
            <div>
              {filterParams.edit ? (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="custom-btn"
                  style={{ height: "32px" }}
                  type="button"
                >
                  Cохранить
                </button>
              ) : (
                <button
                  onClick={() => {
                    AddNewColumn({ listTable, setListTable });
                    setFilterParams({
                      ...filterParams,
                      edit: true,
                      currentIndex: 1,
                    });
                  }}
                  className="custom-btn create"
                  style={{ height: "32px" }}
                  type="button"
                >
                  Добавить
                </button>
              )}
            </div>
          }
        />
      </div>
    </>
  );
};

export default LanguagesPage;
