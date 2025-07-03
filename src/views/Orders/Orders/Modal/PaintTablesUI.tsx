import { useEffect, useState } from "react";
import { PaintTable } from "../Tables/Paint";
import {
  IslemTipiTableLogic,
  PaintTableLogic,
  PaintVariantTableLogic,
} from "../Tables/Logic";
import { PaintForm } from "./Forms/PaintForm";
import { PaintFormYarn } from "./Forms/PaintFormYarn";

export const PaintTablesUI = ({
  handleActionsTable,
  uniqueID,
  currentPaint,
  formId,
  setCurrentPaint,
  currentKnitting,
}: {
  handleActionsTable: (obj: any, status: string, type: string) => void;
  uniqueID: string;
  currentPaint: any;
  formId: number;
  currentKnitting: any;
  setCurrentPaint: (obj: any) => void;
}) => {
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
    if (currentKnitting?.ORMESIPARISDETAYID) {
      setFilterParams({
        ...filterParams,
        ORMESIPARISDETAYID: currentKnitting?.ORMESIPARISDETAYID,
      });
    }
  }, [currentKnitting]);

  useEffect(() => {
    if (currentPaint) {
      setFilterParamsVariant({
        ...filterParamsVariant,
        DESENID: currentPaint?.DESENID,
      });
      setFilterParamsIslemTipi({
        ...filterParamsIslemTipi,
        ISLEMTIPIID: currentPaint?.ISLEMTIPIID,
      });
    }
  }, [currentPaint]);

  const handlePaintActionsPaint = (obj: any, status: string) => {
    handleActionsTable(obj, status, "paint");
  };

  return (
    <>
      <PaintTable
        title="Boya Siparis Detay Girisi"
        handleActionsTable={(obj: any, status: string) => {
          handlePaintActionsPaint(obj, status);
        }}
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
        currentPaint={currentPaint}
        setCurrentPaint={setCurrentPaint}
        isLoading={isLoading}
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        deleteFn={deleteFn}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        formId={currentKnitting?.ORMESIPARISDETAYID || formId}
      />
      <div className="grid grid-cols-2 gap-x-2 mt-3">
        <PaintTable
          handleActionsTable={(obj: any, status: string) => {
            handleActionsTable(obj, status, "paint");
          }}
          defaultFilters={["excel_download", "actions"]}
          title="Variant"
          headColumns={headColumnsVariant}
          bodyColumns={bodyColumnsVariant}
          formId={formId ?? 0}
        />
        <PaintTable
          defaultFilters={["excel_download", "actions"]}
          handleActionsTable={(obj: any, status: string) => {
            handleActionsTable(obj, status, "paint");
          }}
          title="Islem Tipi"
          headColumns={headColumnsIslemTipi}
          bodyColumns={bodyColumnsIslemTipi}
          formId={formId ?? 0}
        />
      </div>
      {uniqueID === "paint_form" && (
        <PaintForm
          parentId={formId}
          ORMESIPARISDETAYID={currentKnitting?.ORMESIPARISDETAYID}
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
      )}{" "}
    </>
  );
};
