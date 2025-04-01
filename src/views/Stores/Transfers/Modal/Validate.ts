import * as yup from "yup";

export const Validation = yup.object().shape({
  IRSALIYENO: yup.string().required("IRSALIYENO is required"),
  IRSALIYETARIHI: yup
    .string()
    .required("IRSALIYETARIHI is required")
    .matches(
      /^\d{2}\.\d{2}\.\d{4}$/,
      "IRSALIYETARIHI must be in format DD.MM.YYYY"
    ),
  INSERTTARIHI: yup
    .string()
    .required("INSERTTARIHI is required")
    .matches(
      /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/,
      "INSERTTARIHI must be in format DD.MM.YYYY HH:MM"
    ),
  DEPOID: yup.string().required("DEPOID is required"),
  TRANSFERDEPOID: yup.string().nullable(),
  DOVIZID: yup.string().required("DOVIZID is required"),
});

export const ValidationInnerModal = yup.object().shape({
  BIRIMID: yup.string().required("BIRIMID is required"),
  
});