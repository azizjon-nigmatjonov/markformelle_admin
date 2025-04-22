import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalUI } from "./Modal";
import { IFilterParams } from "../../../interfaces";
import { GetCurrentDate } from "../../../utils/getDate";
import { useTranslationHook } from "../../../hooks/useTranslation";

interface ModalTypes {
  IRSALIYENO?: string;
  DEPOID?: string;
}

export const Transfers = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });

  const { bodyColumns, isLoading, bodyData, getList, deleteFn } = TableData({
    filterParams,
  });

  const handleActionsModal = (type: string, element?: any) => {
    if (type === "edit") {
      setOpen(true);
    }
    if (type === "delete") {
      setOpen(false);
      console.log("el", element);
      setModalInitialData({});
      // deleteFn([element.IRSALIYEID]);
    }
    if (type === "add") {
      setOpen(true);
    }
    if (type === "close") {
      setOpen(false);
      setModalInitialData({});
    }
  };

  const handleActions = (el: any, status: string) => {
    console.log("el", el, status);

    if (status === "delete") {
      deleteFn([el.IRSALIYEID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { IRSALIYEID: string }) => {
          return item.IRSALIYEID;
        })
      );
    }
    if (status === "modal") {
      setOpen(true);
    }
    if (status === "view" || status === "edit") {
      setOpen(true);
      setModalInitialData({
        IRSALIYENO: el.IRSALIYENO,
        DEPOID: el.DEPOID,
      });
    }
  };
  // const orderOfColumns = {
  //   IRSALIYETARIHI: 1,
  //   IRSALIYENO: 2,
  //   DEPOID: 3,
  //   DEPOADI: 4,
  //   TRANSFERDEPOID: 5,
  //   TRANSFERDEPOADI: 6,
  //   INSERTTARIHI: 8,
  //   KULLANICIID: 9,
  //   FIILISEVKTARIHI: 10,
  //   INSERTKULLANICIID: 11,
  // };
  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        id: "index",
      },
      {
        id: "IRSALIYETARIHI",
        title: "IRSALIYETARIHI",
        render: (val: string) => {
          return GetCurrentDate({ date: val, type: "date" });
        },
      },

      {
        title: "Номер документа",
        id: "IRSALIYENO",
        checked: true,
      },
      {
        title: "Склад ID",
        id: "DEPOID",
        checked: true,
      },
      {
        title: "Склад",
        id: "DEPOADI",
        checked: true,
      },
      {
        title: "Отдел перемещения ID",
        id: "TRANSFERDEPOID",
        checked: true,
      },
      {
        title: "Склад перемещения",
        id: "TRANSFERDEPOADI",
        checked: true,
      },
      {
        title: "Дата изменения",
        id: "DEGISIMTARIHI",
        checked: true,
      },
      {
        title: "Пользователь",
        id: "KULLANICIADI",
        checked: true,
      },
      {
        title: "Дата(создание)",
        id: "INSERTTARIHI",
        checked: true,
      },
      {
        title: "Пользователь(создание)",
        id: "INSERKULLANICIADI",
        checked: true,
      },
      {
        title: "Регистрации документа ID",
        id: "EVRAKKAYITID",
        checked: true,
      },
      {
        title: "Документ ID",
        id: "IRSALIYEID",
        checked: true,
      },
      {
        title: "Тип операции",
        id: "HAREKETTIPI",
        checked: true,
      },
      {
        title: "Дата отгрузки",
        id: "FIILISEVKTARIHI",
        checked: true,
      },
      {
        title: "Валюта",
        id: "DOVIZID",
        checked: true,
      },
      {
        title: "Класс",
        id: "SINIF",
        checked: true,
      },
      {
        title: "Фирма ID",
        id: "FIRMAID",
        checked: true,
      },
      {
        title: "Серийный номер",
        id: "SERINO",
        checked: true,
      },
      {
        title: "Заметка",
        id: "NOTU",
        checked: true,
      },
      {
        title: "Пользователь ID(создание)",
        id: "INSERTKULLANICIID",
        checked: true,
      },
      {
        title: "Пользователь ID",
        id: "KULLANICIID",
        checked: true,
      },
      {
        title: "Фирма",
        id: "FIRMAADI",
        checked: true,
      },
    ];

    keys.forEach((key: string) => {
      if (!newColumns.find((item: { id: string }) => item.id === key)) {
        newColumns.push({ title: key, id: key });
      }
    });

    return newColumns;
  }, [bodyColumns?.length]);

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_transfers")}
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          defaultFilters={[
            "sidebar_filter",
            "add",
            "delete",
            "actions",
            "excel_download",
            "active_menu",
            "filter",
            "sellect_more",
          ]}
          defaultSearch={{ IRSALIYENO: "" }}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={(val: any) => {
            setFilterParams(val);
          }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <ModalUI
          defaultData={modalInitialData}
          getList={() => getList(filterParams)}
          irsaliyaNo={bodyColumns?.[0]?.IRSALIYEID || 9000}
          handleActionsModal={handleActionsModal}
        />
      )}
    </>
  );
};
