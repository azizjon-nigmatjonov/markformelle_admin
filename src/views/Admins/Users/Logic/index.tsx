import { useMemo } from "react";
import { FormatTime } from "../../../../utils/formatTime";
import usePageRouter from "../../../../hooks/useObjectRouter";
import { getStoredFilters } from "../../../../components/UI/Filter/Logic";
import useCQuery from "../../../../hooks/useCQuery";

export const FetchFunction = () => {
  const { filters } = getStoredFilters({});
  const { q } = filters;

  const {
    data: users,
    isLoading,
    refetch,
  } = useCQuery({
    key: `GET_USERS_LIST`,
    endpoint: `http://localhost:3000/users`,
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
          return (
            <div>
              {section?.map((item: any, index: number, row: any) => (
                <p key={index}>
                  {item.name}
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
          return (
            <div>
              {roles?.map((item: any, index: number, row: any) => (
                <p key={index}>
                  {item.name}
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
            {!val ? "Noaktiv" : "Aktiv"}
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
