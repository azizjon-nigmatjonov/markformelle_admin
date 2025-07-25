import { useState } from "react";
import CNewTable from "../../../../components/CElements/CNewTable";
import { IFilterParams } from "../../../../interfaces";
import { TableData } from "./Logic";
import { useTableHeaders } from "../Logic";
import { ProxyLogic } from "./Logic";
import { ProxyFinalModal } from "./ProxyFinalModal";

export const Tables = ({ formId }: { formId: number }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<any>([]);
  const [currentSiparis, setCurrentSiparis] = useState<any>({});

  const [filterParams, setFilterParams] = useState<IFilterParams>({
    page: 1,
    perPage: 50,
  });

  const { bodyColumns, isLoading, siparisData, siparisIsLoading, refetch } =
    TableData({
      filterParams,
      formId,
    });

  const { checkProxy, deleteProxy } = ProxyLogic({
    setOpenModal,
    setModalData,
    currentSiparis,
    refetchTable: refetch,
  });

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns: [
      {
        id: ["card", "PARTIKAYITID"],
        title: "CARD",
        width: 120,
        render: ([_, PARTIKAYITID]: any) => {
          return (
            <div
              className="relative"
              onClick={() => {
                setOpenModal(true);
                setCurrentSiparis({
                  ...siparisData.find(
                    (item: any) => item.PARTIKAYITID === PARTIKAYITID
                  ),
                });
              }}
            >
              <img
                className="ml-2"
                src="/images/card.png"
                alt="card"
                width={24}
              />
            </div>
          );
        },
      },
    ],
  });

  const { newHeadColumns: newHeadColumnsSiparis } = useTableHeaders({
    bodyColumns: siparisData,
    predefinedColumns: [],
  });

  return (
    <>
      <div className="space-y-5">
        <CNewTable
          title="siparisler"
          headColumns={newHeadColumnsSiparis}
          bodyColumns={siparisData}
          autoHeight="200px"
          isLoading={siparisIsLoading}
          idForTable="modal_table_zerve"
          handleFilterParams={setFilterParams}
          filterParams={filterParams}
          disablePagination
          innerTable
          defaultFilters={["excel_download", "active_menu"]}
        />

        <CNewTable
          title="partistok"
          headColumns={newHeadColumns}
          bodyColumns={bodyColumns}
          autoHeight="200px"
          isLoading={isLoading}
          idForTable="modal_inner_partistok"
          handleFilterParams={setFilterParams}
          filterParams={filterParams}
          disablePagination
          innerTable
          defaultFilters={["excel_download", "active_menu"]}
        />
      </div>

      {openModal && (
        <ProxyFinalModal
          setOpen={setOpenModal}
          modalData={modalData?.[0]}
          deleteProxy={deleteProxy}
          currentSiparis={currentSiparis}
          checkProxy={checkProxy}
          setCurrentSiparis={setCurrentSiparis}
        />
      )}
    </>
  );
};
