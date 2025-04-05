import { useMemo, useRef, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { GetTranslations, HandleTable } from "./Logic";
// import { usePermissions } from "../../../hooks/usePermissions";
import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
import { useTranslation } from "react-i18next";

const LanguagesPage = () => {
  // const { checkPermission } = usePermissions();
  const [listTable, setListTable]: any = useState([]);
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    edit: false,
    page: 1,
    perPage: 10,
  });
  const { isLoading, refetch } = GetTranslations({ setListTable, setCount });
  const { AddNewColumn, GetTitle, WriteValue, onSubmit, deleteTranslation } =
    HandleTable({
      refetch,
    });
  const handleValue = useDebounce((value: any, id: string, key: string) => {
    console.log(value, id, key);

    WriteValue({ listTable, setListTable, value, id, key });
  }, 0);

  const handleSubmit = () => {
    onSubmit(listTable[0]);
    setFilterParams({ ...filterParams, edit: false });
  };
  const { t } = useTranslation();
  const headColumns = useMemo(() => {
    return [
      {
        renderHead: () => <GetTitle val="key" />,
        id: "KEYWORD",
        width: 260,
        render: (key: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              {filterParams.edit ? (
                <input
                  className="input-design font-medium"
                  onChange={(e) => {
                    console.log("key", key);

                    handleValue(e.target.value, key, "KEYWORD");
                  }}
                  ref={inputRef}
                  defaultValue={key}
                />
              ) : (
                t(key)
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="ru" />,
        id: ["KEYWORD", "RU"],
        width: 260,
        render: ([id, val]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
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
        id: ["KEYWORD", "UZ"],
        width: 260,
        render: ([id, val]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
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
        id: ["KEYWORD", "EN"],
        width: 260,
        render: ([id, val]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
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
        id: ["KEYWORD", "TU"],
        width: 260,
        render: ([id, val]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
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
    ];
  }, [listTable, filterParams.edit]);

  const handleActions = (el: any, type: string) => {
    if (type === "delete") {
      deleteTranslation(el.key);
    }
    if (type === "modal") {
      AddNewColumn({ listTable, setListTable });
      setFilterParams({ ...filterParams, edit: true });
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="border-b border-[var(--border)] flex justify-end pb-2">
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
                  setFilterParams({ ...filterParams, edit: true });
                }}
                className="custom-btn create"
                style={{ height: "32px" }}
                type="button"
              >
                Добавить
              </button>
            )}
          </div>
        </div>
        {t("settings")}
        <CNewTable
          key={filterParams.edit ? "edit" : "view"}
          isLoading={isLoading}
          headColumns={headColumns}
          bodyColumns={listTable}
          filterParams={filterParams}
          isResizeble={false}
          handleFilterParams={setFilterParams}
          handleActions={handleActions}
          autoHeight="auto"
          meta={{
            totalCount: count,
            pageCount: count ? Math.ceil(count / filterParams?.perPage) : 0,
          }}
        />
      </div>
    </>
  );
};

export default LanguagesPage;
