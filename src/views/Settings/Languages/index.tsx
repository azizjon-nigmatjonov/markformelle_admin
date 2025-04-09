import { useMemo, useRef, useState } from "react";
import { GetTranslations, HandleTable } from "./Logic";
import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  EditIcon,
  PlusIcon,
  SaveIcon,
} from "../../../components/UI/IconGenerator/Svg";

const defaults = {
  RU: "",
  TU: "",
  EN: "",
  UZ: "",
  KEYWORD: "",
};

const LanguagesPage = () => {
  const { t } = useTranslation();
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

  const editFields = () => {
    setFilterParams({
      ...filterParams,
      edit: false,
    });
    setTimeout(() => {
      setFilterParams({
        ...filterParams,
        edit: true,
        currentIndex: 0,
      });
    }, 0);
  };

  const { isLoading, refetch } = GetTranslations({
    setListTable,
    setCount,
    storedTranslation,
    editFields,
  });

  const {
    AddNewColumn,
    GetTitle,
    WriteValue,
    onSubmit,
    onUpdate,
    handleDelete,
  } = HandleTable({
    refetch,
  });

  const handleValue = (value: any, ID: number, key: string) => {
    WriteValue({
      listTable,
      setListTable,
      value,
      ID,
      key,
    });
  };

  const handleSubmit = () => {
    let error = false;
    const updateElements: any = [];
    const newElements: any = [];

    const newArr = listTable.map((element: any) => {
      element.errors = [];
      for (let key in defaults) {
        if (!element.KEYWORD?.trim()) {
          error = true;
          element[key] = "";
          element.errors.push("KEYWORD");
        } else {
          element[key] = element[key];
        }
      }
      const newObj = JSON.parse(JSON.stringify(element));

      delete newObj.status;
      delete newObj.errors;
      newObj.TU_TOOLTIP = "-";
      newObj.UZ_TOOLTIP = "-";
      newObj.EN_TOOLTIP = "-";
      newObj.RU_TOOLTIP = "-";
      if (element?.status === "new") {
        newElements.push(newObj);
      }
      if (element?.status === "update") {
        updateElements.push(newObj);
      }
      return element;
    });

    if (!error) {
      if (updateElements.length) onUpdate(updateElements);
      if (newElements.length) onSubmit(newElements);
      setFilterParams({
        ...filterParams,
        edit: false,
        currentIndex: undefined,
      });

      localStorage.setItem("translations", JSON.stringify(newArr));
    }

    setListTable(newArr);
  };

  const headColumns = useMemo(() => {
    const list: any = [
      {
        renderHead: () => <GetTitle val="key" />,
        id: ["KEYWORD", "ID", "errors"],
        width: 260,
        render: ([key, ID, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              <div className="w-full flex justify-center">
                {filterParams.edit || !key || errors?.includes("KEYWORD") ? (
                  <input
                    className={`input-design font-medium ${
                      errors?.includes("KEYWORD") ? "error" : ""
                    }`}
                    onChange={(e) => {
                      handleValue(e.target.value, ID, "KEYWORD");
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
        id: ["RU", "ID", "errors"],
        width: 260,
        render: ([val, ID, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit || errors?.includes("RU") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("RU") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, ID, "RU");
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
        id: ["UZ", "ID", "errors"],
        width: 260,
        render: ([val, ID, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit || errors?.includes("UZ") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("UZ") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, ID, "UZ");
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
        id: ["EN", "ID", "errors"],
        width: 260,
        render: ([val, ID, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit || errors?.includes("EN") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("EN") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, ID, "EN");
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
        id: ["TU", "ID", "errors"],
        width: 260,
        render: ([val, ID, errors]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit || errors?.includes("TU") ? (
                <input
                  className={`input-design font-medium ${
                    errors?.includes("TU") ? "error" : ""
                  }`}
                  onChange={(e) => {
                    handleValue(e.target.value, ID, "TU");
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
      // {
      //   title: "actions",
      //   id: ["index", "KEYWORD", "actions"],
      //   width: 260,
      //   render: ([index, key]: any) => {
      //     return (
      //       <div className="h-[56px] flex items-center w-full justify-center space-x-5">
      //         <button
      //           type="button"
      //           onClick={() => {
      //             deleteFirstElement();
      //           }}
      //         >
      //           {filterParams.currentIndex === index ? <CloseIcon /> : ""}
      //         </button>
      //         <button
      //           type="button"
      //           onClick={() => {
      //             handleDelete(key);
      //           }}
      //         >
      //           <DeleteIcon />
      //         </button>
      //       </div>
      //     );
      //   },
      // },
    ];
    return list;
  }, [listTable, filterParams.edit]);

  const handleActions = (el: any, type: string) => {
    if (type === "delete") {
      if (el.KEYWORD) {
        handleDelete(el.KEYWORD);
      } else {
        setListTable(listTable.slice(1, listTable.length));
      }
    }
    if (type === "modal") {
      AddNewColumn({ listTable, setListTable });
    }
    if (type === "edit") {
      setFilterParams({
        ...filterParams,
        edit: false,
      });
      setTimeout(() => {
        setFilterParams({
          ...filterParams,
          edit: true,
          currentIndex: 0,
        });
        const newData = el?.map((item: any) => {
          const foundObj = listTable.find(
            (el: { ID?: number }) => el.ID === item.ID
          );

          if (foundObj?.ID) {
            if (
              item.KEYWORD !== foundObj.KEYWORD ||
              item.RU !== foundObj.RU ||
              item.TU !== foundObj.TU ||
              item.EN !== foundObj.EN ||
              item.UZ !== foundObj.UZ
            ) {
              item.status = "update";
            }
          } else {
            item.status = "new";
          }
          return item;
        });
        setListTable(newData);
      }, 0);
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
          title={t("translations_table")}
          defaultFilters={[
            "excel_upload",
            "excel_download",
            "actions",
            "delete",
          ]}
          defaultActions={["delete", "is_sellect_more"]}
          bodyColumns={listTable?.sort(
            (a: { ID: number }, b: { ID: number }) => b.ID - a.ID
          )}
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
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  if (filterParams.edit) {
                    handleSubmit();
                  } else {
                    setFilterParams({ ...filterParams, edit: true });
                  }
                }}
              >
                {filterParams.edit ? (
                  <SaveIcon width={26} fill="var(--primary)" />
                ) : (
                  <EditIcon width={22} fill="var(--main)" />
                )}
              </button>
              <button
                onClick={() => {
                  if (!filterParams.edit) {
                    AddNewColumn({ listTable, setListTable });
                    setFilterParams({
                      ...filterParams,
                      edit: true,
                      currentIndex: 1,
                    });
                  }
                }}
                style={{ height: "30px" }}
                type="button"
              >
                <PlusIcon
                  fill={filterParams.edit ? "var(--gray)" : "var(--main)"}
                  width={22}
                />
              </button>
            </div>
          }
        />
      </div>
    </>
  );
};

export default LanguagesPage;
