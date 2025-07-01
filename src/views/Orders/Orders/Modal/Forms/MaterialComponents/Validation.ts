import * as yup from "yup";

export const Validation = yup.object().shape({
    URUNID: yup.string().optional(),
    MIKTAR: yup.number().optional(),
    HAMID: yup.string().required('required'),
    HAMADI: yup.string().optional(),
    FEINE: yup.number().optional(),
    PUS: yup.number().optional(),
    MIKTARGUN: yup.number().optional(),
    IPLIKBOYU1: yup.string().optional(),
    MAKINAUSTUGRAMAJ: yup.number().optional(),
    DOVIZID: yup.string().optional(),
    TUPACIKENMAYLI: yup.number().optional(),
    MUSTERISIPARISNO: yup.string().optional(),
    SIPARISPROSESID: yup.string().optional(),
    TAHMINIFIREORANI: yup.number().optional(),
    HAMMIKTAR: yup.number().required("required").min(1, "required"),
    KALITEID: yup.string().required("required"),
});