import { useMemo, useState } from "react";
import { PartyTransfersLogic, RezerveTableLogic } from "./Logic";
import { useTableHeaders } from "../Logic";
import CNewTable from "../../../../components/CElements/CNewTable";
import { TransferModal } from "./TransferModal";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { RezervTable } from "./Rezerve";

export const PartyTransfers = ({ defaultData }: { defaultData: any }) => {
  const [open, setOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState({});
  const [filterParams, setFilterParams] = useState({
    page: 1,
    perPage: 10,
  });

  const { bodyColumns, isLoading, deleteFn, refetch } = PartyTransfersLogic({
    PARTIKAYITID: defaultData?.PARTIKAYITID,
  });

  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpen(true);
      setModalInitialData({});
    }

    if (status === "view" || status === "edit") {
      setOpen(true);

      setModalInitialData(el);
    }

    if (status === "delete") {
      deleteFn([el.PARTIASAMALARIID]);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { PARTIASAMALARIID: string }) => {
          return item.PARTIASAMALARIID;
        })
      );
    }
  };

  const predefinedColumns = useMemo(() => {
    return [
      {
        title: "SIRA",
        id: "SIRA",
        render: (val: number) => {
          return val || "0";
        },
      },
      {
        title: "ASAMAID",
        id: "ASAMAID",
      },
      {
        title: "ASAMAADI",
        id: "ASAMAADI",
      },
      {
        title: "RECETEID",
        id: "RECETEID",
      },
      {
        title: "RECETEADI",
        id: "RECETEADI",
      },
      {
        title: "BANYOCARPANI",
        id: "BANYOCARPANI",
      },
      {
        title: "BANYOCARPANI2",
        id: "BANYOCARPANI2",
      },
      {
        title: "BANYOCARPANI3",
        id: "BANYOCARPANI3",
      },
      {
        title: "BANYOCARPANI4",
        id: "BANYOCARPANI4",
      },
    ];
  }, []);

  const modalActionsFn = (status: string) => {
    if (status === "Close") {
      setOpen(false);
    }
  };

  const { newHeadColumns } = useTableHeaders({
    bodyColumns,
    predefinedColumns,
  });

  const { bodyColumns: bodyColumnsRezerve, isLoading: isLoadingRezerve } =
    RezerveTableLogic({
      PARTIKAYITID: defaultData?.PARTIKAYITID,
    });

  return (
    <>
      <div className="space-y-5">
        <CNewTable
          title="parti_asamalari"
          headColumns={newHeadColumns?.length ? newHeadColumns : []}
          bodyColumns={bodyColumns?.length ? bodyColumns : []}
          handleActions={handleActions}
          isLoading={isLoading}
          idForTable="party_transfers"
          filterParams={filterParams}
          handleFilterParams={setFilterParams}
          defaultFilters={[
            "delete",
            "actions",
            "excel_download",
            "sellect_more",
          ]}
          autoHeight="250px"
          innerTable={true}
          defaultSearch={{
            PARTIYIL: "",
            PARTIID: "",
          }}
          disablePagination
        />

        <div className="overflow-y-scroll designed-scroll">
          <RezervTable
            bodyColumns={bodyColumnsRezerve}
            isLoading={isLoadingRezerve}
          />
        </div>
      </div>

      {open && (
        <CNewMiniModal title="Party transfers" handleActions={modalActionsFn}>
          <TransferModal
            defaultData={{
              ...modalInitialData,
              calculateNumber: bodyColumnsRezerve?.[0]?.MIKTAR || 1,
            }}
            refetchTable={() => {
              refetch();
              setOpen(false);
            }}
          />
        </CNewMiniModal>
      )}
    </>
  );
};
