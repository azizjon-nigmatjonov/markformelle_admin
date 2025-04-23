import * as yup from "yup";

export const Validation = yup.object().shape({
  IRSALIYENO: yup.string().required("IRSALIYENO is required"),
  DEPOID: yup.string().required("DEPOID is required"),
  FIRMA: yup.string().nullable(),
  DOVIZID: yup.string().required("DOVIZID is required"),
});

export const ValidationInnerModal = yup.object().shape({
  BIRIMID: yup.string().required("BIRIMID is required"),
  
});