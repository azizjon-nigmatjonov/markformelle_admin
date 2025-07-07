import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
// import {Validation} from "./Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputFieldUI } from "../../../components/UI/FieldUI";
import { LiteOptionsTable } from "../../../components/UI/Options/LiteTable";
import HFTextField from "../../../components/HFElements/HFTextField";
import { SubmitButton } from "../../../components/UI/FormButtons/SubmitButton";
import { FormLogic } from "./Logic";
import HFTextarea from "../../../components/HFElements/HFTextarea";
import CCheckbox from "../../../components/CElements/CCheckbox";

// const schema = Validation;

interface FormProps {
    handleModalActions: (val: string, val2: string) => void;
    defaultData: any;
    uniqueID: string;
}

export const Form = ({
    handleModalActions,
    uniqueID,
    defaultData
}: FormProps) => {
    const [formId, setFormId] = useState<number>(0);
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset
    } = useForm<any>({ mode: "onSubmit" });
    const { createForm, updateForm, deleteForm, formData } = FormLogic({ refetchTable: () => { }, formId, defaultData });
    console.log('formData', formData);

    const handleModalActionsFn = (status: string, id: string) => {
        if (status === "delete") {
            handleModalActions(status, id);
            reset();
            setFormId(0);
        }
        if (status === "close") {

        }
    };

    const onSubmit = (data: any) => {
        let params: any = data;

        if (formId) {
            params = {
                ...formData,
                ...params
            };


            updateForm(params, formId);
        } else {


            createForm(params);
        }
    };

    const setFormData = (data: any, setValue: any) => {
        setValue("PARTIYIL", data.PARTIYIL);
        setValue("PARTIID", data.PARTIID);
        setValue("PARTIADI", data.PARTIADI);
    }
    const setFormInitials = (setValue: any) => {
        setValue("PARTIYIL", dayjs().format("YYYY"));
    }

    useEffect(() => {
        if (formData?.PARTIID) {
            setFormData(formData, setValue);
        } else {
            setFormInitials(setValue);
        }
    }, [formData, setValue]);

    useEffect(() => {
        if (defaultData?.PARTIID) {
            setFormId(defaultData.PARTIID);
        } else {
            setValue("SIPARISTARIHI", dayjs().format("YYYY-MM-DD"));
        }
    }, [defaultData]);

    return (
        <form onKeyDown={
            (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }
        }
            onSubmit={
                handleSubmit(onSubmit)
            }>
            <div className="border-b border-[var(--border)] pb-3 mb-3 grid grid-cols-3 gap-3">
                <div className="col-span-1 flex space-x-2">
                    <InputFieldUI title="Parti yili">
                        <HFTextField name="PARTIYIL"
                            control={control}
                            disabled={true}

                            focused />
                    </InputFieldUI>
                    <InputFieldUI title="Parti id">
                        <HFTextField name="PARTIID"
                            control={control}
                            disabled={true}
                        />
                    </InputFieldUI>
                </div>
                <div className="col-span-2 flex justify-end">
                    <div className="w-[200px]">
                        <SubmitButton uniqueID={uniqueID}
                            type={
                                formId ? "update" : "create"
                            }
                            handleActions={
                                (val: string, uniqueID: string) => {
                                    if (uniqueID === "main_order_form") {
                                        if (val === "Close")
                                            handleModalActionsFn("close", "");

                                        if (val === "Enter")
                                            handleSubmit(onSubmit)();

                                    }
                                }
                            } />
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-3 gap-3">
                <div className="space-y-3">
                    <InputFieldUI title="Parti">
                        <LiteOptionsTable
                            handleSelect={(obj: { PARTIADI: string, PARTIID: string }) => {
                                setValue("PARTIADI", obj.PARTIADI);
                                setValue("PARTIID", obj.PARTIID);
                            }}
                            link="parti"
                            name="PARTIADI"
                            headColumns={[{
                                title: "Parti id",
                                id: "PARTIID",
                                width: 100
                            }, {
                                title: "Parti yılı",
                                id: "PARTIYIL",
                                width: 120
                            }]}
                            renderValue={(_: string, obj: any) => {
                                return obj.PARTIADI && obj.PARTIID ? `${obj.PARTIADI} - ${obj.PARTIID}` : obj.PARTIID;
                            }}
                            control={control}
                        /></InputFieldUI>
                    <InputFieldUI title="Firma kodu">
                        <LiteOptionsTable
                            handleSelect={(obj: { FIRMAID: string, FIRMAKODU: string }) => {
                                setValue("FIRMAID", obj.FIRMAID);
                                setValue("FIRMAKODU", obj.FIRMAKODU);
                            }}
                            link="firma"
                            name="FIRMAID"
                            headColumns={[{
                                title: "Firma id",
                                id: "FIRMAID",
                                width: 100
                            }, {
                                title: "Firma kodu",
                                id: "FIRMAKODU",
                                width: 120
                            }]}
                            renderValue={(_: string, obj: any) => {
                                return obj.FIRMAKODU && obj.FIRMAID ? `${obj.FIRMAKODU} - ${obj.FIRMAID}` : obj.FIRMAID;
                            }}
                            control={control}
                        /></InputFieldUI>

                    <InputFieldUI title="Islem tipi">
                        <LiteOptionsTable
                            handleSelect={(obj: { ISLEMTIPIID: string, ISLEMTIPI: string }) => {
                                setValue("ISLEMTIPIID", obj.ISLEMTIPIID);
                                setValue("ISLEMTIPI", obj.ISLEMTIPI);
                            }}
                            link="islemtipi"
                            name="FIRMAID"
                            headColumns={[{
                                title: "Islem tipi id",
                                id: "ISLEMTIPIID",
                                width: 100
                            }, {
                                title: "Islem tipi",
                                id: "ISLEMTIPI",
                                width: 120
                            }]}
                            renderValue={(_: string, obj: any) => {
                                return obj.ISLEMTIPI && obj.ISLEMTIPIID ? `${obj.ISLEMTIPI} - ${obj.ISLEMTIPIID}` : obj.ISLEMTIPIID;
                            }}
                            control={control}
                        /></InputFieldUI>

                    <InputFieldUI title="Islem Grubi">
                        <LiteOptionsTable
                            handleSelect={(obj: { ISLEMGID: string, ISLEMG: string }) => {
                                setValue("ISLEMGID", obj.ISLEMGID);
                                setValue("ISLEMG", obj.ISLEMG);
                            }}
                            link="islemgrubi"
                            name="FIRMAID"
                            headColumns={[{
                                title: "Islem grubu id",
                                id: "ISLEMGID",
                                width: 100
                            }, {
                                title: "Islem grubu",
                                id: "ISLEMG",
                                width: 120
                            }]}
                            renderValue={(_: string, obj: any) => {
                                return obj.ISLEMG && obj.ISLEMGID ? `${obj.ISLEMG} - ${obj.ISLEMGID}` : obj.ISLEMGID;
                            }}
                            control={control}
                        /></InputFieldUI>

                    <InputFieldUI title="Parti Kilosu">
                        <HFTextField
                            name="PARTIKILOSU"
                            control={control}
                            type="number"
                        />
                    </InputFieldUI>
                </div>


                <div className="space-y-3">
                    <InputFieldUI title="Fason">
                        <CCheckbox
                            element={{
                                name: "FASON",
                                label: "Fason",
                            }}
                            checked={getValues("FASON")}
                            handleCheck={(obj: any) => {
                                setValue("FASON", obj.checked);
                            }}
                        />
                    </InputFieldUI>

                    <InputFieldUI title="Recete yazıldı">
                        <CCheckbox
                            element={{
                                name: "RECETEYAZILDI",
                                label: "Recete yazıldı",
                            }}
                            checked={getValues("RECETEYAZILDI")}
                            handleCheck={(obj: any) => {
                                setValue("RECETEYAZILDI", obj.checked);
                            }}
                        />
                    </InputFieldUI>


                    <InputFieldUI title="Refakat Ka Yaz">
                        <CCheckbox
                            element={{
                                name: "RECETEYAZILDI",
                                label: "Recete yazıldı",
                            }}
                            checked={getValues("RECETEYAZILDI")}
                            handleCheck={(obj: any) => {
                                setValue("RECETEYAZILDI", obj.checked);
                            }}
                        />
                    </InputFieldUI>



                    <InputFieldUI title="Termin tarihi">
                        <HFTextField name="TERMINTARIGI"
                            control={control}
                            type="date"
                        />
                    </InputFieldUI>

                </div>

                <div className="space-y-3">

                    <HFTextarea
                        label="notu 1"
                        name="PLANLAMANOTU"
                        defaultValue={formData?.PLANLAMANOTU}
                        control={control}
                        minRows={2}
                    />

                    <HFTextarea
                        label="notu 2"
                        name="PLANLAMANOTU"
                        defaultValue={formData?.PLANLAMANOTU}
                        control={control}
                        minRows={2}
                    />
                </div>

            </div>
        </form>
    );
}; 