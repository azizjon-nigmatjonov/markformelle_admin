import * as yup from "yup";
export const Validation = () => {
  return yup.object().shape({
    name: yup.string().required("Обязательное поле!"),
    title: yup.string().required("Обязательное поле!"),
  });
};
