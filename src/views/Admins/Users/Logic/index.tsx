import { useMemo } from "react";
import { FormatTime } from "../../../../utils/formatTime";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { getStoredFilters } from "../../../../components/UI/Filter/Logic";
import useCQuery from "../../../../hooks/useCQuery";
import { useTranslation } from "react-i18next";

export const FetchFunction = () => {
  const { filters } = getStoredFilters({});
  const { q } = filters;

  const {
    data: users,
    isLoading,
    refetch,
  } = useCQuery({
    key: `GET_USERS_LIST`,
    endpoint: `http://127.0.0.1:8000/users/`,
    params: {},
  });

  const bodyColumns: any = useMemo(() => {
    const list = users ?? [];
    return {
      list,
      ...users,
    };
  }, [users]);

  return { isLoading, refetch, bodyColumns, q };
};

export const breadCrumbs = [
  { label: "Доступ", link: "/access/users" },
  { label: "Пользователи" },
];

export const TableData = () => {
  const { t } = useTranslation();
  const { navigateQuery } = usePageRouter();
  const handleSearch = (val: string) => {
    navigateQuery({ q: val });
  };

  const headColumns = useMemo(() => {
    return [
      {
        title: "Имя ",
        id: "name",
      },
      {
        title: "Логин",
        id: "email",
      },
      {
        title: "Тел.номер",
        id: "phone",
      },
      {
        title: "Отдел кадров",
        id: "section",
        render: (section: any) => {
          if (!section?.length) return;
          return (
            <div>
              {section?.map((item: any, index: number, row: any) => (
                <p key={index}>
                  {t(item)}
                  {row.length > 1 && index !== row.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          );
        },
      },
      {
        title: "Рол",
        id: "roles",
        render: (roles: any) => {
          if (!roles?.length) return;
          return (
            <div>
              {roles?.map((item: any, index: number, row: any) => (
                <p key={index}>
                  {t(item)}
                  {row.length > 1 && index !== row.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          );
        },
      },
      {
        title: "Дата создания",
        id: "created_at",
        render: (val: any) => {
          return <>{FormatTime(val)}</>;
        },
      },
      {
        title: "Статус",
        id: "status",
        render: (val: any) => (
          <div className={!val ? "text-[var(--error)]" : "text-[var(--green)]"}>
            {!val ? "Неактивные" : "Активный"}
          </div>
        ),
      },
      {
        title: "",
        id: "actions",
        actions: ["edit", "delete"],
      },
    ];
  }, []);

  return { headColumns, handleSearch };
};
