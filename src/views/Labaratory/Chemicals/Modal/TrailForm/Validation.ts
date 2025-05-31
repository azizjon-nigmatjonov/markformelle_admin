import * as yup from "yup";

export const Validation = yup.object().shape({
  ATISNO: yup.string().required("required"),
  MIGRASYON: yup.string().required("required"),
  ASAMAID: yup.string().required("required"),
});
