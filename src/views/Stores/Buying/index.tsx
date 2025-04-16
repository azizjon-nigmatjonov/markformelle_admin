import { useMemo, useState } from "react";
import { breadCrumbs, ModalLogic, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { ModalUI } from "./Modal";
import { IFilterParams } from "../../../interfaces";
import { GetCurrentDate } from "../../../utils/getDate";

export const BuyingChemicals = () => {
  const [modalList, setModalList]: any = useState([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const { handleActionsModal } = ModalLogic({ setModalList, modalList });
  const { bodyColumns, handleActions, isLoading, bodyData, createElement } =
    TableData({
      handleActionsModal,
      filterParams,
      setModalList,
    });

  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
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
        title: "Фирма ID",
        id: "FIRMAID",
        checked: true,
      },
      {
        title: "Фирма",
        id: "FIRMAADI",
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
        title: "Документ ID",
        id: "IRSALIYEID",
        checked: true,
      },
      {
        title: "Дата отгрузки",
        id: "FIILISEVKTARIHI",
        checked: true,
      },
      {
        title: "Пользователь(создание)",
        id: "INSERKULLANICIADI",
        checked: true,
      },
      {
        title: "Валюта",
        id: "DOVIZID",
        checked: true,
      },
      {
        title: "Регистрации документа ID",
        id: "EVRAKKAYITID",
        checked: true,
      },
      {
        title: "Пользователь ID",
        id: "KULLANICIID",
        checked: true,
      },
      {
        title: "Тип операции",
        id: "HAREKETTIPI",
        checked: true,
      },
      {
        title: "Отдел перемещения ID",
        id: "TRANSFERDEPOID",
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
        title: "Класс",
        id: "SINIF",
        checked: true,
      },
      {
        title: "Пользователь ID(создание)",
        id: "INSERTKULLANICIID",
        checked: true,
      },
      {
        title: "Склад перемещения",
        id: "TRANSFERDEPOADI",
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
          title={"document_buying"}
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
          ]}
          defaultSearch={{ IRSALIYENO: "" }}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={(val: any) => {
            setFilterParams(val);
          }}
          animation={true}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {modalList?.length ? (
        <ModalUI
          element={modalList[0]}
          setModalList={setModalList}
          modalList={modalList}
          createElement={createElement}
          irsaliyaNo={bodyColumns?.[0]?.IRSALIYEID || 9000}
        />
      ) : (
        ""
      )}
    </>
  );
};
