import {useForm} from "react-hook-form";
import {HFDatePicker} from "../../../../../components/HFElements/HFDatePicker";
import {useEffect} from "react";
import dayjs from "dayjs";
import {LiteOptionsTable} from "../../../../../components/UI/Options/LiteTable";
import {MaterialFormLogic} from "./Logic";
import {SubmitCancelButtons} from "../../../../../components/UI/FormButtons/SubmitCancel";
import {yupResolver} from "@hookform/resolvers/yup";
import {Validation} from "./Validation";
const schema = Validation;
interface Props {
    open: string;
    formId: number;
    onClose: () => void;
    formData: any;
    refetchMaterial: (el : any) => void;
}

export const MaterialForm = ({
    open,
    formId,
    onClose,
    formData = {},
    refetchMaterial
} : Props) => {
    const {control, handleSubmit, setValue} = useForm < any > ({mode: "onSubmit", resolver: yupResolver(schema)});

    const {createForm, formData: materialFormData, updateForm} = MaterialFormLogic({
        refetchMaterial: (el? : any) => {
            refetchMaterial(el);
        },
        formId,
        onClose: onClose
    });

    const onSubmit = (data : any) => {
        let params: any = data;

        params.LABRECETEID = formData.LABRECETEID;
        params.FIRMAID = formData.FIRMAID;

        params.TERMINTARIHI = dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss");
        params.INSERTKULLANICIID = 1;
        const parsedDate = dayjs(params.CALISMATARIHI, "DD.MM.YYYY");

        const isoWithMicroseconds = parsedDate.format("YYYY-MM-DDTHH:mm:ss") + ".000000";

        params.CALISMATARIHI = isoWithMicroseconds;
        params.DEGISIMTARIHI = dayjs();

        if (materialFormData ?. LABRECETECALISMAID) {
            params = {
                ...materialFormData,
                ... params
            };

            updateForm(params, formId);
        } else {
            params.KULLANICIID = 1;
            params.INSERTTARIHI = dayjs();
            createForm(params);
        }
    };

    useEffect(() => {
        if (materialFormData ?. LABRECETECALISMAID) {
            setValue("HAMID", materialFormData.HAMID);
            setValue("HAMADI", materialFormData.HAMADI);
            setValue("USTASAMAADI", materialFormData.USTASAMAADI);
            setValue("USTASAMAID", materialFormData.USTASAMAID);
            setValue("ASAMAID", materialFormData.USTASAMAID);
            setValue("DOVIZID", materialFormData.DOVIZID);
            setValue("CALISMATARIHI", dayjs(materialFormData.CALISMATARIHI).format("DD.MM.YYYY"));
        } else {
            setValue("CALISMATARIHI", dayjs().format("DD.MM.YYYY"));
            setValue("DOVIZID", "USD");
        }
    }, [materialFormData]);

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
            }
            className="space-y-5 w-[400px]">
            <div className="grid grid-cols-1 gap-y-2">
                <LiteOptionsTable name="HAMID" label="HAMSTOK"
                    required={true}
                    placeholder="HAMSTOK"
                    link="ham"
                    renderValue={
                        (_ : string, obj : any) => {
                            return obj.ADI && obj.HAMID ? obj.HAMID + " - " + obj.ADI : obj.ADI || obj.HAMID;
                        }
                    }
                    defaultValue={
                        materialFormData ?. HAMADI
                    }
                    headColumns={
                        [
                            {
                                id: "HAMID",
                                title: "HAMID",
                                width: 60
                            }, {
                                id: "ADI",
                                title: "ADI",
                                width: 150
                            }, {
                                id: "HAMTIPIADI",
                                title: "HAMTIPIADI",
                                width: 90
                            },
                        ]
                    }
                    handleSelect={
                        (obj : {
                            ADI: string;
                            HAMID: number
                        }) => {
                            setValue("HAMID", obj.HAMID);
                            setValue("HAMADI", obj.ADI);
                        }
                    }
                    focused
                    control={control}/>
                <LiteOptionsTable name="ASAMAID" label="USTASAMA" placeholder="USTASAMA" link="asama"
                    renderValue={
                        (_ : string, obj : any) => {
                            return obj.ADI || obj.ASAMAID;
                        }
                    }
                    defaultValue={
                        materialFormData ?. USTASAMAADI
                    }
                    headColumns={
                        [
                            {
                                id: "ASAMAID",
                                title: "ASAMAID",
                                width: 80
                            }, {
                                id: "ADI",
                                title: "ADI",
                                width: 150
                            },
                        ]
                    }
                    handleSelect={
                        (obj : {
                            ASAMAID: number;
                            ADI: string
                        }) => {
                            setValue("USTASAMAID", obj.ASAMAID);
                            setValue("USTASAMAADI", obj.ADI);
                            setValue("ASAMAID", obj.ASAMAID);
                        }
                    }
                    required={true}
                    control={control}/>

                <LiteOptionsTable name="DOVIZID" label="DOVIZID"
                    placeholder={"DOVIZID"}
                    renderValue={
                        (_ : string, obj : any) => {
                            return obj.DOVIZID || obj.CINSI;
                        }
                    }
                    link="doviz"
                    defaultValue={
                        materialFormData ?. DOVIZID || "USD"
                    }
                    headColumns={
                        [
                            {
                                id: "CINSI",
                                title: "CINSI",
                                width: 60
                            }, {
                                id: "DOVIZID",
                                title: "DOVIZID",
                                width: 80
                            },
                        ]
                    }
                    handleSelect={
                        (obj : {
                            DOVIZID: string
                        }) => {
                            setValue("DOVIZID", obj.DOVIZID);
                        }
                    }
                    control={control}/>

                <HFDatePicker control={control}
                    required
                    name="CALISMATARIHI"
                    label="CALISMATARIHI"
                    placeholder="CALISMATARIHI"
                    format="DD.MM.YYYY"
                    defaultValue={
                        materialFormData ?. CALISMATARIHI || dayjs()
                    }/>
            </div>
            <SubmitCancelButtons uniqueID={open}
                type={
                    !materialFormData ?. LABRECETECALISMAID ? "create" : "update"
                }
                handleActions={
                    (val : string, uniqueID : string) => {
                        if (uniqueID === open) {
                            if (val === "Close") {
                                onClose();
                            }
                            if (val === "Enter") 
                                handleSubmit(onSubmit)();
                            
                        }
                    }
                }/>
        </form>
    );
};
