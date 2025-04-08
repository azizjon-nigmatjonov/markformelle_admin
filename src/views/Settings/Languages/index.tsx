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

const LanguagesPage = () => {
  const dispatch = useDispatch();
  const [listTable, setListTable]: any = useState([]);
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const storedTranslation = useSelector(
    (state: any) => state.translation.translation
  );
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
    WriteValue({ listTable, setListTable, value, id, key });
  }, 300);
  const [errors, setErrors]: any = useState([]);
  const handleSubmit = () => {
    let error = false;
    const defaults = {
      RU: "",
      TU: "",
      EN: "",
      UZ: "",
      KEYWORD: "",
    };
    const newErrors = [...errors];
    const newArr = listTable.map((element: any, index: number) => {
      for (let key in defaults) {
        if (!element[key]?.trim()) {
          element[key] = "error";
        } else {
          element[key] = element[key];
        }
      }
      return element;
    });
    setErrors(newErrors);

    setListTable(newArr);

    if (!errors.length) {
      const currObj = listTable.find(
        (_: any, index: number) => index + 1 === filterParams.currentIndex
      );
      // if (filterParams.currentIndex !== 1) {
      //   onUpdate(currObj);
      // } else {
      //   onSubmit([listTable[0]]);
      // }
      setFilterParams({
        ...filterParams,
        edit: false,
        currentIndex: undefined,
      });
      // dispatch(translateActions.setTranslation(newArr));
      localStorage.setItem("translations", JSON.stringify(newArr));
    }
  };
  console.log("listTable", listTable);

  const headColumns = useMemo(() => {
    const list: any = [
      {
        renderHead: () => <GetTitle val="key" />,
        id: ["KEYWORD", "index", "errors"],
        width: 260,
        render: ([key, index]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              <div
                className="w-full flex justify-center"
                style={{
                  border: `1px solid ${key === "error" ? "red" : "yellow"}`,
                }}
              >
                {filterParams.edit && index === filterParams.currentIndex ? (
                  <input
                    className={`input-design font-medium`}
                    onChange={(e) => {
                      handleValue(e.target.value, key, "KEYWORD");
                    }}
                    ref={inputRef}
                    defaultValue={key}
                  />
                ) : key === "error" ? (
                  "-"
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
        id: ["KEYWORD", "RU", "index"],
        width: 260,
        render: ([id, val, index]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit && index === filterParams.currentIndex ? (
                <input
                  className={`input-design font-medium`}
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
        id: ["KEYWORD", "UZ", "index"],
        width: 260,
        render: ([id, val, index]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit && index === filterParams.currentIndex ? (
                <input
                  className="input-design"
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
        id: ["KEYWORD", "EN", "index"],
        width: 260,
        render: ([id, val, index]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit && index === filterParams.currentIndex ? (
                <input
                  className="input-design"
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
        id: ["KEYWORD", "TU", "index"],
        width: 260,
        render: ([id, val, index]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit && index === filterParams.currentIndex ? (
                <input
                  className="input-design"
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
  }, [listTable, filterParams.edit, errors]);

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
          key={filterParams.edit ? "edit" : "view" + errors.length}
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
