import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslationHook} from "../../../hooks/useTranslation";
import {IModalForm, ModalTypes} from "./interfaces";
import {Validation} from "./Validation";
import {useForm} from "react-hook-form";
import HFTextField from "../../../components/HFElements/HFTextField";
import {InputFieldUI} from "../../../components/UI/FieldUI";
import {useEffect, useState} from "react";
import {SelectOptionsTable} from "../../../components/UI/Options/Table";
import {useGetUrunList} from "../../../hooks/useFetchRequests/useUrunList";
import {useGetBirimList} from "../../../hooks/useFetchRequests/useBirimList";
import {CollapseUI} from "../../../components/CElements/CCollapse";
import CNewTable from "../../../components/CElements/CNewTable";
import {ModalTableLogic} from "./Logic";
import {TableForm} from "./TableForm";
import dayjs from "dayjs";

interface ModalUIProps {
    defaultData?: ModalTypes;
    URUNRECETEDETAYID?: number;
    URUNRECETEURUNID?: string;
    URUNADI?: string;
}
const schema = Validation;

export const ModalUI = ({
    defaultData = {}
} : ModalUIProps) => {
    const {t} = useTranslationHook();
    const [open, setOpen] = useState(false);
    const [formId, setFormId] = useState < string > ("");
    const [modalInitialData, setModalInitialData] = useState < ModalUIProps > ({});
    const {
        headColumns,
        tableData,
        refetch,
        createForm,
        updateForm,
        deleteFn,
        formData
    } = ModalTableLogic({
        urunId: defaultData ?. URUNRECETEURUNID || formId,
        setFormId
    });

    const {setFilterParams, filterParams, urunData} = useGetUrunList({});
    const {birimData, setFilterParams: setFilterParamsBirim, filterParams: filterParamsBirim} = useGetBirimList({enabled: "q"});

    const {control, handleSubmit, setValue} = useForm < IModalForm > ({mode: "onSubmit", resolver: yupResolver(schema)});

    const onSubmit = (data : IModalForm) => {


        if (formId) {
            updateForm(data, formId);
        } else {
            const params: Partial < any > = data;
            params.URUNRECETEURUNID = params.URUNID;
            params.DEGISIMTARIHI = dayjs();
            params.KULLANICIID = "1";
            delete params.BIRIMID;

            createForm(params);
        }
    };

    useEffect(() => {
        if (defaultData ?. URUNRECETEURUNID) {
            setFormId(defaultData ?. URUNRECETEURUNID);
            setValue("URUNID", defaultData ?. URUNRECETEURUNID || "");
        }
    }, [defaultData]);

    useEffect(() => {
        if (formId) {
            setValue("URUNID", formId);
        }
    }, [formId]);

    const handleActions = (el : any, status : string) => {
        setModalInitialData({});
        if (status === "modal") 
            setOpen(true);
        

        if (status === "view" || status === "edit") {
            setOpen(true);
            setModalInitialData(el);
        }

        if (status === "delete") 
            deleteFn([el.URUNRECETEDETAYID]);
        

        if (status === "delete_multiple") {
            deleteFn(el.map((item : {
                URUNRECETEDETAYID: number
            }) => {
                return item.URUNRECETEDETAYID;
            }));
        }
    };

    useEffect(() => {
        if (birimData ?. data ?. length) {
            setValue("URUNBIRIMID", birimData ?. data[0] ?. URUNBIRIMID);
            setValue("BIRIMID", birimData ?. data[0] ?. BIRIMID);
        }
    }, [birimData]);

    useEffect(() => {
        if (formData ?. URUNBIRIMADI) {
            setValue("BIRIMID", formData.URUNBIRIMADI);
            setValue("NOTU", formData.NOTU);
        }
    }, [formData]);

    return (
        <>
            <form onSubmit={
                handleSubmit(onSubmit)
            }>
                <div className="flex space-x-4 mb-5">
                    <div className="grid grid-cols-3 gap-x-5 w-full">
                        <InputFieldUI title={
                            t("URUNRECETEURUNID")
                        }>
                            <SelectOptionsTable name="URUNID"
                                placeholder={
                                    t("URUNRECETEURUNID")
                                }
                                options={
                                    urunData ?. data
                                }
                                required={true}
                                headColumns={
                                    [
                                        {
                                            id: "URUNID",
                                            title: "URUNID"
                                        }, {
                                            id: "ADI",
                                            title: "ADI"
                                        },
                                    ]
                                }
                                filterParams={filterParams}
                                handleSelect={
                                    (obj : any) => {
                                        setValue("URUNID", obj.URUNID);
                                        setValue("URUNRECETEURUNID", obj.URUNID);
                                        setFilterParamsBirim({
                                            ...filterParamsBirim,
                                            q: `&URUNID=${
                                                obj.URUNID
                                            }`
                                        });
                                    }
                                }
                                handleSearch={
                                    (val : string) => {
                                        setFilterParams({
                                            ...filterParams,
                                            q: val
                                        });
                                    }
                                }
                                control={control}
                                setFilterParams={setFilterParams}
                                disabled={
                                    !!formId
                                }/>
                        </InputFieldUI>

                <InputFieldUI title={
                    t("URUNBIRIMID")
                }>
                    <SelectOptionsTable name="BIRIMID"
                        options={
                            birimData ?. data
                        }
                        headColumns={
                            [
                                {
                                    id: "BIRIMID",
                                    title: "BIRIMID"
                                }, {
                                    id: "BIRIMADI",
                                    title: "BIRIMADI"
                                }, {
                                    id: "CARPAN",
                                    title: "CARPAN"
                                },
                            ]
                        }
                        filterParams={filterParamsBirim}
                        handleSelect={
                            (obj : any) => {
                                setValue("BIRIMID", obj.BIRIMID);
                                setValue("URUNBIRIMID", obj.URUNBIRIMID);
                            }
                        }
                        placeholder="URUNBIRIMID"
                        defaultValue={0}
                        position="right"
                        control={control}
                        setFilterParams={setFilterParamsBirim}
                        disabled={
                            formId ? true : !filterParamsBirim ?. q
                        }/>
                </InputFieldUI>

            <InputFieldUI title={
                t("NOTU")
            }>
                <HFTextField control={control}
                    name="NOTU"
                    placeholder={
                        t("NOTU")
                    }
                    setValue={setValue}
                    disabled={
                        !!formId
                    }
                    //   defaultValue={defaultData?.BARKODKODI}
                />
            </InputFieldUI>
        </div>
        <div className="flex justify-end">
            <button className={
                    `custom-btn ${
                        formId ? "disabled" : ""
                    }`
                }
                type="submit"
                style={
                    {minWidth: "150px"}
                }
                disabled={
                    formId ? true : false
            }>
                {
                t("create")
            } </button>
        </div>
    </div>

    <CollapseUI title=""
        disabled={true}
        defaultOpen={true}>
        <CNewTable title={
                t("table_mixtures_details")
            }
            key={
                tableData ?. data ?. length ? "table_mixtures_details" : "empty"
            }
            headColumns={headColumns}
            bodyColumns={
                tableData ?. data ?? []
            }
            handleActions={handleActions}
            idForTable="modal_mixtures"
            isLoading={false}
            filterParams={filterParams}
            autoHeight={"440px"}
            disablePagination={true}
            animation={false}
            clickable={true}
            disabled={
                !formId
            }
            handleFilterParams={setFilterParams}/>
    </CollapseUI>
</form>
{
open && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[99]">
        <TableForm setOpen={setOpen}
            defaultData={
                {
                    ...modalInitialData,
                    ...formData
                }
            }
            refetch={refetch}
            formId={
                modalInitialData ?. URUNRECETEDETAYID
            }/>

        <div className="w-[100vw] h-[100vh] bg-[#00000044] fixed z-[91]"
            onClick={
                () => setOpen(false)
        }></div>
    </div>
)} </>
    );
};
