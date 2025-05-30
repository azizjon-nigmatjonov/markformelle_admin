import * as yup from "yup";

export const Validation = yup.object().shape({
  HAMID: yup.string().required("required"),
  ASAMAID: yup.string().required("required"),
  DOVIZID: yup.string().required("required"),
  CALISMATARIHI: yup.string().required("required"),
});
