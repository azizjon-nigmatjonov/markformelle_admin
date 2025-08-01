import { useMemo, useRef, useState, useCallback } from "react";
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
    (state: any) => state?.translation?.translation || []
  );
  const openHeader = useSelector(
    (state: any) => state?.sidebar?.openHeader || false
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

    onSubmit,
    onUpdate,
    handleDelete,
  } = HandleTable({
    refetch,
  });

  const handleValue = useCallback(
    (value: any, ID: number, key: string, index: number) => {
      const keyTochoose = ID ? "ID" : "index";
      const valueToChoose = ID ? ID : index;
      const itemIndex = listTable.findIndex(
        (item: any) => item[keyTochoose] === valueToChoose
      );

      if (itemIndex === -1) return;

      const item = listTable[itemIndex];
      if (!item.KEYWORD?.trim()) item.status = "new";
      item[key] = value;
      if (item?.status !== "new") item.status = "update";
    },
    [listTable]
  );

  const renderKeywordColumn = useCallback(
    ([key, ID, errors, index]: any) => {
      return (
        <div className="flex items-center w-full font-medium">
          <div className="w-full flex">
            {filterParams.edit || !key || errors?.includes("KEYWORD") ? (
              <input
                className={`input-design font-medium ${
                  errors?.includes("KEYWORD") ? "error" : ""
                }`}
                onChange={(e) => {
                  handleValue(e.target.value, ID, "KEYWORD", index);
                }}
                style={{ height: "28px" }}
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
    [filterParams.edit, handleValue]
  );

  const renderRuColumn = useCallback(
    ([val, ID, errors, index]: any) => {
      return (
        <div className="px-8 flex items-center w-full">
          {filterParams.edit || errors?.includes("RU") ? (
            <input
              className={`input-design font-medium ${
                errors?.includes("RU") ? "error" : ""
              }`}
              onChange={(e) => {
                handleValue(e.target.value, ID, "RU", index);
              }}
              style={{ height: "28px" }}
              defaultValue={val}
            />
          ) : (
            val
          )}
        </div>
      );
    },
    [filterParams.edit, handleValue]
  );

  const renderUzColumn = useCallback(
    ([val, ID, errors, index]: any) => {
      return (
        <div className="px-8 flex items-center w-full">
          {filterParams.edit || errors?.includes("UZ") ? (
            <input
              className={`input-design font-medium ${
                errors?.includes("UZ") ? "error" : ""
              }`}
              style={{ height: "28px" }}
              onChange={(e) => {
                handleValue(e.target.value, ID, "UZ", index);
              }}
              defaultValue={val}
            />
          ) : (
            val
          )}
        </div>
      );
    },
    [filterParams.edit, handleValue]
  );

  const renderEnColumn = useCallback(
    ([val, ID, errors, index]: any) => {
      return (
        <div className="px-8 flex items-center w-full">
          {filterParams.edit || errors?.includes("EN") ? (
            <input
              className={`input-design font-medium ${
                errors?.includes("EN") ? "error" : ""
              }`}
              style={{ height: "28px" }}
              onChange={(e) => {
                handleValue(e.target.value, ID, "EN", index);
              }}
              defaultValue={val}
            />
          ) : (
            val
          )}
        </div>
      );
    },
    [filterParams.edit, handleValue]
  );

  const renderTuColumn = useCallback(
    ([val, ID, errors, index]: any) => {
      return (
        <div className="px-8 flex items-center w-full">
          {filterParams.edit || errors?.includes("TU") ? (
            <input
              className={`input-design font-medium ${
                errors?.includes("TU") ? "error" : ""
              }`}
              style={{ height: "28px" }}
              onChange={(e) => {
                handleValue(e.target.value, ID, "TU", index);
              }}
              defaultValue={val}
            />
          ) : (
            val
          )}
        </div>
      );
    },
    [filterParams.edit, handleValue]
  );

  const headColumns = useMemo(() => {
    const list: any = [
      {
        renderHead: () => <GetTitle val="key" />,
        id: ["KEYWORD", "ID", "errors", "index"],
        render: renderKeywordColumn,
      },
      {
        renderHead: () => <GetTitle val="ru" />,
        id: ["RU", "ID", "errors", "index"],
        render: renderRuColumn,
      },
      {
        renderHead: () => <GetTitle val="uz" />,
        id: ["UZ", "ID", "errors", "index"],
        render: renderUzColumn,
      },
      {
        renderHead: () => <GetTitle val="en" />,
        id: ["EN", "ID", "errors", "index"],
        render: renderEnColumn,
      },
      {
        renderHead: () => <GetTitle val="tu" />,
        id: ["TU", "ID", "errors", "index"],
        render: renderTuColumn,
      },
    ];
    return list;
  }, [
    renderKeywordColumn,
    renderRuColumn,
    renderUzColumn,
    renderEnColumn,
    renderTuColumn,
  ]);

  const handleSubmit = () => {
    let error = false;
    const updateElements: any = [];
    const newElements: any = [];

    const newArr = listTable.map((element: any, index: number) => {
      element.errors = [];
      element.index += index + 1;
      for (let key in defaults) {
        if (!element.KEYWORD?.trim()) {
          error = true;
          element[key] = "";
          element.errors.push("KEYWORD");
        } else {
          element.KEYWORD = element.KEYWORD.replace(/ /g, "_");
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

  const memoizedBodyColumns = useMemo(() => {
    if (!listTable?.length) return [];
    return [...listTable].sort(
      (a: { ID: number }, b: { ID: number }) => b.ID - a.ID
    );
  }, [listTable]);

  const handleActions = (el: any, type: string) => {
    if (type === "delete") {
      if (el.KEYWORD) {
        handleDelete([el.KEYWORD]);
      } else {
        setListTable(
          listTable
            .slice(1, listTable.length)
            .map((item: { index: number }, index: number) => {
              item.index += index + 1;
              return item;
            })
        );
      }
    }
    if (type === "delete_multiple") {
      handleDelete(
        el.map((item: { KEYWORD: string }) => {
          return item.KEYWORD;
        })
      );
    }
    if (type === "modal") {
      AddNewColumn({ listTable, setListTable });
    }
    if (type === "read_excel") {
      setFilterParams({
        ...filterParams,
        edit: true,
        currentIndex: 0,
      });
      let oldArr: any = localStorage.getItem("translations");
      if (oldArr) oldArr = JSON.parse(oldArr);

      const newData = el?.map((item: any, index: number) => {
        const foundObj = oldArr.find(
          (old: { KEYWORD?: string }) => old.KEYWORD === item.KEYWORD
        );

        if (foundObj) {
          if (
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
        item.index = index + 1;
        return item;
      });
      setListTable(newData);
    }
  };

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
            "sellect_more",
          ]}
          defaultActions={["delete", "is_sellect_more"]}
          bodyColumns={memoizedBodyColumns}
          disablePagination={true}
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
          defaultExcelFields={["KEYWORD", "RU", "UZ", "EN", "TU"]}
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
