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
import { PantoneColors } from "../../../constants/pantone";
import { useGetFirmList } from "../../../hooks/useFetchRequests/useFirmaList";

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
        title: "PANTONEKODU",
        id: "PANTONEKODU",
        width: 200,
        render: (value: string) => {
          return (
            <div className="flex space-x-2 items-center">
              <p className="min-w-[100px]">{value}</p>
              <div
                className={`w-[70px] h-[25px] rounded-[8px]`}
                style={{
                  backgroundColor:
                    "#" + PantoneColors[value?.substring(4, 11)]?.hex,
                }}
              ></div>
            </div>
          );
        },
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
        LABRECETEID: el?.LABRECETEID,
      });
    }

    if (status === "delete_multiple") {
      console.log(el);
    }

    if (status === "delete") {
      deleteFn([el.LABRECETEID]);
      setFilterParams({ page: 0, perPage: 50 });
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { LABRECETEID: string }) => {
          return item.LABRECETEID;
        })
      );
      setFilterParams({ page: 0, perPage: 50 });
    }
  };
  const [showUI, setShowUI] = useState(false);
  const handleModalActions = (status: string, id: string) => {
    if (status === "close") {
      setOpen(false);
      setShowUI(false);
      setModalInitialData({});
    }
    if (status === "delete") {
      setOpen(false);
      setShowUI(false);
      setModalInitialData({});
      deleteFn([id]);
    }
  };
  const {
    firmaData,
    setFilterParams: setFilterParamsFirm,
    filterParams: filterParamsFirm,
  } = useGetFirmList({ enabled: "" });
  return (
    <>
      <Header extra={<CBreadcrumbs items={breadCrumbs} progmatic={true} />} />
      <div className="p-2">
        <CNewTable
          title={t("table_labaratory")}
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
          defaultSearch={{ DATE: "", PANTONE: "", MATERIAL: "" }}
          meta={{
            totalCount: bodyData?.count,
            pageCount: bodyData?.count
              ? Math.ceil(bodyData?.count / filterParams?.perPage)
              : 0,
          }}
        />
      </div>

      <ModalUI
        defaultData={modalInitialData}
        modalInitialData={modalInitialData}
        handleModalActions={handleModalActions}
        open={open}
        showUI={showUI}
        firmaData={firmaData}
        setShowUI={setShowUI}
        filterParamsFirm={filterParamsFirm}
        setFilterParamsFirm={setFilterParamsFirm}
      />
    </>
  );
};
