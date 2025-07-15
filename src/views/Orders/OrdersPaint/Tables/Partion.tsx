import CNewTable from "../../../../components/CElements/CNewTable";
import { useEffect, useMemo, useState } from "react";
import { MaterialTableLogic } from "./Logic";
import { MaterialForm } from "../Modal/Forms/MaterialForm";
import { MaterialModal } from "./RezervedMaterial/MaterialModal";
import CNewMiniModal from "../../../../components/CElements/CNewMiniModal";
import { PartiCreate } from "../Modal/PartiCreate";

export const PartianTable = ({
  handleActionsTable,
  uniqueID,
  formId,
  currentMaterial,
  currentPaint,
  defaultFilters = [],
  formData,
}: {
  formId: number;
  currentMaterial: any;
  uniqueID: string;
  handleActionsTable: (val: any, status: string, type: string) => void;
  currentPaint: any;
  defaultFilters?: string[];
  formData: any;
}) => {
  const [openParty, setOpenParty] = useState(false);
  const [openAddRezerv, setOpenAddRezerv] = useState(false);
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { isLoading, headColumns, bodyColumns, deleteFn, refetch } =
    MaterialTableLogic({
      filterParams,
    });

  useEffect(() => {
    if (currentPaint?.BOYASIPARISDETAYID) {
      setFilterParams({
        ...filterParams,
        BOYASIPARISDETAYID: currentPaint.BOYASIPARISDETAYID,
      });
    }
  }, [currentPaint]);
  const [currentRezerv, setCurrentRezerv] = useState<any>(null);
  const handleActions = (el: any, status: string) => {
    if (status === "modal") {
      setOpenAddRezerv(true);
    }
    if (status === "delete") {
      deleteFn([el.BOYASIPARISREZERVID]);
    }
    if (status === "view_single_right_click") {
      setCurrentRezerv(el);
    }
    if (status === "delete_multiple") {
      deleteFn(
        el.map((item: { BOYASIPARISREZERVID: number }) => {
          return item.BOYASIPARISREZERVID;
        })
      );
    }
  };

  return (
    <>
      <CNewTable
        title="rezerv"
        idForTable="partiya_table_inner"
        headColumns={headColumns}
        handleActions={(obj: any, status: string) => {
          handleActions(obj, status);
        }}
        defaultFilters={defaultFilters}
        disablePagination={true}
        innerTable={true}
        bodyColumns={bodyColumns}
        autoHeight="180px"
        handleFilterParams={(params: any) => {
          setFilterParams(params);
        }}
        rightChildren={
          <button
            onClick={() => setOpenParty(true)}
            className="px-2 py-1 hover:bg-blue-200"
          >
            Rezervden hizli parti olustir
          </button>
        }
        isLoading={isLoading}
        filterParams={filterParams}
      />
      {uniqueID === "material_form" && (
        <MaterialForm
          handleActions={(val: string) => {
            handleActionsTable({}, val, "material");
          }}
          refetch={refetch}
          defaultData={currentMaterial}
          uniqueID={uniqueID}
          parentId={formId ?? 0}
        />
      )}
      {openAddRezerv && (
        <CNewMiniModal
          title="Rezerve Icin Siparis Ham Stok Listesi"
          handleActions={() => {
            setOpenAddRezerv(false);
            refetch();
          }}
        >
          <MaterialModal
            currentId={currentPaint?.BOYASIPARISDETAYID}
            BOYASIPARISKAYITID={formId}
            setOpenAddRezerv={() => {
              setOpenAddRezerv(false);
              refetch();
            }}
            currentPaint={currentPaint}
          />
        </CNewMiniModal>
      )}
      {openParty && (
        <PartiCreate
          onClose={() => setOpenParty(false)}
          currentPaint={currentPaint}
          currentRezerv={currentRezerv}
          formData={formData}
        />
      )}
    </>
  );
};
