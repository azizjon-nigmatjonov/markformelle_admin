import { useForm } from "react-hook-form";
import CNewMiniModal from "../../../../../components/CElements/CNewMiniModal";
import { LiteOptionsTable } from "../../../../../components/UI/Options/LiteTable";
import { SubmitCancelButtons } from "../../../../../components/UI/FormButtons/SubmitCancel";
import HFInputMask from "../../../../../components/HFElements/HFInputMask";
import dayjs from "dayjs";
import CCheckbox from "../../../../../components/CElements/CCheckbox";
import CLabel from "../../../../../components/CElements/CLabel";
import { useEffect, useState } from "react";
import { PaintFormLogic } from "./PaintComponents/Logic";
import HFTextarea from "../../../../../components/HFElements/HFTextarea";

export const PaintFormYarn = ({
    handleActions,
    uniqueID,
    defaultData,
    title,
}: {
    handleActions: (val: string) => void;
    uniqueID: string;
    defaultData: any;
    title: string;
}) => {
    const [formId, setFormId] = useState(0);
    const { control, setValue, handleSubmit, getValues } = useForm();

    const { formData } = PaintFormLogic({ formId, defaultData, closeFn: () => { } });

    const onSubmit = (data: any) => {
        console.log(data);
        console.log(defaultData);
    };

    const setFormDefaultData = (data: any) => {
        setValue("BOYASIPARISDETAYID", data.BOYASIPARISDETAYID);
        setValue("BOYASIPARISID", data.BOYASIPARISID);
        setValue("BOYASIPARISTIPIADI", data.BOYASIPARISTIPIADI);
        setValue("BOYASIPARISTIPIADI", data.BOYASIPARISTIPIADI);
        setValue("HAMID", data.HAMID);
        setValue("TERMINTARIHI", dayjs(data.TERMINTARIHI).format("YYYY-MM-DD"));
        setValue("VADEGUN", data.VADEGUN);
        setValue("LABRECETEKODU", data.LABRECETEKODU);
        setValue("MUSTERISIPARISNO", data.MUSTERISIPARISNO);
        setValue("TAHMINIFIREORANI", data.TAHMINIFIREORANI);
        setValue("CEKILISTESICIKACAK", data.CEKILISTESICIKACAK);
        setValue("TERMINNOTU", data.TERMINNOTU);
        setValue("PLANLAMANOTU", data.PLANLAMANOTU);
    };

    useEffect(() => {
        if (formData?.BOYASIPARISDETAYID) {
            setFormId(formData?.BOYASIPARISDETAYID);
            setFormDefaultData(formData);
        } else {
            setValue("TERMINTARIHI", dayjs().format("YYYY-MM-DD"));
        }
    }, [formData]);

    return (
        <CNewMiniModal title={title} handleActions={handleActions}>
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                onSubmit={handleSubmit(onSubmit)}
                className="w-[800px]"
            >
                <div className="grid grid-cols-2 gap-x-3 mb-3">
                    <div className="space-y-2">
                        <LiteOptionsTable
                            label="Ham Stok"
                            renderValue={(_: string, obj: any) => {
                                return obj.HAMID && obj.ADI
                                    ? obj.HAMID + " - " + obj.ADI
                                    : obj.HAMID;
                            }}
                            handleSelect={(data: { HAMID: string }) => {
                                setValue("HAMID", data.HAMID);
                            }}
                            name="HAMID"
                            headColumns={[
                                { id: "HAMID", title: "HAMID", width: 60 },
                                { id: "ADI", title: "ADI", width: 150 },
                            ]}
                            defaultValue={
                                formData?.HAMID && formData?.HAMADI
                                    ? formData?.HAMID + " - " + formData?.HAMADI
                                    : formData?.HAMID
                            }
                            link="ham"
                            control={control}
                        />
                        <HFInputMask
                            label="Pus"
                            name="PUS"
                            control={control}
                            defaultValue={formData?.PUS}
                        />
                        <HFInputMask
                            label="Kilo"
                            name="IPTALKILO"
                            control={control}
                            defaultValue={formData?.IPTALKILO}
                        />
                        <HFInputMask
                            label="Metre"
                            name="IPTALMETRE"
                            control={control}
                            defaultValue={formData?.IPTALMETRE}
                        />
                        <LiteOptionsTable
                            label="Birim fiyat 1. Kalite"
                            handleSelect={() => { }}
                            name="KALITEID"
                            headColumns={[
                                { id: "KALITEID", title: "KALITEID" },
                                { id: "ADI", title: "ADI" },
                            ]}
                            link="kalite"
                            control={control}
                        />
                        <div className="grid grid-cols-3 gap-x-2">
                            <LiteOptionsTable
                                label="Fason Birim Fiyat"
                                name="DOVIZID"
                                renderValue={(_: string, obj: any) => {
                                    return obj.DOVIZID || obj.CINSI;
                                }}
                                link="doviz"
                                defaultValue={"USD"}
                                headColumns={[
                                    { id: "CINSI", title: "CINSI", width: 60 },
                                    { id: "DOVIZID", title: "DOVIZID", width: 80 },
                                ]}
                                handleSelect={(obj: { DOVIZID: string }) => {
                                    setValue("DOVIZID", obj.DOVIZID);
                                }}
                                control={control}
                            />
                            <HFInputMask
                                label="Vade"
                                name="VADEGUN"
                                control={control}
                                defaultValue={formData?.VADEGUN}
                            />
                        </div>
                        <LiteOptionsTable
                            label="Lab Recete Kod"
                            name="LABRECETEKODU"
                            renderValue={(_: string, obj: any) => {
                                return obj.LABRECETEKODU;
                            }}
                            link="labrecete"
                            headColumns={[
                                { id: "LABRECETEKODU", title: "LABRECETEKODU", width: 140 },
                                { id: "ADI", title: "ADI", width: 140 },
                            ]}
                            defaultValue={formData?.LABRECETEKODU}
                            handleSelect={(obj: { LABRECETEKODU: string }) => {
                                setValue("LABRECETEKODU", obj.LABRECETEKODU);
                            }}
                            control={control}
                        />
                        <LiteOptionsTable
                            label="Renk"
                            name="RENKID"
                            renderValue={(_: string, obj: any) => {
                                return obj.RENKID && obj.ADI
                                    ? obj.RENKID + " - " + obj.ADI
                                    : obj.RENKID;
                            }}
                            defaultValue={
                                formData?.RENKID && formData?.RENKADI
                                    ? formData?.RENKID + " - " + formData?.RENKADI
                                    : formData?.RENKID
                            }
                            link="renk"
                            headColumns={[
                                { id: "RENKID", title: "RENKID", width: 80 },
                                { id: "ADI", title: "ADI", width: 280 },
                            ]}
                            handleSelect={(obj: { RENKID: number }) => {
                                setValue("RENKID", obj.RENKID);
                            }}
                            control={control}
                        />
                        <LiteOptionsTable
                            label="Lab Dip No"
                            name="LABDIPID"
                            link="labdipno"
                            headColumns={[
                                { id: "LABDIPID", title: "LABDIPID" },
                                { id: "ADI", title: "ADI" },
                            ]}
                            handleSelect={() => { }}
                            control={control}
                        />
                        <HFInputMask
                            label="Musteri Siparis No"
                            name="MUSTERISIPARISNO"
                            control={control}
                            handleChange={(val?: string) => {
                                setValue("MUSTERISIPARISNO", val);
                            }}
                            defaultValue={formData?.MUSTERISIPARISNO}
                        />
                        <LiteOptionsTable
                            label="Sparis Proses"
                            name="SIPARISPROSESID"
                            link="siparisproses"
                            renderValue={(_: string, obj: any) => {
                                return obj.SIPARISPROSESID && obj.ADI
                                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                                    : obj.SIPARISPROSESID;
                            }}
                            headColumns={[
                                {
                                    id: "SIPARISPROSESID",
                                    title: "SIPARISPROSESID",
                                    width: 120,
                                },
                                { id: "ADI", title: "ADI", width: 280 },
                            ]}
                            defaultValue={formData?.SIPARISPROSESID}
                            handleSelect={(obj: { SIPARISPROSESID: number }) => {
                                setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                            }}
                            control={control}
                        />
                        <LiteOptionsTable
                            label="Renk Deringligi"
                            name="SIPARISPROSESID"
                            link="siparisproses"
                            renderValue={(_: string, obj: any) => {
                                return obj.SIPARISPROSESID && obj.ADI
                                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                                    : obj.SIPARISPROSESID;
                            }}
                            headColumns={[
                                {
                                    id: "SIPARISPROSESID",
                                    title: "SIPARISPROSESID",
                                    width: 120,
                                },
                                { id: "ADI", title: "ADI", width: 280 },
                            ]}
                            defaultValue={formData?.SIPARISPROSESID}
                            handleSelect={(obj: { SIPARISPROSESID: number }) => {
                                setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                            }}
                            control={control}
                        />
                    </div>
                    <div className="space-y-2">
                        <LiteOptionsTable
                            label="Desen No"
                            name="SIPARISPROSESID"
                            link="siparisproses"
                            renderValue={(_: string, obj: any) => {
                                return obj.SIPARISPROSESID && obj.ADI
                                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                                    : obj.SIPARISPROSESID;
                            }}
                            headColumns={[
                                {
                                    id: "SIPARISPROSESID",
                                    title: "SIPARISPROSESID",
                                    width: 120,
                                },
                                { id: "ADI", title: "ADI", width: 280 },
                            ]}
                            defaultValue={formData?.SIPARISPROSESID}
                            handleSelect={(obj: { SIPARISPROSESID: number }) => {
                                setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                            }}
                            control={control}
                        />
                        <LiteOptionsTable
                            label="Islem Tipi"
                            name="ISLEMTIPI"
                            link="islemtipi"
                            renderValue={(_: string, obj: any) => {
                                return obj.SIPARISPROSESID && obj.ADI
                                    ? obj.SIPARISPROSESID + " - " + obj.ADI
                                    : obj.SIPARISPROSESID;
                            }}
                            headColumns={[
                                {
                                    id: "SIPARISPROSESID",
                                    title: "SIPARISPROSESID",
                                    width: 120,
                                },
                                { id: "ADI", title: "ADI", width: 280 },
                            ]}
                            defaultValue={formData?.SIPARISPROSESID}
                            handleSelect={(obj: { SIPARISPROSESID: number }) => {
                                setValue("SIPARISPROSESID", obj.SIPARISPROSESID);
                            }}
                            control={control}
                        />
                        <div className="grid grid-cols-2 gap-x-2">
                            <HFInputMask
                                label="Fire Oran"
                                name="TAHMINIFIREORANI"
                                defaultValue={formData?.TAHMINIFIREORANI}
                                handleChange={(val?: string) => {
                                    setValue("TAHMINIFIREORANI", val);
                                }}
                                control={control}
                            />
                            <HFInputMask
                                label="Ref Sipais No"
                                name="TAHMINIFIREORANI"
                                defaultValue={formData?.TAHMINIFIREORANI}
                                handleChange={(val?: string) => {
                                    setValue("TAHMINIFIREORANI", val);
                                }}
                                control={control}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-x-2">
                            <HFInputMask
                                label="Pus"
                                name="PUS"
                                defaultValue={formData?.PUS}
                                handleChange={(val?: string) => {
                                    setValue("PUS", val);
                                }}
                                control={control}
                            />
                            <div>
                                <CLabel title="Boyancak" />
                                <CCheckbox element={{ label: "Boyancak" }} />
                            </div>
                            <div>
                                <CLabel title="Ceki Listesi Okuce" />
                                <CCheckbox
                                    element={{ label: "Ceki Listesi Okuce" }}
                                    checked={getValues().CEKILISTESICIKACAK ? true : false}
                                />
                            </div>
                        </div>
                        <HFTextarea
                            label="Termin Notu"
                            name="TERMINNOTU"
                            defaultValue={formData?.TERMINNOTU}
                            control={control}
                            minRows={2}
                        />
                        <HFTextarea
                            label="Planlama Notu"
                            name="PLANLAMANOTU"
                            defaultValue={formData?.PLANLAMANOTU}
                            control={control}
                            minRows={2}
                        />
                    </div>
                </div>
                <SubmitCancelButtons
                    uniqueID={uniqueID}
                    type="create"
                    handleActions={handleActions}
                />
            </form>
        </CNewMiniModal>
    );
};
