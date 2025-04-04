import { useMemo, useRef, useState } from "react";
import { Header } from "../../../components/UI/Header";
import useDebounce from "../../../hooks/useDebounce";
import { GetTranslations, HandleTable } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
// import { usePermissions } from "../../../hooks/usePermissions";
import { IFilterParams } from "../../../interfaces";
import CNewTable from "../../../components/CElements/CNewTable";
const breadCrumbs = [
  { label: "Настройки", link: "/settings/language" },
  { label: "Языка" },
];
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
        id: ["KEYWORD"],
        width: 260,
        render: (key: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center font-medium">
              {filterParams.edit ? (
                <input
                  className="input-design font-medium"
                  onChange={(e) => {
                    // handleValue(e.target.value, "key", id, key);
                  }}
                  ref={inputRef}
                  defaultValue={key}
                />
              ) : (
                key
              )}
            </div>
          );
        },
      },
      {
        renderHead: () => <GetTitle val="ru" />,
        id: ["KEYWORD", "RU"],
        width: 260,
        render: ([key, val, id]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
                  onChange={(e) => {
                    // handleValue(e.target.value, "ru", id, key);
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
        render: ([key, val]: any) => {
          return (
            <div className="h-[56px] flex items-center w-full justify-center">
              {filterParams.edit ? (
                <input
                  className="input-design"
                  onChange={(e) => {
                    // handleValue(e.target.value, "uz", id, key);
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
    ];
  }, [listTable]);

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
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      />
      <div className="p-2">
        <CNewTable
          title="Translations table"
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
          // extra={
          //   <div>
          //     {filterParams.edit ? (
          //       <button
          //         onClick={() => {
          //           handleSubmit();
          //         }}
          //         className="custom-btn"
          //         style={{ height: "32px" }}
          //         disabled={!checkPermission("edit")}
          //       >
          //         Cохранить
          //       </button>
          //     ) : (
          //       <button
          //         onClick={() => {
          //           AddNewColumn({ listTable, setListTable });
          //           setFilterParams({ ...filterParams, edit: true });
          //         }}
          //         className="custom-btn"
          //         style={{ height: "32px" }}
          //         disabled={!checkPermission("add")}
          //       >
          //         Добавить
          //       </button>
          //     )}
          //   </div>
          // }
        />
      </div>
    </>
  );
};

export default LanguagesPage;
