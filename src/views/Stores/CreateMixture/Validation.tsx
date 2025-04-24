import * as yup from "yup";

export const Validation = yup.object().shape({
  URUNRECETEURUNID: yup.string().required("required"),
  URUNBIRIMID: yup.string().required("required"),
  BIRIMID: yup.string().required("required"),
  // DEPOID: yup.string().required("required"),
  // MIKTAR: yup.number().required("required"),
});
