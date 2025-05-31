import * as yup from "yup";

export const Validation = yup.object().shape({
  URUNID: yup.string().required("required"),
  MIKTARYUZDE: yup.string().required("required"),
});
