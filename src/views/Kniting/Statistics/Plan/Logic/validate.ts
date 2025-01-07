import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    phone: yup.string().required("Обязательное поле!"),
    start: yup.string().required("Обязательное поле!"),
  });
};
