import * as yup from "yup";

export const Validation = yup.object().shape({
  ADI: yup.string().required("required"),
  FIRMAID: yup.string().required("required"),
  LABRENKGRUPID: yup.string().required("required"),
  HAMID: yup.string().required("required"),
  RECETETURUID: yup.string().required("required"),
  ACIKLAMA: yup.string().required("required"),
  USTASAMAID: yup.string().required("required"),
  DOVIZID: yup.string().required("required"),
  ESKILABRECETEKODU: yup.string().optional(),
  PANTONEKODU: yup.string().required("required"),
  RENKDERINLIGIID: yup.string().required("required"),
  KALITEID: yup.string().optional(),
  TALEPTARIHI: yup.string().optional(),
}); 