import { useState } from "react";
import { breadCrumbs, TableData } from "./Logic";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { Header } from "../../../components/UI/Header";
import CNewTable from "../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../interfaces";
import { useTranslationHook } from "../../../hooks/useTranslation";
import { useTableHeaders } from "../../../hooks/useTableHeaders";
import { ModalUI } from "./Modal";
import { ModalTypes } from "./interfaces";
import { PantoneColors } from "../../../constants/pantone";
import CNewModal from "../../../components/CElements/CNewModal";

export const LabChemicals = () => {
  const { t } = useTranslationHook();
  const [open, setOpen] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });
  const [modalInitialData, setModalInitialData] = useState<ModalTypes>({});
  const [askClose, setAskClose] = useState("");
  const { bodyColumns, isLoading, bodyData, deleteFn } = TableData({
    filterParams,
  });

  const predefinedColumns = [
    {
      title: "PANTONEKODU",
      id: "PANTONEKODU",
      width: 200,
      render: (value: string) => {
        return (
          <div className="flex space-x-2 items-center justify-between">
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
    {
      title: "LABRECETEKODU",
      id: "LABRECETEKODU",
    },
    {
      title: "ESKILABRECETEKODU",
      id: "ESKILABRECETEKODU",
    },
    {
      title: "ACIKLAMA",
      id: "ACIKLAMA",
    },
    {
      title: "ADI",
      id: "ADI",
    },
    {
      title: "LABRENKGRUPAD",
      id: "LABRENKGRUPAD",
    },
    {
      title: "RECETETURAADI",
      id: "RECETETURAADI",
    },
    {
      title: "RENKDERINLIGIADI",
      id: "RENKDERINLIGIADI",
    },
    {
      title: "USTASAMAADI",
      id: "USTASAMAADI",
    },
  ];

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData({
        LABRECETEID: el?.LABRECETEID,
        ...el,
      });
    }

    if (status === "delete") {
      deleteFn([el.LABRECETEID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { LABRECETEID: string }) => {
          return item.LABRECETEID;
        })
      );
    }
  };

  const askCloseFn = (type: string) => {
    if (type === "close") {
      setAskClose("");
      setOpen(false);
      setModalInitialData({});
    } else if (type === "submit") {
      setAskClose("");
    } else {
      setAskClose(type);
    }
  };

  const handleModalActions = (status: string, id: string) => {
    if (status === "delete") deleteFn([id]);
  };

  const handleModal = (status: string, id: string) => {
    // This will be passed to ModalUI
    if (status === "delete") {
      deleteFn([id]);
    } else if (status === "close") {
      setOpen(false);
      setModalInitialData({});
    }
  };

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
          defaultSearch={{
            LABRECETEKODU: "",
            ESKILABREETEKODU: "",
            PANTONEKODU: "",
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
        <CNewModal
          title={modalInitialData.LABRECETEID ? "updating_lab" : "creating_lab"}
          handleActions={handleModal}
          defaultData={{
            id: modalInitialData?.LABRECETEID,
          }}
          disabled="big"
        >
          <ModalUI
            defaultData={modalInitialData}
            handleModalActions={handleModalActions}
            askClose={askClose}
            setAskClose={askCloseFn}
          />
        </CNewModal>
      )}
    </>
  );
};
