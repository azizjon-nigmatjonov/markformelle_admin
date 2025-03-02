import { useMemo, useState } from "react";
import CCard from "../../../components/CElements/CCard";
import { Header } from "../../../components/UI/Header";
import useDebounce from "../../../hooks/useDebounce";
import { GetTranslations, HandleTable } from "./Logic";
import CTable from "../../../components/CElements/CTable";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { usePermissions } from "../../../hooks/usePermissions";
const breadCrumbs = [
  { label: "Настройки", link: "/settings/language" },
  { label: "Языка" },
];
const LanguagesPage = () => {
  const { checkPermission } = usePermissions();
  const [listTable, setListTable]: any = useState([{ id: "aaa", value: "1" }]);
  const [filterParams, setFilterParams] = useState({
    edit: false,
    page: 1,
    perPage: 10,
  });
  const { isLoading, refetch } = GetTranslations({ setListTable });

  const { AddNewColumn, GetTitle, WriteValue, onSubmit, deleteTranslation } =
    HandleTable({
      refetch,
    });
  const handleValue = useDebounce(
    (value: any, key: string, id: string, initKey: string) => {
      WriteValue({ listTable, setListTable, value, key, id, initKey });
    },
    0
  );

  const handleSubmit = () => {
    onSubmit(listTable);
    setFilterParams({ ...filterParams, edit: false });
  };

  const headColumns = useMemo(() => {
    return [
      {
        renderHead: () => <GetTitle val="key" />,
        id: ["key", "key", "id"],
        width: 260,
        render: ([key, val, id]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              {filterParams.edit ? (
                <input
                  className="input-design font-medium"
                  onChange={(e) => {
                    handleValue(e.target.value, "key", id, key);
                  }}
                  defaultValue={key}
                />
              ) : key ? (
                key
              ) : (
                val
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="uz" />,
        id: ["key", "uz", "id"],
        width: 260,
        render: ([key, val, id]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
                  onChange={(e) => {
                    handleValue(e.target.value, "uz", id, key);
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
        renderHead: () => <GetTitle val="ru" />,
        id: ["key", "ru", "id"],
        width: 260,
        render: ([key, val, id]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
                  onChange={(e) => {
                    handleValue(e.target.value, "ru", id, key);
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
        id: ["key", "en", "id"],
        width: 260,
        render: ([key, val, id]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
                  onChange={(e) => {
                    handleValue(e.target.value, "en", id, key);
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
        title: "",
        id: "actions",
        width: 30,
        remove_sort: true,
        actions: ["delete"],
      },
    ];
  }, [listTable]);

  const handleActions = (el: any, type: string) => {
    if (type === "delete") {
      deleteTranslation(el.key);
    }
  };

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      />
      <div className="p-2">
        <CTable
          isLoading={isLoading}
          headColumns={headColumns}
          bodyColumns={listTable}
          filterParams={filterParams}
          isResizeble={false}
          handleFilterParams={setFilterParams}
          handleActions={handleActions}
          extra={
            <div>
              {filterParams.edit ? (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="custom-btn"
                  style={{ height: "32px" }}
                  disabled={!checkPermission("edit")}
                >
                  Cохранить
                </button>
              ) : (
                <button
                  onClick={() => {
                    AddNewColumn({ listTable, setListTable });
                    setFilterParams({ ...filterParams, edit: true });
                  }}
                  className="custom-btn"
                  style={{ height: "32px" }}
                  disabled={!checkPermission("add")}
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
