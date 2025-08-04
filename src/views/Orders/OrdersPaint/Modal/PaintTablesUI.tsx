import { useEffect, useState, useCallback, useMemo } from "react";
import { PaintTable } from "../Tables/Paint";
import {
  IslemTipiTableLogic,
  PaintVariantTableLogic,
} from "../../Orders/Tables/Logic";
import { PaintTableLogic } from "../Tables/Logic";
import { PaintForm } from "./Forms/PaintForm";
import { PaintFormYarn } from "./Forms/PaintFormYarn";
import { PartianTable } from "../Tables/Partion";
import CLabel from "../../../../components/CElements/CLabel";
import CCheckbox from "../../../../components/CElements/CCheckbox";
import { PaintFormLogic } from "./Forms/PaintComponents/Logic";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { websiteActions } from "../../../../store/website";

export const PaintTablesUI = ({
  handleActionsTable,
  uniqueID,
  currentPaint,
  formId,
  setCurrentPaint,
  currentMaterial,
  formData,
}: {
  handleActionsTable: (obj: any, status: string, type: string) => void;
  uniqueID: string;
  currentPaint: any;
  formId: number;
  setCurrentPaint: (obj: any) => void;
  currentMaterial: any;
  formData: any;
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
  const isDirty = useSelector(
    (state: RootState) => state.website.dirty_places.isDirty
  );
  const dispatch = useDispatch();
  const { isLoading, headColumns, bodyColumns, refetch, deleteFn } =
    PaintTableLogic({ filterParams });

  // Memoize the refetch function to prevent unnecessary re-renders
  const memoizedRefetch = useCallback(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  const { updateForm } = PaintFormLogic({
    formId: 0,
    defaultData: {},
    closeFn: memoizedRefetch,
  });
  const dirty_places = useSelector(
    (state: RootState) => state.website.dirty_places
  );

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
  }, [bodyColumns, setCurrentPaint]);

  useEffect(() => {
    if (currentPaint) {
      setFilterParamsVariant((prevParams: any) => ({
        ...prevParams,
        DESENID: currentPaint?.DESENID,
      }));
      setFilterParamsIslemTipi((prevParams: any) => ({
        ...prevParams,
        BOYASIPARISDETAYID: currentPaint?.BOYASIPARISDETAYID,
      }));
    }
  }, [currentPaint]);

  const handlePaintActionsPaint = (obj: any, status: string) => {
    handleActionsTable(obj, status, "paint");
  };

  // Memoize the currentPaint with index to prevent unnecessary re-renders
  const currentPaintWithIndex = useMemo(
    () => ({
      ...currentPaint,
      index: currentPaint?.index || 1,
    }),
    [currentPaint]
  );

  // Memoize the bodyColumns with backgroundColor to prevent unnecessary re-renders
  const bodyColumnsWithBackground = useMemo(() => {
    return bodyColumns?.map((item: any) => ({
      ...item,
      backgroundColor: item?.ONAYDURUMU ? "bg-green-200" : "",
    }));
  }, [bodyColumns]);
  console.log("isDirty paintTablesUI", isDirty);

  return (
    <>
      <div className="space-y-5">
        <PaintTable
          title="Boya Siparis Detay Girisi"
          handleActionsTable={(obj: any, status: string) => {
            if (status === "view_single_right_click") {
              return;
            }
            if (isDirty) {
              handleActionsTable(obj, "modal", "paint");
            } else {
              handlePaintActionsPaint(obj, status);
            }
          }}
          height="180px"
          currentPaint={currentPaintWithIndex}
          setCurrentPaint={setCurrentPaint}
          isLoading={isLoading}
          headColumns={headColumns}
          bodyColumns={bodyColumnsWithBackground}
          deleteFn={deleteFn}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          formId={formId ?? 0}
          defaultFilters={[
            "add",
            "delete",
            "excel_download",
            "excel_upload",
            "actions",
            "sellect_more",
          ]}
          rightChildren={(obj: any) => {
            if (!bodyColumns?.length) return;
            return (
              <div className="p-2 w-[180px]">
                <CLabel title="ONAYDURUMU" />
                <CCheckbox
                  element={{
                    label: "ONAYDURUMU",
                    name: "ONAYDURUMU",
                  }}
                  checked={obj?.ONAYDURUMU}
                  handleCheck={(val: any) => {
                    updateForm(
                      { ...obj, ONAYDURUMU: val.checked },
                      obj?.BOYASIPARISDETAYID
                    );
                  }}
                />
              </div>
            );
          }}
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
            "active_menu",
            "sellect_more",
          ]}
          formData={formData}
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
      {uniqueID === "paint_form" ? (
        <PaintForm
          parentId={formId}
          title="Boya Siparis Detay Girisi (Kumash)"
          handleActions={(val: string) => {
            if (dirty_places.list.length) {
              dispatch(
                websiteActions.setDirtyPlaces({ list: "", isDirty: true })
              );
            } else {
              handleActionsTable({}, val, "paint");
            }
          }}
          defaultData={currentPaint}
          uniqueID={uniqueID}
          refetch={memoizedRefetch}
          isDirty={isDirty}
        />
      ) : (
        ""
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
    </>
  );
};
