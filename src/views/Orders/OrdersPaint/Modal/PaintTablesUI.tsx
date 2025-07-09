import { useEffect, useState } from "react";
import { PaintTable } from "../Tables/Paint";
import {
  IslemTipiTableLogic,
  PaintVariantTableLogic,
} from "../../Orders/Tables/Logic";
import { PaintTableLogic } from "../Tables/Logic";
import { PaintForm } from "./Forms/PaintForm";
import { PaintFormYarn } from "./Forms/PaintFormYarn";
import { PartianTable } from "../Tables/Partion";
import { PartiCreate } from "./PartiCreate";

export const PaintTablesUI = ({
  handleActionsTable,
  uniqueID,
  currentPaint,
  formId,
  setCurrentPaint,
  currentMaterial,
}: {
  handleActionsTable: (obj: any, status: string, type: string) => void;
  uniqueID: string;
  currentPaint: any;
  formId: number;
  setCurrentPaint: (obj: any) => void;
  currentMaterial: any;
}) => {
  const [openParty, setOpenParty] = useState(false);
  const [filterParams, setFilterParams]: any = useState({
    page: 1,
    perPage: 50,
  });
  const [filterParamsVariant, setFilterParamsVariant]: any = useState({
    page: 1,
    perPage: 50,
  });
  const [filterParamsIslemTipi, setFilterParamsIslemTipi]: any = useState({
    page: 1,
    perPage: 50,
  });
  const { isLoading, headColumns, bodyColumns, refetch, deleteFn } =
    PaintTableLogic({ filterParams });

  const { headColumns: headColumnsVariant, bodyColumns: bodyColumnsVariant } =
    PaintVariantTableLogic({ filterParams: filterParamsVariant });

  const {
    headColumns: headColumnsIslemTipi,
    bodyColumns: bodyColumnsIslemTipi,
  } = IslemTipiTableLogic({ filterParams: filterParamsIslemTipi });

  useEffect(() => {
    if (bodyColumns?.[0]) {
      setCurrentPaint(bodyColumns?.[0]);
    }
  }, [bodyColumns]);

  useEffect(() => {
    if (currentPaint) {
      setFilterParamsVariant({
        ...filterParamsVariant,
        DESENID: currentPaint?.DESENID,
      });
      setFilterParamsIslemTipi({
        ...filterParamsIslemTipi,
        BOYASIPARISDETAYID: currentPaint?.BOYASIPARISDETAYID,
      });
    }
  }, [currentPaint]);

  const handlePaintActionsPaint = (obj: any, status: string) => {
    handleActionsTable(obj, status, "paint");
  };

  return (
    <>
      <div className="space-y-5">
        <PaintTable
          handleActionsTable={(obj: any, status: string) => {
            handlePaintActionsPaint(obj, status);
          }}
          height="180px"
          title="Boya Siparis Detay Girisi"
          currentPaint={currentPaint}
          setCurrentPaint={setCurrentPaint}
          isLoading={isLoading}
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          deleteFn={deleteFn}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          formId={formId ?? 0}
          defaultFilters={[
            "add",
            "delete",
            "excel_download",
            "excel_upload",
            "filter",
            "active_menu",
            "actions",
            "sellect_more",
          ]}
        />
        <PartianTable
          handleActionsTable={(obj: any, status: string, type: string) => {
            handleActionsTable(obj, status, type);
          }}
          currentPaint={currentPaint}
          uniqueID={uniqueID}
          currentMaterial={currentMaterial}
          formId={formId ?? 0}
          defaultFilters={[
            "add",
            "delete",
            "excel_download",
            "actions",
            "sellect_more",
          ]}
        />

        <div className="grid grid-cols-2 gap-x-3">
          <PaintTable
            handleActionsTable={(obj: any, status: string) => {
              handleActionsTable(obj, status, "paint");
            }}
            title="Variant"
            height="180px"
            headColumns={headColumnsVariant}
            bodyColumns={bodyColumnsVariant}
            formId={formId ?? 0}
            defaultFilters={["add", "delete", "excel_download", "actions"]}
          />
          <PaintTable
            handleActionsTable={(obj: any, status: string) => {
              handleActionsTable(obj, status, "paint");
            }}
            title="Islem Ilavasi"
            height="180px"
            headColumns={headColumnsIslemTipi}
            bodyColumns={bodyColumnsIslemTipi}
            formId={formId ?? 0}
            defaultFilters={["add", "delete", "excel_download", "actions"]}
          />
        </div>
      </div>
      {uniqueID === "paint_form" && (
        <PaintForm
          parentId={formId}
          title="Boya Siparis Detay Girisi (Kumash)"
          handleActions={(val: string) => {
            handleActionsTable({}, val, "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
          refetch={refetch || (() => {})}
        />
      )}
      {uniqueID === "paint_form_iplik" && (
        <PaintFormYarn
          title=" Boya Siparis Detay Girisi (Iplik)"
          handleActions={(val: string) => {
            handleActionsTable({}, val + "_yarn", "paint");
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
        />
      )}
      {openParty && <PartiCreate onClose={() => setOpenParty(false)} />}
    </>
  );
};
