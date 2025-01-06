import { useEffect, useState } from "react";
import CCard from "../../../components/CElements/CCard";
import { Header } from "../../../components/UI/Header";
import useDebounce from "../../../hooks/useDebounce";
import { GetTranslations, HandleTable } from "./Logic";
import CTable from "../../../components/CElements/CTable";
import CFooter from "../../../components/CElements/CFooter";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
const breadCrumbs = [
  { label: "Настройки", link: "/settings/language" },
  { label: "Языковые настройки" },
];
const LanguagesPage = () => {
  const { isLoading } = GetTranslations();
  const { AddNewColumn, GetTitle, WriteValue } = HandleTable();
  // const { createTranslation } = CreateTranslasion();
  // const [edit, setEdit] = useState(false);
  const [listTable, setListTable]: any = useState([{ id: "aaa", value: "1" }]);
  const [filterParams, setFilterParams] = useState({
    edit: false,
    page: 1,
    perPage: 10,
  });
  const handleValue = useDebounce((value: any, key: string, id: string) => {
    WriteValue({ listTable, setListTable, value, key, id });
  }, 500);

  useEffect(() => {
    setListTable([
      {
        id: 1,
        name: "settings",
        key: "settings",
        ru: "nastroyki",
        en: "settings",
        uz: "sozlamalar",
      },
    ]);
  }, []);

  const headColumns = [
    {
      renderHead: () => <GetTitle val="key" />,
      id: ["key", "key"],
      width: 260,
      render: (val: any) => {
        const obj = val?.[0] ?? {};

        return (
          <div className="h-[56px] flex items-center w-full justify-center">
            {filterParams.edit ? (
              <input
                className="input-design"
                onChange={(e) => {
                  handleValue(e.target.value, "key", obj?.id);
                }}
                defaultValue={obj?.key ? obj.key : val?.[0]}
              />
            ) : obj?.key ? (
              obj.key
            ) : (
              val?.[0]
            )}
          </div>
        );
      },
    },
    {
      renderHead: () => <GetTitle val="uz" />,
      id: ["key", "uz"],
      width: 260,
      render: (val: any) => {
        const obj = val?.[1];
        return (
          <div className="h-[56px] flex items-center w-full justify-center">
            {filterParams.edit ? (
              <input
                className="input-design"
                onChange={(e) => {
                  handleValue(e.target.value, "key", obj?.id);
                }}
                defaultValue={obj?.key ? obj.key : val?.[0]}
              />
            ) : obj?.key ? (
              obj.key
            ) : (
              val?.[0]
            )}
          </div>
        );
      },
    },
    {
      renderHead: () => <GetTitle val="ru" />,
      id: ["key", "ru"],
      width: 260,
      render: (val: any) => {
        const obj = val?.[1];
        return (
          <div className="h-[56px] flex items-center w-full justify-center">
            {filterParams.edit ? (
              <input
                className="input-design"
                onChange={(e) => {
                  handleValue(e.target.value, "key", obj?.id);
                }}
                defaultValue={obj?.key ? obj.key : val?.[0]}
              />
            ) : obj?.key ? (
              obj.key
            ) : (
              val?.[0]
            )}
          </div>
        );
      },
    },
    {
      renderHead: () => <GetTitle val="en" />,
      id: ["key", "en"],
      width: 260,
      render: (val: any) => {
        const obj = val?.[1];

        return (
          <div className="h-[56px] flex items-center w-full justify-center">
            {filterParams.edit ? (
              <input
                className="input-design"
                onChange={(e) => {
                  handleValue(e.target.value, "key", obj?.id);
                }}
                defaultValue={obj?.key ? obj.key : val?.[0]}
              />
            ) : obj?.key ? (
              obj.key
            ) : (
              val?.[0]
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

  return (
    <>
      <Header
        extra={
          <CBreadcrumbs items={breadCrumbs} progmatic={true} type="link" />
        }
      />
      <div className="p-2">
        <CCard>
          <div>
            <CTable
              isLoading={isLoading}
              headColumns={headColumns}
              bodyColumns={listTable}
              filterParams={filterParams}
              isResizeble={false}
              handleFilterParams={setFilterParams}
              extra={
                <div>
                  {filterParams.edit ? (
                    <button
                      onClick={() => {
                        setFilterParams({ ...filterParams, edit: false });
                      }}
                      className="custom-btn"
                      style={{ height: "32px" }}
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
                    >
                      Добавить
                    </button>
                  )}
                </div>
              }
            />
          </div>
        </CCard>
      </div>
    </>
  );
};

export default LanguagesPage;
