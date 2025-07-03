import {useEffect, useState} from "react";
import {PaintTable} from "../Tables/Paint";
import {IslemTipiTableLogic, PaintTableLogic, PaintVariantTableLogic} from "../Tables/Logic";
import {PaintForm} from "./Forms/PaintForm";
import {PaintFormYarn} from "./Forms/PaintFormYarn";

export const PaintTablesUI = ({
    handleActionsTable,
    uniqueID,
    currentPaint,
    formId,
    setCurrentPaint
} : {
    handleActionsTable: (obj : any, status : string, type : string) => void;
    uniqueID: string;
    currentPaint: any;
    formId: number;
    setCurrentPaint: (obj : any) => void;
}) => {

    const [filterParams, setFilterParams] : any = useState({page: 1, perPage: 50});
    const [filterParamsVariant, setFilterParamsVariant] : any = useState({page: 1, perPage: 50});
    const [filterParamsIslemTipi, setFilterParamsIslemTipi] : any = useState({page: 1, perPage: 50});
    const {
        isLoading,
        headColumns,
        bodyColumns,
        refetch,
        deleteFn
    } = PaintTableLogic({filterParams});

    const {headColumns: headColumnsVariant, bodyColumns: bodyColumnsVariant} = PaintVariantTableLogic({filterParams: filterParamsVariant});

    const {headColumns: headColumnsIslemTipi, bodyColumns: bodyColumnsIslemTipi} = IslemTipiTableLogic({filterParams: filterParamsIslemTipi});

    useEffect(() => {
        if (bodyColumns ?. [0]) {
            setCurrentPaint(bodyColumns ?. [0]);
        }
    }, [bodyColumns]);


    useEffect(() => {
        if (currentPaint) {
            setFilterParamsVariant({
                ...filterParamsVariant,
                DESENID: currentPaint ?. DESENID
            });
            setFilterParamsIslemTipi({
                ...filterParamsIslemTipi,
                ISLEMTIPIID: currentPaint ?. ISLEMTIPIID
            });
        }
    }, [currentPaint]);

    const handlePaintActionsPaint = (obj : any, status : string) => {
        handleActionsTable(obj, status, "paint");
    };


    return <>
        <PaintTable title="Boya Siparis Detay Girisi"
            handleActionsTable={
                (obj : any, status : string) => {
                    handlePaintActionsPaint(obj, status);
                }
            }

            currentPaint={currentPaint}
            setCurrentPaint={setCurrentPaint}
            isLoading={isLoading}
            headColumns={headColumns}
            bodyColumns={bodyColumns}
            deleteFn={deleteFn}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
            formId={
                formId ?? 0
            }/>

        <div className="grid grid-cols-2 gap-x-2 mt-3">
            <PaintTable handleActionsTable={
                    (obj : any, status : string) => {
                        handleActionsTable(obj, status, "paint");
                    }
                }
                title="Variant"
                headColumns={headColumnsVariant}
                bodyColumns={bodyColumnsVariant}
                formId={
                    formId ?? 0
                }/>
            <PaintTable handleActionsTable={
                    (obj : any, status : string) => {
                        handleActionsTable(obj, status, "paint");
                    }
                }
                title="Islem Tipi"
                headColumns={headColumnsIslemTipi}
                bodyColumns={bodyColumnsIslemTipi}

                formId={
                    formId ?? 0
                }/>
        </div>

    {
    uniqueID === "paint_form" && (
        <PaintForm parentId={formId}
            title="Boya Siparis Detay Girisi (Kumash)"
            handleActions={
                (val : string) => {
                    handleActionsTable({}, val, "paint");
                }
            }
            defaultData={currentPaint}
            uniqueID={uniqueID}
            refetch={
                refetch || (() => {})
            }/>
    )
}
    {
    uniqueID === "paint_form_iplik" && (
        <PaintFormYarn title=" Boya Siparis Detay Girisi (Iplik)"
            handleActions={
                (val : string) => {
                    handleActionsTable({}, val + "_yarn", "paint");
                }
            }
            defaultData={currentPaint}
            uniqueID={uniqueID}/>
    )
} </>
};
