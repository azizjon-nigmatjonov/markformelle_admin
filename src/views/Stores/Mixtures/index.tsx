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

export const MixturesPage = () => {
  const { t } = useTranslationHook();
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [open, setOpen] = useState(false);
  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const newHeadColumns = useMemo(() => {
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [
      {
        title: "Роствор ID",
        id: "URUNRECETEURUNID",
        checked: true,
      },
      {
        title: "Продукт",
        id: "URUNADI",
        checked: true,
      },
      {
        title: "Единица",
        id: "URUNBIRIMADI",
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
        title: "Единица ID",
        id: "URUNBIRIMID",
        checked: true,
      },

      {
        title: "Пользователь ID",
        id: "KULLANICIID",
        checked: true,
      },
      {
        title: "Заметка",
        id: "NOTU",
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
        URUNRECETEURUNID: el?.URUNRECETEURUNID,
        URUNADI: el?.URUNADI,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.URUNRECETEURUNID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { URUNRECETEURUNID: string }) => {
          return item.URUNRECETEURUNID;
        })
      );
    }
  };

  const handleModalActions = (status: string, id: string | number) => {
    if (status === "close") {
      setOpen(false);
      setModalInitialData({});
    }
    if (status === "delete") {
      setOpen(false);
      deleteFn([id + ""]);
    }
  };

  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_mixtures")}
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
          defaultSearch={{ URUNRECETEURUNID: "" }}
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
          title={t("modal_mixtures")}
          action={"add"}
          handleActions={handleModalActions}
          defaultData={{
            id: modalInitialData?.URUNRECETEURUNID,
          }}
        >
          <ModalUI defaultData={modalInitialData} />
        </CNewModal>
      )}
    </>
  );
};
