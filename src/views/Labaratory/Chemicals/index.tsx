import { useMemo, useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import CNewModal from "../../../components/CElements/CNewModal";
import { ModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";

export const LabChemicals = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});

  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        title: "Продукт ID",
        id: "URUNID",
        checked: true,
      },
      {
        title: "Название",
        id: "ADI",
        checked: true,
      },
      {
        title: "Номер склада",
        id: "MUTFAKDEPONO",
        checked: true,
      },
      {
        title: "Подрозделения",
        id: "UNITEADI",
        checked: true,
      },
      {
        title: "Тип товара",
        id: "URUNTIPIADI",
        checked: true,
      },
      {
        title: "Тип красителя",
        id: "BOYATIPIADI",
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
        title: "Дата последный покупки",
        id: "SONALISTARIHI",
        checked: true,
      },
      {
        title: "Дата изменения",
        id: "DEGISIMTARIHI",
        checked: true,
      },
      {
        title: "ID строки последного покупки",
        id: "SONALISSTOKDETAYID",
        checked: true,
      },
      {
        title: "Баркод",
        id: "BARKOD",
        checked: true,
      },
      {
        title: "Тип товара ID",
        id: "URUNTIPIID",
        checked: true,
      },
      {
        title: "Пользователь ID",
        id: "KULLANICIID",
        checked: true,
      },
      {
        title: "Тип красителя ID",
        id: "BOYATIPIID",
        checked: true,
      },
      {
        title: "Единица ID",
        id: "UNITEID",
        checked: true,
      },
      {
        title: "Тип химиката ID",
        id: "KIMYASALTIPIID",
        checked: true,
      },
      {
        title: "Ставка НДС",
        id: "KDVORANI",
        checked: true,
      },
      {
        title: "Заметка",
        id: "NOTU",
        checked: true,
      },
      {
        title: "Период закупки",
        id: "TEMINSURESI",
        checked: true,
      },
      {
        title: "Ячейка",
        id: "RAF",
        checked: true,
      },
      {
        title: "Код перевода",
        id: "TRANSFERKODU",
        checked: true,
      },
      {
        title: "В инвентаре",
        id: "ENVANTEREDAHIL",
        checked: true,
      },
      {
        title: "Архивирован",
        id: "KAPALI",
        checked: true,
      },
      {
        title: "Пользователь ID(создание)",
        id: "INSERTKULLANICIID",
        checked: true,
      },
      {
        title: "Тип химиката",
        id: "KIMYASALTIPIADI",
        checked: true,
      },
    ];

    keys.forEach((key: string) => {
      if (!newColumns.find((item: { id: string }) => item.id === key)) {
        newColumns.push({
          title: key,
          id: key,
        });
      }
    });

    return newColumns;
  }, [bodyColumns]);

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        URUNID: el?.URUNID,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.URUNID]);
      setFilterParams({ page: 0, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { URUNID: string }) => {
          return item.URUNID;
        })
      );
      setFilterParams({ page: 0, perPage: 50 });
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "close") {
      setOpen(false);
      setModalInitialData({});
    }
    if (status === "delete") {
      setOpen(false);
      deleteFn([id]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_chemicals")}
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          handleActions={handleActions}
          isLoading={isLoading}
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
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
          defaultSearch={{ URUNID: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      {open && (
        <CNewModal
          title={t(
            modalInitialData.URUNID ? "updating_chemical" : "creating_chemical"
          )}
          handleActions={handleModalActions}
          defaultData={{
            id: modalInitialData?.URUNID,
          }}
          disabled="big"
        >
          <ModalUI defaultData={modalInitialData} />
        </CNewModal>
      )}
    </>
  );
};
